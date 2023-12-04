var currentUser;               //points to the document of the user who is logged in

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

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

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");
        var ImageFile = document.getElementById('mypic-input').files[0];

        if (ImageFile != null) {
            //Asynch call to put File Object (global variable ImageFile) onto Cloud
            storageRef.put(ImageFile)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');

                    //Asynch call to get URL from Cloud
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get "url" of the uploaded file
                            console.log("Got the download URL.");
                            //get values from the from
                            userName = document.getElementById('nameInput').value;
                            teamName = document.getElementById("team-select").value;
                            // userSchool = document.getElementById('schoolInput').value;
                            // userCity = document.getElementById('cityInput').value;

                            db.collection("users").doc(user.uid).update({
                                displayName: userName,
                                team: teamName,
                                // school: userSchool,
                                // city: userCity,
                                profilePic: url // Save the URL into users collection
                            })
                                .then(function () {
                                    console.log('Added Profile Pic URL to Firestore.');
                                    console.log('Saved user profile info');
                                    console.log('User name is: ' + userName)
                                    document.getElementById('personalInfoFields').disabled = true;
                                    // populateInfo();
                                })
                        })
                })
        } else {
            userName = document.getElementById('nameInput').value;
            teamName = document.getElementById('team-select').value;
            // userSchool = document.getElementById('schoolInput').value;
            // userCity = document.getElementById('cityInput').value;

            db.collection("users").doc(user.uid).update({
                displayName: userName,
                team: teamName
                // school: userSchool,
                // city: userCity,
                // profilePic: url // Save the URL into users collection
            })
                .then(function () {
                    console.log('Added Profile Pic URL to Firestore.');
                    console.log('Saved user profile info');
                    console.log('User name is: ' + userName)
                    document.getElementById('personalInfoFields').disabled = true;
                    // populateInfo();
                })
        }
    })
}



function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().displayName;
                    let teamName = userDoc.data().team;
                    // let userCity = userDoc.data().city;
                    let picUrl = userDoc.data().profilePic;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                        document.getElementById("name-goes-here").value = userName;
                        console.log('name is now: ' + userName);
                    }

                    if (teamName != null) {
                        document.getElementById("team-select").value = teamName;
                    }
                    // if (userSchool != null) {
                    //     document.getElementById("schoolInput").value = userSchool;
                    // }
                    // if (userCity != null) {
                    //     console.log(userCity)
                    //     document.getElementById("cityInput").value = userCity;
                    // }
                    if (picUrl != null) {
                        console.log(picUrl);
                        // use this line if "mypicdiv" is a "div"
                        //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here").attr("src", picUrl);
                    }
                    else
                        console.log("picURL is null");
                })

        } else {
            console.log("no user is logged in")
        }
    }

    )

}
populateInfo();


function saveAndPopulate() {
    saveUserInfo(); // Call the first function

    // Delay the second function by 5000 milliseconds (5 seconds)
    setTimeout(function () {
        populateInfo();
        // Refresh the page after populateInfo() is done
        location.reload();
    }, 800);
}