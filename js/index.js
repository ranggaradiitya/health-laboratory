addDataToLocalStorage();

function addDataToLocalStorage() {
  const isDataAvailable = localStorage.getItem("rajaerba");
  if (isDataAvailable) return;
  $.getJSON("../rajaerba.json",
    function (data) {
      localStorage.setItem("rajaerba", JSON.stringify(data))
    }
  );
}

