// 수정을 용이하게 하기 위해 Axios를 하나로 묶어주는 파일

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/",
});
