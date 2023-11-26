async function signUp() {
    // get user's info.
    const email = document.getElementById('signup-email').value;
    const userName = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;


    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is invalid')
        return;
        // Don't continue running the code
    }

    try {

        // sign up the user.
        const cred = await auth.createUserWithEmailAndPassword(email, password);

        // Update user profile
        await cred.user.updateProfile({
            displayName: userName
        });

        // Add user information to Firestore
        await db.collection("users").doc(cred.user.uid).set({
            displayName: userName,
            email: cred.user.email,
            account_created: Date.now(),
            last_login: Date.now(),
            points: 0,
            treesPlanted: 0,
            treeLevel: 1

        });

        console.log('New user has been added to firestore.');
        window.location.assign("team.html");
    } catch (error) {
        console.log('Error adding new user: ' + error);
    }
    // sign up the user.
    // auth.createUserWithEmailAndPassword(email, password).then(cred => {

    //     db.collection("users").doc(cred.user.uid).set({
    //         displayName: username,
    //         email: cred.user.email,
    //         account_created: Date.now(),
    //         last_login: Date.now(),
    //         points: 0
    //     })
    //     return cred.user.updateProfile({
    //         displayName: username
    //     }).then(function () {
    //         console.log('New user has been added to firestore.');
    //         window.location.assign("main.html");
    //     }).catch(function (error) {
    //         console.log('Error adding new user: ' + error);
    //     });
    // })

}


// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password.length < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}



// logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('clock', (e) => {
//     e.preventDefault();
//     auth.signOut().then(() => {
//         console.log('user logged out.');
//     });
// });