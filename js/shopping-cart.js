ready();

function ready() {
  addProductList();
  addEventToRemoveButton();
  addEventToQuantityField();
  addEventToAddToChartButton();
  addEventToPurchaseButton();
}

function addProductList() {
  $("#product-list").empty();
  const products = getProductsFromLocalStorage();
  $.each(products, function (index, product) {
    if (Number(product.stock) === 0) {
      return;
    }

    $("#product-list").append(`
      <div class="col">
        <div class="card h-100 shadow p-3">
          <div class="p-3 bg-dark bg-opacity-10 rounded-3">
            <img
              src="../images/${product.image}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body px-0">
            <h6 class="card-title fw-bold text-warning">${product.name}</h6>
            <p class="card-text m-0">${formatRupiah(product.price)}</p>
            <p class="card-stock">Stock: ${product.stock}</p>
          </div>
          <button
            class="btn btn-warning text-light add-cart"
            id="onsite-rapid"
          >
            Add to cart
          </button>
        </div>
      </div>
    `);
  });
}

function addEventToRemoveButton() {
  $(".btn-danger").each(function (index, element) {
    $(element).click(function (e) {
      removeCardItem(e);
    });
  });
}

function addEventToQuantityField() {
  $(".quantity").each(function (index, element) {
    $(element).on("change", function (e) {
      quantityChanged(e);
    });
    $(element).on("input", function (e) {
      checkQuantity(e);
    });
  });
}

function addEventToAddToChartButton() {
  $(".add-cart").each(function (index, element) {
    $(element).click(function (e) {
      addToCartClicked(e);
    });
  });
}

function addEventToPurchaseButton() {
  $(".btn-purchase").click(function (e) {
    purchaseClicked(e);
  });
}

function removeCardItem(event) {
  $(event.target).closest("tr").remove()
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function checkQuantity(event) {
  const productName = $(event.target).parent().siblings(".title").text();
  const quantity = $(event.target).val();
  const products = getProductsFromLocalStorage();
  $.each(products, function (index, product) {
    if (productName === product.name) {
      if (Number(quantity) > Number(product.stock)) {
        $(event.target).val(product.stock);
      }
      return false;
    }
  });
}

function addToCartClicked(event) {
  let title = $(event.target).prev().children(".card-title").text();
  let price = $(event.target).prev().children(".card-text").text();
  addItemToCart(title, price);
  updateCartTotal();
}

function purchaseClicked() {
  if ($("tbody").children("tr").length === 0) {
    alert("Cart is empty, add products first before purchase");
    return;
  }
  const myModal = new bootstrap.Modal(document.getElementById('myModal'))
  myModal.show()

  addEventtoModal();
}

function addEventtoModal() {
  // reset form when click close button
  $(".btn-close").click(function (e) {
    $("#payment-details")[0].reset();
  });

  // total price to pay
  $("#total-payment").text($(".total-price").text());

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
      updateProduct();
    }
  });
}

function updateProduct() {
  $(".cart-list").each(function (index, element) {
    const title = $(element).children(".title").text();
    const quantity = $(element).find(".quantity").val();

    const products = getProductsFromLocalStorage();
    for (const product of products) {
      if (product.name === title) {
        product.stock -= quantity;
        break;
      }
    }

    setProductsToLocalStorage(products);
  });

  $("tbody").html("");
  updateCartTotal();
  ready();
  alert("Thank you for your purchase");
}

function addItemToCart(title, price) {
  let isProductAvailable;

  $(".title").each(function (index, element) {
    if ($(element).text() === title) {
      alert("This item is already addes to the cart");
      isProductAvailable = true;
    }
  });

  if (isProductAvailable) {
    return;
  }

  $("tbody").append(`
    <tr class="cart-list">
      <td class="title">${title}</td>
      <td class="price">${price}</td>
      <td style="width: 15%">
        <input
          id="quantity"
          type="number"
          min="1"
          class="form-control quantity input-focus"
          value="1"
        />
      </td>
      <td class="text-center">
        <button class="btn btn-danger remove">Remove</button>
      </td>
    </tr>
  `);

  addEventToRemoveButton();
  addEventToQuantityField();
}

function updateCartTotal() {
  let total = 0;
  $("tbody").children("tr").each(function (index, element) {
    let price = $(element).find(".price").text().replace("Rp", "").replace(".", "");
    let quantity = $(element).find(".quantity").val();
    total += price * quantity
  });

  $(".total-price").text(formatRupiah(total));
}

function getEmployeesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[0];
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[1];
}

function setProductsToLocalStorage(products) {
  localStorage.setItem("rajaerba", JSON.stringify([getEmployeesFromLocalStorage(), products]))
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

