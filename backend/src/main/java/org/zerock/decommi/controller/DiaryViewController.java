package org.zerock.decommi.controller;

import java.io.File;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.zerock.decommi.dto.DiaryDTO;
import org.zerock.decommi.service.diary.DiaryService;
import org.zerock.decommi.vo.DiaryPostList;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequestMapping("/diary/")
@RequiredArgsConstructor
public class DiaryViewController {
  private final DiaryService diaryService;

  @RequestMapping(value = "/list", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<DiaryPostList>> getDiaryList() {
    return new ResponseEntity<>(diaryService.getDiaryPostList(), HttpStatus.OK);
  }

  @RequestMapping(value = "/read/{dino}", method = RequestMethod.GET, consumes = MediaType.ALL_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Object> DiaryRead(@ModelAttribute("dino") Long dino) {
    HashMap<String, Object> result = new HashMap<>();
    DiaryDTO diaryPost = diaryService.getDiaryPostByDino(dino);
    log.info("diaryPost" + diaryPost);
    result.put("diaryPost", diaryPost);
    return new ResponseEntity<>(result, HttpStatus.OK);
  }

  @GetMapping("/image/{fileName}")
  public ResponseEntity<byte[]> getFile(@ModelAttribute("fileName") String fileName, String size) {
    ResponseEntity<byte[]> result = null;
    try {
      String srchFileName = URLDecoder.decode(fileName, "UTF-8");
      File file = new File("c:\\testingimage" + File.separator + srchFileName);// window일경우 사용
      // File file = new File("/Users/hyunseokbyun/Documents/Imagefiles/" +
      // File.separator + srchFileName);
      if (size != null && size.equals("1")) {
        file = new File(file.getParent(), file.getName().substring(2));
      }

      HttpHeaders header = new HttpHeaders();
      header.add("Content-Type", Files.probeContentType(file.toPath())); // MIME
      result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
      log.info("fffffffffffffff" + fileName);
      log.info(result);
    } catch (Exception e) {
      log.error(e.getMessage());
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return result;
  }

}
