var currentUser;               //points to the document of the user who is logged in

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");
        var ImageFile = document.getElementById('mypic-input').value;

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
                        // userSchool = document.getElementById('schoolInput').value;
                        // userCity = document.getElementById('cityInput').value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            // school: userSchool,
                            // city: userCity,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved user profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}


// Something is wrong with the URL, but I'm not sure how to fix it yet.


function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().displayName;
                    // let userSchool = userDoc.data().school;
                    // let userCity = userDoc.data().city;
                    let picUrl = userDoc.data().profilePic;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
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