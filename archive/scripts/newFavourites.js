
function newFavourite() {
    console.log("inside add new favourite");
    let destinationName = document.getElementById("name").value;
    let destinationAddress = document.getElementById("address").value;



    console.log(destinationName, destinationAddress);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("favourites").add({
            userID: userID,
            name: destinationName,
            address: destinationAddress,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "saved.html"; // Redirect to the "saved" page
        });
    } else {
        console.log("No user is signed in");
        // window.location.href = 'newFavourites.html';
    }
}