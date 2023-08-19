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

document.getElementById("signUp_form").onsubmit = function () {
  event.preventDefault();
  let email = document.getElementById("registEmail").value;
  let password = document.getElementById("registPassword").value;
  let name = document.getElementById("registName").value;
  let phone = document.getElementById("phoneNumber").value;
  let gender = document.getElementById("male").checked;

  let user = {};
  user["email"] = email;
  user["password"] = password;
  user["name"] = name;
  user["gender"] = gender;
  user["phone"] = phone;
  console.log(user);

  let promise = axios({
    method: "POST",
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    data: user,
  })
    .then(function (result) {
      console.log(result);
      document.getElementById(
        "nav-tabContent"
      ).innerHTML = `<div class="container" id="successful">
      <i class="fa-solid fa-circle-check logo" style="color: #2fa242;"></i>
      <h2 style="color: #2fa242;"> Register Successfully!!!</h2>
      <a class="btn btn-primary" href="../../index.html">Back to Home</a>
      </div>`;
    })
    .catch(function (err) {
      alert(err.response.data.message);
      if (err.response.status == 400) {
        document.getElementById("error").innerHTML =
          "Username or password is invalid";
      }
      console.log(err);
    });
};
