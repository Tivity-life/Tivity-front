import { getCookie } from "./cookies";

export async function getUser() {
  const agreeAutoLogin = getCookie("tivityAutoLogin");
  const token = getCookie("tivityToken");


  if (agreeAutoLogin == "false") {
    return false;
  }

  return await fetch("http://localhost:8080/api/user/getUser", {
    method: "GET",
    mode: "cors",
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => {
      if (res.status !== 200) {  
        return false;
      }

      return res.json();
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      return false
    });

}
