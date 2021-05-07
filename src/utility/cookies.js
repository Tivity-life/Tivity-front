export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

export async function testTokenLogin() {
  const agreeAutoLogin = getCookie("tivityAutoLogin");
  const token = getCookie("tivityToken");


  console.log(agreeAutoLogin)
  if(agreeAutoLogin == "false"){
    return false
  }

  return await fetch("http://localhost:8080/api/test/user", {
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
      return true;
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
}
