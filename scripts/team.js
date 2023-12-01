let fbAuth = firebase.auth();

async function pickOak() {
  fbAuth.onAuthStateChanged(async user => {
    await db.collection("users").doc(user.uid).update({
      team: "Oak"
    });
    // window.location.assign("main.html");
  })
}

async function pickMaple() {
  fbAuth.onAuthStateChanged(async user => {
    await db.collection("users").doc(user.uid).update({
      team: "Maple"
    });
    // window.location.assign("main.html");
  })
}

async function pickEvergreen() {
  fbAuth.onAuthStateChanged(async user => {
    await db.collection("users").doc(user.uid).update({
      team: "Evergreen"
    });
    // window.location.assign("main.html");
  })
}

let highlightedImage = null;

function highlight(container) {
  if (highlightedImage !== null) {
    highlightedImage.classList.remove('highlighted');
  }
  container.classList.add('highlighted');
  highlightedImage = container;
}

function joinTeam() {
  if (highlightedImage) {
      const imageAlt = highlightedImage.querySelector('img').alt;
      if (imageAlt === 'Oak') {
        pickOak();
        // alert('You have joined team Oak!');
        Swal.fire({
          title: "You have joined team Oak!",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.assign("main.html");
          }
        });
      } else if (imageAlt === 'Maple') {
        pickMaple();
        // alert('You have joined team Maple!');
        Swal.fire({
          title: "You have joined team Maple!",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.assign("main.html");
          }
        });
      } else if (imageAlt === 'Evergreen') {
        pickEvergreen();
        // alert('You have joined team Evergreen!');
        Swal.fire({
          title: "You have joined team Evergreen!",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.assign("main.html");
          }
        });
      }
  } else {
    Swal.fire({
      title: "No team seleced",
      text: "Please select a team",
      icon: "error"
    });
  }
}