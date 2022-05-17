ready();

function ready() {
  addDataToLocalStorage();
  setTimeout(() => {
    productShowcase();
  }, 1000);
  goToTopButton();
}

function addDataToLocalStorage() {
  const isDataAvailable = localStorage.getItem("rajaerba");
  if (isDataAvailable) return;
  $.getJSON("/health-laboratory/rajaerba.json",
    function (data) {
      localStorage.setItem("rajaerba", JSON.stringify(data));
    }
  );
}

function productShowcase() {
  $("#product-showcase").empty();
  const products = getProductsFromLocalStorage();
  $.each(products, function (index, product) {
    if (index === 4) {
      return false;
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
            <h6 class="card-title">ONSITE Rapid Test Covid19</h6>
          </div>
        </div>
      </div>
     `);
  });
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("rajaerba"))[1];
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
