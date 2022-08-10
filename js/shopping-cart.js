ready();

async function ready() {
  try {
    await productsShowcase();
    dinamicNavbar();
    dinamicCart();
    addEventToAddToChartButton();
    addEventToRemoveButton();
    addEventToPurchaseButton();
    addEventToIncreaseButton();
    addEventToDecreaseButton();
    searchProduct();
    logOut();
  } catch (error) {
    console.log("can't ready", error);
  }
}

function dinamicNavbar() {
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
  if (isUserLoggedIn) {
    $("#dinamic-navbar").html(`
      <div class="dropdown ms-0 ms-sm-2">
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

function dinamicCart() {
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
  if (isUserLoggedIn) {
    $("#dinamic-cart").html(`
      <button
        class="btn btn-warning d-block mx-auto p-2 text-light w-75"
        id="btn-purchase"
      >
        Purchase
      </button>
    `);
    return;
  }
  $("#dinamic-cart").html(`
    <p class="text-center">In order to checkout please <a href="login.html">LOGIN</a></p>
  `);
}

function productsRef() {
  const database = firebase.database();
  return database.ref('products');
}

async function productsShowcase() {
  try {
    $("#product-list").empty();
    const snapshot = await productsRef().once('value');
    const products = Object.values(snapshot.val());
    for (const product of products) {
      const { name, price, stock, image } = product;

      if (Number(stock) === 0) {
        continue;
      }

      $("#product-list").append(`
      <div class="col">
        <div class="card h-100 shadow p-3">
          <div class="p-3 bg-dark bg-opacity-10 rounded-3">
            <img
              src="../images/${image}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body px-0">
            <h6 class="card-title fw-bold text-warning">${name}</h6>
            <p class="card-text m-0">${formatRupiah(price)}</p>
            <p class="card-stock">Stock: ${stock}</p>
          </div>
          <button
            class="btn btn-warning text-light add-cart"
            id="onsite-rapid"
            data-bs-toggle="offcanvas"
            data-bs-target="#demo"
          >
            Add to cart
          </button>
        </div>
      </div>
    `);
    }
  } catch (error) {
    console.log("can't get products", error);
  }
}

function addEventToAddToChartButton() {
  $(".add-cart").each(function (index, element) {
    $(element).click(function () {
      let title = $(element).prev().children(".card-title").text();
      let price = $(element).prev().children(".card-text").text();
      addItemToCart(title, price);
      updateCartIcon();
      updateCartTotal();
      addEventToRemoveButton();
      addEventToIncreaseButton();
      addEventToDecreaseButton();
    });
  });
}

function addEventToRemoveButton() {
  $(".cart-item-remove-btn").each(function (index, element) {
    $(element).click(function () {
      $(element).parents(".cart-item").remove();
      updateCartIcon();
      updateCartTotal();
    });
  });
}

function addEventToIncreaseButton() {
  $(".cart-item-increase-btn").each(function (index, element) {
    $(element).off().click(function (e) {
      let quantity = Number($(element).next().text());
      $(element).next().text(++quantity);
      checkQuantity(e)
      updateCartTotal();
    });
  });
}

function addEventToDecreaseButton() {
  $(".cart-item-decrease-btn").each(function (index, element) {
    $(element).off().click(function (e) {
      let quantity = Number($(element).prev().text());
      $(element).prev().text(--quantity);
      quantityChanged(e);
      updateCartIcon();
      updateCartTotal();
    });
  });
}

function addEventToPurchaseButton() {
  $("#btn-purchase").click(function (e) {
    if ($(".cart-item").length === 0) {
      alert("Cart is empty, add products first before purchase");
      return;
    }
    const myModal = new bootstrap.Modal(document.getElementById('myModal'))
    myModal.show()
    addEventtoModal(e);
  });
}

function quantityChanged(event) {
  const quantity = Number($(event.target).parent().prev().text());
  if (quantity === 0) {
    $(event.target).parents(".cart-item").remove();
  }
}

async function checkQuantity(event) {
  try {
    const productName = $(event.target).parent().parent().prev().children(".cart-item-name").text();
    const quantity = $(event.target).parent().next().text();

    const snapshot = await productsRef().once("value");
    const products = Object.values(snapshot.val());

    for (const product of products) {
      if (product.name === productName) {
        if (Number(product.stock) < Number(quantity)) {
          alert("Stock is not enough");
          $(event.target).parent().next().text(product.stock);
          return;
        }
      }
    }
  } catch (error) {
    console.log("can't check stock", error);
  }
}

function paymentRef() {
  const database = firebase.database();
  return database.ref('paymentDetails');
}

function addEventtoModal() {
  // reset form when click close button
  $(".btn-close").click(function (e) {
    $("#payment-details")[0].reset();
  });

  // total price to pay
  $("#total-payment").text($(".cart-total-price").text());

  // get product in cart
  const productInCart = [];
  $(".cart-item").each(function (index, element) {
    const productName = $(element).find(".cart-item-name").text();
    const quantity = $(element).find(".cart-item-quantity").text();
    productInCart.push({ productName, quantity });
  });

  // event when pay button clicked
  $("#pay").click(function (e) {
    const name = $("#name").val();
    const email = $("#email").val();
    const address = $("#address").val();
    const cardNumber = $("#card-number").val();
    const cardName = $("#card-name").val();
    const expiryDate = $("#expiry-date").val();
    const cvCode = $("#cv-code").val();

    const isValid = name && email && address && cardNumber && cardName && expiryDate && cvCode;
    if (isValid) {
      const autoId = paymentRef().push().key;
      const newData = {
        name, email, address, cardNumber, cardName, expiryDate, cvCode,
        purchasedProduct: productInCart
      }
      paymentRef().child(autoId).set(newData);
      updateProduct();
      ready();
      alert("Thank you for your purchase");
    }
  });
}


async function updateProduct() {
  try {
    const snapshot = await productsRef().once("value");
    const products = snapshot.val();
    console.log(products);

    for (const productId in products) {
      const product = products[productId];
      console.log(product);
    }

    $(".cart-item").each(function (index, element) {
      const productName = $(element).find(".cart-item-name").text();
      const quantity = $(element).find(".cart-item-quantity").text();

      for (const productId in products) {
        const product = products[productId];
        if (product.name === productName) {
          const newStock = product.stock - Number(quantity);
          productsRef().child(productId).update({ stock: newStock });
          break;
        }
      }
    });
  } catch (error) {
    console.log("can't update product", error);
  }
}

function addItemToCart(title, price) {
  let isProductAvailable;

  $(".cart-item-name").each(function (index, element) {
    if ($(element).text() === title) {
      let quantity = $(element).parent().next().children(".cart-item-quantity").text();
      $(element).parent().next().children(".cart-item-quantity").text(++quantity);
      isProductAvailable = true;
    }
  });

  if (isProductAvailable) {
    return;
  }

  $(".cart-items").append(`
    <div class="cart-item row align-items-center justify-content-between me-2">
      <div class="col-10">
        <h5 class="cart-item-name mb-0">${title}</h5>
        <p class="cart-item-price mb-0">${price}</p>
        <a class="cart-item-remove-btn text-danger text-decoration-none" style="cursor: pointer">Remove</a>
      </div>
      <div class="col-2 p-0 w-auto text-center">
        <button class="cart-item-increase-btn p-0 border-0 bg-light">
          <i class="bi bi-chevron-up"></i>
        </button>
        <p class="cart-item-quantity text-center mb-0">1</p>
        <button class="cart-item-decrease-btn p-0 border-0 bg-light">
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
      <hr class="my-2">
    </div>
  `);
}

function updateCartTotal() {
  let total = 0;
  $(".cart-item").each(function (index, element) {
    let price = $(element).children().eq(0).children(".cart-item-price").text().replace("Rp", "").replaceAll(".", "");
    let quantity = $(element).children().eq(1).children(".cart-item-quantity").text();
    total += Number(price) * Number(quantity);
  });
  $(".cart-total-price").text(formatRupiah(total));
}

function updateCartIcon() {
  let totalProductInCart = $(".cart-item").length;
  if (totalProductInCart > 0) {
    $(".cart-btn").addClass("item-number");
    $(".cart-btn").attr("value", totalProductInCart);
    $(".cart-btn").parent().css("padding-right", "0");
    return;
  }
  $(".cart-btn").removeClass("item-number");
  $(".cart-btn").attr("value", totalProductInCart);
  $(".cart-btn").parent().removeAttr("style");
}

function searchProduct() {
  $("#search").on("input", function () {
    $("#product-list").children().each(function (index, element) {
      const name = $(element).find(".card-title").text().toLowerCase();
      const searchValue = $("#search").val().toLowerCase();
      if (name.includes(searchValue)) {
        $(element).css("display", "");
      } else {
        $(element).css("display", "none");
      }
    });
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


function formatRupiah(money) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(money)
    .replace(/\s/g, "");
}

