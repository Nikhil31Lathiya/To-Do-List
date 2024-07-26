function validate(event) {
  event.preventDefault();
  let cname = document.forms["form2"]["cname"].value;
  let cemail = document.forms["form2"]["cemail"].value;
  let cphone = document.forms["form2"]["cphone"].value;
  let cquery = document.forms["form2"]["cquery"].value;

  if (cname === "") {
    alert("Please enter a name");
  } else if (cemail === "") {
    alert("Please enter an email");
  } else if (cphone === "") {
    alert("Please enter a contact number");
  } else {
    alert("Please enter your query");
  }
}
