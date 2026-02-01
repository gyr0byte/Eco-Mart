// Log tab interactions for professional audit
var radios = document.getElementsByName("view");

for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", function () {
    console.log("Section changed to: " + this.id);
  });
}
