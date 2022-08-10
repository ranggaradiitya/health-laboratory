ready();

async function ready() {
  try {
    await productsShowcase();
    dinamicNavbar();
    goToTopButton();
    logOut();
  } catch (error) {
    console.log("Ready error: ", error);
  }
}

function dinamicNavbar() {
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
  if (isUserLoggedIn) {
    $("#dinamic-navbar").html(`
      <div class="dropdown text-center">
        <button
          type="button"
          class="btn btn-warning text-light w-100"
          data-bs-toggle="dropdown"
        >
          <i class="bi bi-person-circle"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="user-profile.html">My Profile</a></li>
          <li><a class="dropdown-item" href="user-account.html">Account</a></li>
          <li><a class="dropdown-item" id="logout" href="#">Logout</a></li>
        </ul>
      </div>
    `);
    return;
  }
  $("#dinamic-navbar").html(`
    <a
      href="login.html"
      class="btn btn-warning p-2 text-light w-100 mx-0 mx-sm-2 my-2 my-sm-0"
    >
      Login
    </a>
  `);
}

function productsRef() {
  const database = firebase.database();
  return database.ref('products');
}

async function productsShowcase() {
  try {
    $("#product-showcase").empty();
    const snapshot = await productsRef().once("value");
    const products = Object.values(snapshot.val());
    for (const product of products) {
      if (products.indexOf(product) === 4) {
        return;
      }
      $("#product-showcase").append(`
      <div class="col" data-aos="fade-up" data-aos-duration="1500">
        <div class="card h-100 shadow p-3">
          <div class="p-3 bg-dark bg-opacity-10 rounded-3">
            <img
              src="images/${product.image}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body">
            <h6 class="card-title">${product.name}</h6>
          </div>
        </div>
      </div>
    `);
    }
  } catch (error) {
    console.log("Products showcase error: ", error);
  }
}

function logOut() {
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("isUserLoggedIn");
    sessionStorage.removeItem("userId");
    window.location.href = "../index.html";
  });
}

function goToTopButton() {
  $(window).scroll(function () {
    if ($("html").scrollTop() > 20 || $("body").scrollTop() > 20) {
      $("#myBtn").css("display", "block");
    } else {
      $("#myBtn").css("display", "none");
    }
  });
  $("#myBtn").click(function (e) {
    $("html").scrollTop(0);
    $("body").scrollTop(0);
  });
}
