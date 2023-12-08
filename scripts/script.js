//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logouttt() {
  firebase.auth().signOut().then(() => {

      // Sign-out successful.
      alert('See you next time!');
      Swal.fire({
        title: "Logout Successful",
        text: "See you next time!",
        icon: "success"
      });
    }).catch((error) => {
      // An error happened.
    });
}


function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      // Redirect to index.html with a success query parameter
      window.location.href = 'index.html?logout=success';
    }).catch((error) => {
      // An error happened.
      // Redirect to index.html with an error query parameter
      window.location.href = 'index.html?logout=error';
    });
}