


function getLocation() {
  var stopNo = document.getElementById("stopNo").value;
  var url = 'https://api.translink.ca/rttiapi/v1/stops/' + stopNo + '?apikey=QFhRbhrC252PYLGdcdcn';
  fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const latitude = data.Latitude;
      const longitude = data.Longitude;
      document.getElementById("lat").value = latitude;
      document.getElementById("lon").value = longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    })
    .catch(error => console.error('Error:', error));
}