login();

function getEmployeesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[0];
}

function isEmployeeExists(email, password) {
  const employees = getEmployeesFromLocalStorage();
  const findEmployee = employees.find(employee => employee.email === email && employee.password === password);
  if (findEmployee) {
    return true;
  }
  return false;
}

function login() {
  $("#login").click(function (e) {
    const email = $("#email").val();
    const password = $("#password").val();

    if (email && password) {
      if (isEmployeeExists(email, password)) {
        window.location.href = '../pages/crud.html';
        return false;
      }
      alert("Email or password is wrong");
    }
  });
}


