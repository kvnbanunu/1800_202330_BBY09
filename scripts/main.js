let fbAuth = firebase.auth();

function getNameFromAuth() {
  fbAuth.onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      //Do something for the currently logged-in user here:
      fbAuth.onAuthStateChanged(user => {
        let userID = db.collection("users").doc(user.uid);
        userID.get()
        .then(userDetails => {
          userName = userDetails.data().displayName;
          document.getElementById("name-goes-here").innerText = userName;
        })
      })
    } else {
      // No user is signed in.
    }
  })
}
getNameFromAuth();

function populateCurrentPoints() {
  fbAuth.onAuthStateChanged(user => {
    let userID = db.collection("users").doc(user.uid);
    userID.get()
    .then(userDoc => {
      cp = userDoc.data().points;
      document.getElementById("currentPoints").innerText = cp;
      updateProgressBar(progressBar, cp);
    })
  })
}
populateCurrentPoints();

const progressBar = document.getElementById("myProgressBar");

function updateProgressBar(progressBar, totalPoints) {
  const progressWidth = totalPoints % 100;

  progressBar.style.width = progressWidth + "%";

  if (progressWidth === 0) {
    progressBar.style.width = "0%";
  }
}

function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

let treeLvl = 1;
let treeLvlThreshold = 100;
let nextTree = 100;
let noTrees = 0;
function populateTrees() {
  fbAuth.onAuthStateChanged(user => {
    let userID = db.collection("users").doc(user.uid);
    userID.get()
      .then(treeDoc => {
        treeLvl = treeDoc.data().treeLevel;
        treeLvlThreshold = 100 * treeLvl;
        nextTree = treeLvlThreshold - treeDoc.data().points;;
        noTrees = treeDoc.data().treesPlanted;
        document.getElementById("nextTree").innerText = nextTree;
        document.getElementById("noTrees").innerText = noTrees;
      })
  })
}
populateTrees();

let lat1 = 0;
let lon1 = 0;
let lat2 = 0;
let lon2 = 0;
async function getLocation() {
  let stopNo1 = document.getElementById("stopNo1").value;
  let url1 = 'https://api.translink.ca/rttiapi/v1/stops/' + stopNo1 + '?apikey=QFhRbhrC252PYLGdcdcn';
  let stopNo2 = document.getElementById("stopNo2").value;
  let url2 = 'https://api.translink.ca/rttiapi/v1/stops/' + stopNo2 + '?apikey=QFhRbhrC252PYLGdcdcn';
  
  try {
    let response1 = await fetch(url1, {
      headers: {
        'Accept': 'application/json'
      }
    });
    let data1 = await response1.json();

    lat1 = data1.Latitude;
    lon1 = data1.Longitude;

    let response2 = await fetch(url2, {
      headers: {
        'Accept': 'application/json'
      }
    });
    let data2 = await response2.json();
    lat2 = data2.Latitude;
    lon2 = data2.Longitude;

  } catch (error) {
    console.error('Error:', error);
  }
}

let pointsTotal = 0;
let newTreeLevel = false;
async function gainPoints() {
  await getLocation();
  console.log("lat1: " + lat1);
  console.log("lon1: " + lon1);
  console.log("lat2: " + lat2);
  console.log("lon2: " + lon2);
  let km = distance(lat1, lon1, lat2, lon2);
  console.log(km);
  let pointsEarned = Math.floor(km);
  if (isNaN(pointsEarned)) { //Checks if the the result is NaN
    console.error("Invalid points");
    // alert("This bus stop does not seem to exist. Please enter a real bus stop.");
    Swal.fire({
      title: "This bus stop does not seem to exist.",
      text: "Please enter a real bus stop.",
      icon: "error"
    });
    return;
  }
  if (pointsEarned < 1) {
    pointsEarned = 1;
  } else {};
  console.log("Points Earned: " + pointsEarned);
  // document.getElementById("points").value = pointsEarned;

  fbAuth.onAuthStateChanged(user => {
    let userID = db.collection("users").doc(user.uid);
    userID.get()
      .then(pointsDoc => {
        pointsTotal = cp + pointsEarned;
        if (pointsTotal >= treeLvlThreshold) {
          newTreeLevel = true;
          ++treeLvl;
          ++noTrees;
          userID.update({
            treeLevel: treeLvl,
            treesPlanted: noTrees
          })
        } else {};
        userID.update({
          points: pointsTotal
        })
        .then(populateCurrentPoints())
        .then(populateTrees())
        .then(printReward(pointsEarned));
      })
  });
}

function printReward(newPoints) {
  if (newTreeLevel === true) {
    newTreeLevel = false;
    let newPoints1 = "You just earned " + newPoints + " points and planted a new tree!"
    // alert("Congratulations! You just earned " + newPoints + " points and planted a new tree!");
    Swal.fire({
      title: "Congratulations!",
      text: newPoints1,
      icon: "success"
    });
  } else {
    let newPoints2 = "You just earned " + newPoints + " points!"
    // alert("Congratulations! You just earned " + newPoints + " points!");
    Swal.fire({
      title: "Congratulations!",
      text: newPoints2,
      icon: "success"
    });
  }
}
