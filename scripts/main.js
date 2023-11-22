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

function populateCurrentPoints() {
  firebase.auth().onAuthStateChanged(user => {
    var currentPoints = db.collection("users").doc(user.uid);
    currentPoints.get()
      .then(userDoc => {
        var cp = userDoc.data().points;
        document.getElementById("currentPoints").value = cp;
      })
  })
  
}
populateCurrentPoints();


// Haversine formula to find the distance(km) between two sets of latitudes and longitudes.
function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

function populateLocation() {

  var stop1 = db.collection("stopNo").doc(document.getElementById("stopNo1").value)
  stop1.get()
    .then(stopDoc => {
      var lat1 = stopDoc.data().latitude;
      var lon1 = stopDoc.data().longitude;
      document.getElementById("lat1").value = lat1;
      document.getElementById("lon1").value = lon1;
    })

  var stop2 = db.collection("stopNo").doc(document.getElementById("stopNo2").value)
  stop2.get()
    .then(stopDoc => {
      var lat2 = stopDoc.data().latitude;
      var lon2 = stopDoc.data().longitude;
      document.getElementById("lat2").value = lat2;
      document.getElementById("lon2").value = lon2;
    })
}

function gainPoints() {
  
  var km = distance(
    document.getElementById("lat1").value, 
    document.getElementById("lon1").value, 
    document.getElementById("lat2").value, 
    document.getElementById("lon2").value
    );
  
  var pointsEarned = Math.round(km * 10);
  console.log("Points Earned: " + pointsEarned);
  document.getElementById("points").value = pointsEarned;

  firebase.auth().onAuthStateChanged(user => {
    var userPoints = db.collection("users").doc(user.uid);
    userPoints.get()
      .then(pointsDoc => {
        var treeLvl = pointsDoc.data().treeLevel;
        var nextTree = 100 * treeLvl
        var treesPlanted = pointsDoc.data().treesPlanted;
        var currentPoints = pointsDoc.data().points;
        var pointsTotal = currentPoints + pointsEarned;
        if (pointsTotal >= nextTree) {
          ++treeLvl;
          ++treesPlanted;
          userPoints.update({
            treeLevel: treeLvl,
            treesPlanted: treesPlanted
          })
        }
        userPoints.update({
          points: pointsTotal
        })
        .then(populateCurrentPoints())
        .then(populateTrees())
      })
  });

}

function populateTrees() {
  firebase.auth().onAuthStateChanged(user => {
    var userTrees = db.collection("users").doc(user.uid);
    userTrees.get()
      .then(treeDoc => {
        var treeLvl = 100 * treeDoc.data().treeLevel;
        var nextTree = treeLvl - treeDoc.data().points;
        var noTrees = treeDoc.data().treesPlanted;
        document.getElementById("nextTree").innerText = nextTree;
        document.getElementById("noTrees").innerText = noTrees;
      })
  })
}
populateTrees();
