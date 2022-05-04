addEmployee();

function getEmployeesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[0];
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[1];
}

function setEmployeesToLocalStorage(employees) {
  localStorage.setItem("rajaerba", JSON.stringify([employees, getProductsFromLocalStorage()]))
}

function isEmployeeRegistered(email) {
  const employees = getEmployeesFromLocalStorage();
  const findEmployee = employees.find(employee => employee.email === email);
  if (findEmployee) {
    alert("Email already registered");
    return true;
  }
  return false;
}

function pushNewEmployee(name, email, password, employees = getEmployeesFromLocalStorage()) {
  let lastId = employees[employees.length - 1].id
  employees.push({
    id: `${++lastId}`,
    name,
    email,
    password,
  })
  setEmployeesToLocalStorage(employees);
}

function clearInput() {
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
}


function addEmployee() {
  $("#register").click(function (e) {
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    if (name && email && password) {
      if (isEmployeeRegistered(email)) {
        clearInput();
        return;
      }
      pushNewEmployee(name, email, password)
      window.location.href = '../pages/login.html';
      return false;
    }
  });
}

