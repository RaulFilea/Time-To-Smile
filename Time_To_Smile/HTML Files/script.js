function validateForm() {
  let email = document.forms["checkAppointments"]["emailAdress"].value;
  if (email == "") {
    alert("Please fill in the email address");
    return false;
  }
}
