ready();

async function ready() {
  try {
    await getEmployeeDataToForm();
    updateEmployeeProfile();
    logOut();
  } catch (error) {
    console.log("can't ready", error);
  }
}

function employeesRef() {
  const database = firebase.database();
  return database.ref("employees");
}

function getEmployeeIdSession() {
  return sessionStorage.getItem("employeeId");
}

async function getEmployeeDataToForm() {
  try {
    const snapshot = await employeesRef().once("value");
    const employeesData = snapshot.val();
    for (const employeeId in employeesData) {
      const employee = employeesData[employeeId];
      if (employeeId === sessionStorage.getItem("employeeId")) {
        $("#fullname").val(employee.fullName);
        $("#username").val(employee.userName);
        $("#email").val(employee.email);
        $("#phone-number").val(employee.phoneNumber);
        $("#birth-date").val(employee.birthDate);
        $(`input:radio[id="${employee.gender.toLowerCase()}"]`).prop('checked', true);
        $("#address").val(employee.address);
        break;
      }
    }
  } catch (error) {
    console.log("can't get employee data", error);
  }
}

function updateEmployeeProfile() {
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
      employeesRef().child(getEmployeeIdSession()).update(updatedProduct);

      getEmployeeDataToForm();
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
    sessionStorage.removeItem("isEmployeeLoggedIn");
    sessionStorage.removeItem("employeeId");
    window.location.href = "../index.html";
  });
}



