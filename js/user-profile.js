ready();

async function ready() {
  try {
    await getUserDataToForm();
    updateUserProfile();
    logOut();
  } catch (error) {
    console.log("can't ready", error);
  }
}

function usersRef() {
  const database = firebase.database();
  return database.ref("users");
}

function getUserIdSession() {
  return sessionStorage.getItem("userId");
}

async function getUserDataToForm() {
  try {
    const snapshot = await usersRef().once("value");
    const usersData = snapshot.val();
    for (const userId in usersData) {
      const user = usersData[userId];
      if (userId === sessionStorage.getItem("userId")) {
        $("#fullname").val(user.fullName);
        $("#username").val(user.userName);
        $("#email").val(user.email);
        $("#phone-number").val(user.phoneNumber);
        $("#birth-date").val(user.birthDate);
        $(`input:radio[id="${user.gender.toLowerCase()}"]`).prop('checked', true);
        $("#address").val(user.address);
        break;
      }
    }
  } catch (error) {
    console.log("can't get user data", error);
  }
}

function updateUserProfile() {
  $("#save-changes").click(function (e) {
    e.preventDefault();
    if (isValid()) {
      const updatedProduct = {
        fullName: $("#fullname").val(),
        userName: $("#username").val(),
        phoneNumber: $("#phone-number").val(),
        birthDate: $("#birth-date").val(),
        gender: $('input[name="gender"]:checked').val(),
        address: $("#address").val(),
      }
      usersRef().child(getUserIdSession()).update(updatedProduct);

      getUserDataToForm();
      alert("Your profile successfully updated")
    }
  });
}

function isValid() {
  if ($("#fullname").val() === "") {
    alert("Full name is required");
    return false;
  }
  return true;
}

function logOut() {
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("isUserLoggedIn");
    sessionStorage.removeItem("userId");
    window.location.href = "../index.html";
  });
}



