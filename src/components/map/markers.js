export async function getMarkers(userId) {
  return await fetch(
    process.env.VUE_APP_API_URL + "api/user/getMarkers?userId=" + userId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.status !== 200) {
        console.log("Something went wrong", err);
        return false;
      }
      return res.json();
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      return false;
    });
}
