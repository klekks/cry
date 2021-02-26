window.onload = function () {
  $("#preloader").hide();
  var file_input = $(`input[type="file"]`);
  var file_loader = $(`#file-input`);
  var crypto_text = "";
  var active_menu = $("#obj-mh-statistics");

  var parts = {
    "mh-statistics" : $("#obj-mh-statistics"),
    "mh-words" : $("#obj-mh-words"),
    "mh-letters" : $("#obj-mh-letters"),
    "mh-crypto" : $("#obj-mh-crypto"),
  }
  //$(".panel-obj").hide();
  var menu = $("#menu-holder div");

  menu.on("click", function (event) {
    active_menu.removeClass("active");;
    menu.removeClass(`active`);
    $(event.target).toggleClass("active");
    active_menu = parts[$(event.target).attr("name")];
    active_menu.toggleClass("active");
  });


  if (crypto_text == "") file_loader.show(300);

  file_input.on("input", function (event) {
      let file =   event.target.files[0];
      let reader = new FileReader();

      reader.onload = function() {
        crypto_text = reader.result.toUpperCase();
        if (crypto_text == "") {
          alert("Can not read this file!");
          return;
        }
        else {
          file_loader.toggle(200);
          $("#preloader").show(300);
          parseText(crypto_text);
          $("#preloader").hide(200);
        }
      };

      reader.onerror = function() {
        alert("Can not read this file!");
      };

      reader.readAsText(file);
  });

  $("#words-table th").on("click", function (event) {
    if ($(event.target).hasClass("active")) {
      if ($(event.target).hasClass("top-active")) {
        sortTable($(event.target).attr("sortby"), false);
        $(event.target).removeClass("top-active");
        $(event.target).addClass("bottom-active");
      }
      else {
        sortTable($(event.target).attr("sortby"), true);
        $(event.target).removeClass("bottom-active");
        $(event.target).addClass("top-active");
      }
    } else {
      $("th").removeClass();
      $(event.target).addClass("active");
      $(event.target).addClass("active top-active");
      sortTable($(event.target).attr("sortby"), true);
    }
  });

  $("#btn-add-replace").on("click", function () {
    let replace;
    let _with;
    replace = $("#select-replace").val().toUpperCase();
    _with = $("#select-with").val().toLowerCase();
    $("#select-replace").val("A");
    $("#select-width").val("A");
    ReplaceLetter(replace, _with);
  });

  $("#autocomplete").on("click", AutoUpdate);
};
