// 수정을 용이하게 하기 위해 Axios를 하나로 묶어주는 파일

import axios from "axios";

export default axios.create({
  // baseURL: "http://43.201.93.101:8081/",
  baseURL: "http://localhost:8080/",
});
