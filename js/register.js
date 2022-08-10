register();

function usersRef() {
  const database = firebase.database();
  return database.ref("users");
}

function register() {
  $("#register").click(async function (e) {
    try {
      e.preventDefault();
      const fullName = $("#fullname").val();
      const email = $("#email").val();
      const password = $("#password").val();

      if (fullName && email && password) {
        const isEmailAlreadyRegistered = await checkUsersExists(email);
        if (isEmailAlreadyRegistered) {
          alert("Email is already registered!");
          return;
        }
        const autoId = usersRef().push().key;
        const newUser = {
          fullName,
          email,
          password,
          address: "",
          gender: "",
          phoneNumber: "",
          userName: "",
          birthDate: "",
          role: "user"
        };
        await usersRef().child(autoId).set(newUser);
        alert("Register successfully!");
        window.location.href = "../login.html";
      } else {
        alert("Please fill all fields!");
      }
    } catch (error) {
      console.log("can't register", error);
    }
  });
}

async function checkUsersExists(email) {
  try {
    const snapshot = await usersRef().once("value");
    const users = Object.values(snapshot.val());
    const findUser = users.find(user => user.email === email);
    if (findUser) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("can't check user exists", error);
  }
}