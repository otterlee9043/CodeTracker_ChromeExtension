function selectText() {
  var selectionText = "";
  if (document.getSelection) {
    selectionText = document.getSelection();
  } else if (document.selection) {
    selectionText = document.selection.createRange().text;
  }
  return selectionText;
}

window.addEventListener(
  "mouseup",
  (event) => {
    console.log(event.toElement.parentElement.innerText);
    const selectedString = selectText().toString();
    const selectedLines = selectedString.split("\n");
    console.log(selectedLines);
    // console.log();
  },
  false
);

window.addEventListener(
  "click",
  () => {
    console.log("click!!");
  },
  false
);

console.log(document.querySelectorAll("span.pl-en"));
