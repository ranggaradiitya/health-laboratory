if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCardItem);
  }

  let quantityInputs = document.getElementsByClassName("quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  let tableItems = document.getElementsByTagName("tbody")[0];
  tableItems.innerHTML = "";
  updateCartTotal();
}

function removeCardItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("card-title")[0].innerText;
  let price = shopItem.getElementsByClassName("card-text")[0].innerText;
  addItemToCart(title, price);
  updateCartTotal();
}

function addItemToCart(title, price) {
  let tableRow = document.createElement("tr");
  let tableItems = document.getElementsByTagName("tbody")[0];
  let tableItemsNames = document.getElementsByClassName("title");
  for (let i = 0; i < tableItemsNames.length; i++) {
    if (tableItemsNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let tableRowContents = `
    <td class="title">${title}</td>
    <td class="price">${price}</td>
    <td style="width: 15%">
      <input
        type="number"
        min="1"
        class="form-control quantity"
        value="1"
      />
    </td>
    <td class="text-center">
      <button class="btn btn-danger remove">Remove</button>
    </td>
  `;
  tableRow.innerHTML = tableRowContents;
  tableItems.append(tableRow);
  tableRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCardItem);
  tableRow
    .getElementsByClassName("quantity")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  let tableBody = document.getElementsByTagName("tbody")[0];
  let tableRows = tableBody.getElementsByTagName("tr");
  let total = 0;
  for (let i = 0; i < tableRows.length; i++) {
    let tableRow = tableRows[i];
    let priceElement = tableRow.getElementsByClassName("price")[0];
    let quantityElement = tableRow.getElementsByClassName("quantity")[0];
    let price = priceElement.innerText.replace("Rp", "").replace(".", "");
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  document.getElementsByClassName("total-price")[0].innerText =
    formatRupiah(total);
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
