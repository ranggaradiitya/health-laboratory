login();

function employeesRef() {
  const database = firebase.database();
  return database.ref("employees");
}

function usersRef() {
  const database = firebase.database();
  return database.ref("users");
}

function login() {
  $("#login").click(async function (e) {
    try {
      e.preventDefault();
      const email = $("#email").val();
      const password = $("#password").val();

      if (email && password) {
        const isEmployeeExists = await checkEmployeeExists(email, password);
        const isUserExists = await checkUsersExists(email, password);
        const employeeRole = await getEmployeeRole(email, password);
        const userRole = await getUserRole(email, password);
        const employeeId = await getEmployeeId(email, password);
        const userId = await getUserId(email, password);

        if (isEmployeeExists && employeeRole === "admin") {
          if (employeeId) {
            sessionStorage.setItem("isEmployeeLoggedIn", true);
            sessionStorage.setItem("employeeId", employeeId);
            window.location.href = '../dashboard.html';
          }
        } else if (isUserExists && userRole === "user") {
          if (userId) {
            sessionStorage.setItem("isUserLoggedIn", true);
            sessionStorage.setItem("userId", userId);
            window.location.href = '../index.html';
          }
        } else {
          alert("Email or password is wrong!");
        }
      } else {
        alert("Email or password is empty!");
      }
    } catch (error) {
      console.log("can't login", error);
    }
  });
}

async function checkEmployeeExists(email, password) {
  try {
    const snapshot = await employeesRef().once("value");
    const employees = Object.values(snapshot.val());
    const findEmployee = employees.find(employee => employee.email === email && employee.password === password);
    if (findEmployee) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("can't check employee exists", error);
  }
}

async function checkUsersExists(email, password) {
  try {
    const snapshot = await usersRef().once("value");
    const users = Object.values(snapshot.val());
    const findUser = users.find(user => user.email === email && user.password === password);
    if (findUser) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("can't check user exists", error);
  }
}

async function getEmployeeRole(email, password) {
  try {
    const snapshot = await employeesRef().once("value");
    const employees = Object.values(snapshot.val());
    const findEmployee = employees.find(employee => employee.email === email && employee.password === password);
    return findEmployee && findEmployee.role;
  } catch (error) {
    console.log("can't get employee role", error);
  }
}

async function getUserRole(email, password) {
  try {
    const snapshot = await usersRef().once("value");
    const users = Object.values(snapshot.val());
    const findUser = users.find(user => user.email === email && user.password === password);
    return findUser && findUser.role;
  } catch (error) {
    console.log("can't get user role", error);
  }
}

async function getEmployeeId(email, password) {
  try {
    const snapshot = await employeesRef().once("value");
    const employeesData = snapshot.val();
    for (const employeeId in employeesData) {
      if (employeesData[employeeId].email === email && employeesData[employeeId].password === password) {
        return employeeId;
      }
    }
    return null;
  } catch (error) {
    console.log("can't get employee id", error);
  }
}

async function getUserId(email, password) {
  try {
    const snapshot = await usersRef().once("value");
    const usersData = snapshot.val();
    for (const userId in usersData) {
      if (usersData[userId].email === email && usersData[userId].password === password) {
        return userId;
      }
    }
    return null;
  } catch (error) {
    console.log("can't get user id", error);
  }
}





