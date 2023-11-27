//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {

      // Sign-out successful.
      alert('See you next time!');
    }).catch((error) => {
      // An error happened.
    });
}