ready();

async function ready() {
  try {
    await addAllProductsToTable()
    addProduct();
    updateProduct();
    editProduct();
    deleteProduct();
    searchProduct();
    logOut();
  } catch (error) {
    console.log("can't ready", error);
  }
}

function productsRef() {
  const database = firebase.database();
  return database.ref("products");
}

async function addAllProductsToTable() {
  $("tbody").empty();
  const snapshot = await productsRef().once("value");
  const productsData = snapshot.val();
  let number = 0;
  for (const productId in productsData) {
    const product = productsData[productId];
    $("tbody").append(`
      <tr>
        <td hidden>${productId}</td>
        <td>${++number}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.supplier}</td>
        <td>${product.stock}</td>
        <td>${formatRupiah(product.price)}</td>
        <td class="d-flex">
          <button class="btn btn-warning text-light me-2 editBtn">Edit</button>
          <button class="btn btn-danger removeBtn">Remove</button>
        </td>
      </tr>
    `);
  }
}

function addProduct() {
  $("#add").click(async function (e) {
    try {
      e.preventDefault();
      const name = $("#name").val();
      const category = $("#category").val();
      const supplier = $("#supplier").val();
      const stock = $("#stock").val();
      const price = $("#price").val();

      const isProductExist = await checkProductsName(name);

      if (isValid(e)) {
        if (isProductExist) {
          alert("Product already exist");
          return;
        }

        const autoId = productsRef().push().key;
        const newProduct = {
          name, category, supplier, stock, price,
          image: "blank.png"
        }
        productsRef().child(autoId).set(newProduct);

        alert("Product added successfully");
        await addAllProductsToTable();
        editProduct();
        deleteProduct()
        clearInput();
      }
    } catch (error) {
      console.log("can't add product", error);
    }
  });
}

function updateProduct() {
  $("#update").click(async function (e) {
    try {
      e.preventDefault();
      const id = $("#id").val();
      const name = $("#name").val();
      const category = $("#category").val();
      const supplier = $("#supplier").val();
      const stock = $("#stock").val();
      const price = $("#price").val();

      if (isValid(e)) {
        const newProduct = { name, category, supplier, stock, price, }
        productsRef().child(id).update(newProduct);

        alert("Product updated successfully");
        await addAllProductsToTable();
        editProduct();
        deleteProduct()
        clearInput();
      }
    } catch (error) {
      console.log("can't update product", error);
    }
  });
}

function editProduct() {
  $(".editBtn").each(function (index, element) {
    $(element).click(function (e) {
      e.preventDefault();
      const id = $(element).parent().siblings().eq(0).text();
      const name = $(element).parent().siblings().eq(2).text();
      const category = $(element).parent().siblings().eq(3).text();
      const supplier = $(element).parent().siblings().eq(4).text();
      const stock = $(element).parent().siblings().eq(5).text();
      const price = $(element).parent().siblings().eq(6).text().replace("Rp", "").replaceAll(".", "");
      $("#id").val(id);
      $("#name").val(name);
      $("#category").val(category);
      $("#supplier").val(supplier);
      $("#stock").val(stock);
      $("#price").val(price);
    });
  });
}

function deleteProduct() {
  $(".removeBtn").each(function (index, element) {
    $(element).click(function (e) {
      e.preventDefault();
      if (confirm("Are you sure to delete this product?")) {
        const id = $(element).parent().siblings().eq(0).text();
        productsRef().child(id).remove()
          .then(async () => {
            try {
              alert("Product deleted successfully");
              await addAllProductsToTable();
              editProduct();
              deleteProduct()
            } catch (error) {
              console.log("can't delete product", error);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  });
}

async function checkProductsName(name) {
  try {
    const snapshot = await productsRef().once("value");
    const products = Object.values(snapshot.val());
    const findProductName = products.find(product => product.name === name);
    if (findProductName) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("can't check product name", error);
  }
}

function searchProduct() {
  $("#search").on("input", function (e) {
    $("tbody").children().each(function (index, element) {
      const name = $(element).children().eq(2).text().toLowerCase();
      const searchValue = $("#search").val().toLowerCase();
      if (name.includes(searchValue)) {
        $(element).css("display", "");
      } else {
        $(element).css("display", "none");
      }
    });
  });
}

function isValid(e) {
  const id = $("#id").val();
  const name = $("#name").val();
  const category = $("#category").val();
  const supplier = $("#supplier").val();
  const stock = $("#stock").val();
  const price = $("#price").val();

  if ($(e.target).attr("id") === "update") {
    if (id === "") {
      alert("Can't update the product, please click the edit button first before clicking the update button");
      return false;
    }
  }
  if (name === "" || category === "" || supplier === "" || stock === "" || price === "") {
    alert('Please fill all the fields');
    return false;
  }
  return true
}

function logOut() {
  $("#logout").click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem("isEmployeeLoggedIn");
    sessionStorage.removeItem("employeeId");
    window.location.href = "../index.html";
  });
}

function clearInput() {
  $("#id").val("");
  $("#name").val("");
  $("#category").val("");
  $("#supplier").val("");
  $("#stock").val("");
  $("#price").val("");
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



