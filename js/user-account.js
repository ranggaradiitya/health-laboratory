ready();

function ready() {
  togglePasswordVisibility();
  updateUserEmail();
  updateUserPassword();
  logOut();
}

function usersRef() {
  const database = firebase.database();
  return database.ref("users");
}

function getUserIdSession() {
  return sessionStorage.getItem("userId");
}

function togglePasswordVisibility() {
  $("#show-new-password").click(function (e) {
    e.preventDefault();
    if ($("#new-password").attr("type") === "password") {
      $("#new-password").attr("type", "text");
      $("#icon-password").removeClass("bi-eye-fill");
      $("#icon-password").addClass("bi-eye-slash-fill");
    } else {
      $("#new-password").attr("type", "password");
      $("#icon-password").removeClass("bi-eye-slash-fill");
      $("#icon-password").addClass("bi-eye-fill");
    }
  });

  $("#show-confirm-new-password").click(function (e) {
    e.preventDefault();
    if ($("#confirm-new-password").attr("type") === "password") {
      $("#confirm-new-password").attr("type", "text");
      $("#icon-confirm-password").removeClass("bi-eye-fill");
      $("#icon-confirm-password").addClass("bi-eye-slash-fill");
    } else {
      $("#confirm-new-password").attr("type", "password");
      $("#icon-confirm-password").removeClass("bi-eye-slash-fill");
      $("#icon-confirm-password").addClass("bi-eye-fill");
    }
  });
}

function updateUserEmail() {
  $("#change-email").click(function (e) {
    e.preventDefault();
    if ($("#new-email").val() === "") {
      alert("Please enter a new email!");
      return;
    }
    const newEmail = $("#new-email").val();
    usersRef().child(getUserIdSession()).update({ email: newEmail });
    alert("Email updated!");
    $("#new-email").val("");
  });
}

function updateUserPassword() {
  $("#save-password").click(function (e) {
    e.preventDefault();
    const newPassword = $("#new-password").val();
    const confirmNewPassword = $("#confirm-new-password").val();

    if (newPassword === "" || confirmNewPassword === "") {
      alert("Please enter a new password and confirm new password!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    usersRef().child(getUserIdSession()).update({ password: newPassword });
    alert("Password updated!");
    $("#new-password").val("")
    $("#confirm-new-password").val("")
  });
}

function logOut() {
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("isUserLoggedIn");
    sessionStorage.removeItem("userId");
    window.location.href = "../index.html";
  });
}