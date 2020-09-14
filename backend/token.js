const axios = require("axios");
axios.defaults.headers.common["Authorization"] =
  "Basic <base64 encoded 42d050bca6bf430cb25b41ae60c44479:3b714ded86c14cd6bfc1394b9b3f6a03>";
function getToken() {
  axios
    .post("https://accounts.spotify.com/api/token", {
      grant_type: "client_credentials",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getToken();
module.exports = getToken;
