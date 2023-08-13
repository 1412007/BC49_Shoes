document.getElementById("login_form").onsubmit = function () {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = {};
  user["email"] = email;
  user["password"] = password;
  console.log(user);

  let promise = axios({
    method: "POST",
    url: "https://shop.cyberlearn.vn/api/Users/signin",
    data: user,
  })
    .then(function (result) {
      console.log(result);
      window.location.replace("/index.html");
    })
    .catch(function (err) {
      if (err.response.status == 404) {
        document.getElementById("error").innerHTML =
          "Username or password is invalid";
        document.getElementById("login_form").reset();
      }
      console.log(err);
    });
};
