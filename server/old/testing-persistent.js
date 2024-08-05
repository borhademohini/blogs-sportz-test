

  var test = "global";
  var test = "global 2";
  console.log("test outside :: ", test);

  function average(a, b) {
    let test = "local";
    //let test = "shdgf";
    console.log("test :: ", test);
  }

  average(1, 2)