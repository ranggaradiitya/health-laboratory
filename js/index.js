$.getJSON("../rajaerba.json",
  function (data) {
    localStorage.setItem("rajaerba", JSON.stringify(data))
  }
);