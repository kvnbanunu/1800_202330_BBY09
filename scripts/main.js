function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
      // Do something for the curretnly logged-in user here:
      console.log(user.uid); //print the uid in the browser console
      console.log(user.displayName); //print the user name in the browser console
      userName = user.displayName;

      document.getElementById("name-goes-here").innerText = userName;

    } else {
      // No user is signed in.
    }
  });
}
getNameFromAuth(); //run the function

// Haversine formula to find the distance(km) between two sets of latitudes and longitudes.
function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

function getLat(stopNo) {
  
  db.collection("stopNo").doc(stopNo)
    .onSnapshot(stopNoDoc => {
      console.log(stopNoDoc.data().latitude);
    })
  
  // var stopNo = document.getElementById("stopNo1").value
  // var lat_ref = db.ref("stopNo/" + stopNo)
  // lat_ref.on("value", function(snapshot) {
  //   var data = snapshot.val()

  //   console.log(data.latitude)

  // })

}

function getLon(stopNo) {

  db.collection("stopNo").doc(stopNo)
    .onSnapshot(stopNoDoc => {
      console.log(stopNoDoc.data().longitude);
    })
}