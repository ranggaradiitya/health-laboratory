ready();

function ready() {
  refreshProducts();
  crudOperation();
  clearInput();
}

function refreshProducts() {
  $("tbody").empty();
  const products = getProductsFromLocalStorage();
  $.each(products, function (index, product) {
    $("tbody").append(`
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.supplier}</td>
        <td>${product.stock}</td>
        <td>${formatRupiah(product.price)}</td>
      </tr>
    `);
  });
}

function crudOperation() {
  $("button").click(function (e) {
    const idAttr = $(this).attr("id");
    switch (idAttr) {
      case "add":
        addProduct();
        break;
      case "update":
        updateProduct();
        break;
      case "delete":
        deleteProduct();
        break;
      case "search":
        e.preventDefault();
        searchProduct();
        break;
    }
  });
}

function getEmployeesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[0];
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[1];
}

function getPaymentDetailsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[2];
}

function setProductsToLocalStorage(products) {
  localStorage.setItem("rajaerba", JSON.stringify([getEmployeesFromLocalStorage(), products, getPaymentDetailsFromLocalStorage()]))
}

function clearInput() {
  $("#id").val("");
  $("#name").val("");
  $("#category").val("");
  $("#supplier").val("");
  $("#stock").val("");
  $("#price").val("");
}

function addProduct() {
  const name = $("#name").val();
  const category = $("#category").val();
  const supplier = $("#supplier").val();
  const stock = $("#stock").val();
  const price = $("#price").val();

  const isValid = name && category && supplier && stock && price;
  if (isValid) {
    const products = getProductsFromLocalStorage();
    for (const product of products) {
      if (name === product.name) {
        alert("Product already exists")
        return;
      }
    }
    let lastId = products[products.length - 1].id;
    products.push({
      id: `${++lastId}`,
      name,
      category,
      supplier,
      stock,
      price,
      image: "blank.png"
    })
    alert("Product added successfully");
    setProductsToLocalStorage(products);
    refreshProducts();
  }
}

function updateProduct() {
  const id = $("#id").val();
  const name = $("#name").val();
  const category = $("#category").val();
  const supplier = $("#supplier").val();
  const stock = $("#stock").val();
  const price = $("#price").val();

  const isValid = name && category && supplier && stock && price;
  if (isValid) {
    const products = getProductsFromLocalStorage();
    for (const product of products) {
      if (product.id === id) {
        product.name = name;
        product.category = category;
        product.supplier = supplier;
        product.stock = stock;
        product.price = price;
        break;
      }
    };
    alert("Product updated successfully");
    setProductsToLocalStorage(products);
    refreshProducts();
  }
}

function deleteProduct() {
  const id = $("#id").val();
  const name = $("#name").val();

  if (id || name) {
    const products = getProductsFromLocalStorage();
    for (const product of products) {
      if (product.id === id || product.name === name) {
        const confirmation = confirm("Are you sure you want to delete this product?");
        if (confirmation) {
          products.splice(products.indexOf(product), 1);
          alert("Product deleted successfully");
          setProductsToLocalStorage(products);
          refreshProducts();
        }
        return;
      }
    }
    alert("Product not found");
  }
}

function searchProduct() {
  const id = $("#id").val();

  if (id) {
    const products = getProductsFromLocalStorage();
    for (const product of products) {
      if (product.id === id) {
        $("#name").val(product.name)
        $("#category").val(product.category)
        $("#supplier").val(product.supplier)
        $("#stock").val(product.stock);
        $("#price").val(product.price);
        return;
      }
    }
    alert("Product not found");
    clearInput();
  } else {
    alert("Please enter an ID Product")
  }
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


