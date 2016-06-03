// Set global infowindow var
var infowindow = null;

function mapHealthClinicLocations(data) {
  
  // Create Map with Nashville as center
  var nashvilleCoords = new google.maps.LatLng(36.1627, -86.7816);
   var mapOptions = {
      zoom: 13,
      center: nashvilleCoords
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Cycle through each health clinic location
  for (var i = 0; i < data.length; i++) {

    // Get current health clinic lat and lon
    var lat = data[i].location_1.latitude;
    var lon = data[i].location_1.longitude;
    
    // Store in LatLng var
    var myLatlng = new google.maps.LatLng(lat,lon);

    // Create info window for datapoint
    infowindow = new google.maps.InfoWindow();

    // Set marker title to be based on clinic name and hours
    var markerTitle = `<h6>${data[i].clinic_name}</h6>
                        <h6>${data[i].hours}</h6>`

    // Create marker based on LatLng
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: markerTitle,
        icon: "../img/hospitalMarker.png"
    });

    // Add event listener to marker to show infowindow, and setContent
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(this.title);
      infowindow.open(map, this);
    });

    // Add marker to map
    marker.setMap(map);
  }

}

// Create XMLHttpRequest object
var xmlhttp = new XMLHttpRequest();

// Create logic for when readyState changes
xmlhttp.onreadystatechange = function() {
  // Check ready state and status
  if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

    // Parse and store responseText
    var data = JSON.parse(xmlhttp.responseText);
  
    mapHealthClinicLocations(data);
  }
};

// Open request
xmlhttp.open('GET', "https://data.nashville.gov/resource/isvx-zkqv.json?$$app_token=[YOUR_APP_TOKEN]");

// Send request
xmlhttp.send();