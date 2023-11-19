function writeActivity() {
  var activityRef = db.collection("activity");

  activityRef.add({
    code: "Ride1",
    service: "uber",
    date: "November 1, 2023",
    price: "12.34"
  });

  activityRef.add({
    code: "Ride2",
    service: "lyft",
    date: "November 2, 2023",
    price: "23.45"
  });

  activityRef.add({
    code: "Ride3",
    service: "uber",
    date: "November 3, 2023",
    price: "34.56"
  });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("activityBlockTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

  db.collection(collection).get()   //the collection called "activity"
      .then(allActivity=> {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          allActivity.forEach(doc => { //iterate thru each doc
              var service = doc.data().service;       // get value of the "name" key
              var date = doc.data().date;  // get value of the "details" key
              var price = doc.data().price;    //get unique ID to each hike to be used for fetching right image
              let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

              //update title and text and image
              newcard.querySelector('.activityService').innerHTML = service;
              newcard.querySelector('.activityDate').innerHTML = date;
              newcard.querySelector('.activityPrice').innerHTML = "$" + price;
              newcard.querySelector('.activityLogo').src = `./images/${service}placeholder.png`;

              document.getElementById(collection + "-go-here").appendChild(newcard);

          })
      })
}

displayCardsDynamically("activity");  //input param is the name of the collection