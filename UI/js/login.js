// $(document).ready(function() {
$(document).ready(function() {
  $(".message a").click(function() {
    $("form").animate(
      {
        height: "toggle",
        opacity: "toggle"
      },
      "fast"
    );
  });
});
