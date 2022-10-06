package org.zerock.decommi.repository.member;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.zerock.decommi.dto.LikeTagListDTO;
import org.zerock.decommi.entity.member.LikeTagList;
import org.zerock.decommi.entity.member.Member;

@Repository
public interface LikeTagListRepository extends JpaRepository<LikeTagList, Long> {

  LikeTagList getByEmail(String email);

  @Query("select distinct(l.tagName) from LikeTagList l where l.email=:email and l.tagName =:tagName ")
  Optional<LikeTagList> checkLikeTagListByEmailAndTagName(String email, String tagName);

  @Query("select l.tagName from LikeTagList l where l.email=:email ")
  Optional<List<String>> getLikeTagList(String email);
}