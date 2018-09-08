// JavaScript source code
function GoogleMap() {

    var map;
    var markers;
    var companyPosition;
    var info;

    this.initialize = function (clat, clng) {
        markers = [];
        info = new google.maps.InfoWindow();
        companyPosition = { lat: parseFloat(clat), lng: parseFloat(clng) };

        google.maps.event.addDomListener(window, 'load', onLocationSuccess);
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, { timeout: 3000 });
    }

    function onLocationSuccess(position) {
        map = showMapOnLocation();
        return map;
    }

    function onLocationError(error) {
        map = showMapOnLocation();
        return map;
    }

    var showMapOnLocation = function () {       
        var Gmap = new google.maps.Map(document.getElementById('map-canvas'), {
            center: companyPosition,
            zoom: 13
        });

        //add current location to map as marker
        var marker = new google.maps.Marker({
            position:companyPosition,
            map: Gmap
        });
        markers.push(marker);

        // This event listener will call addMarker() when the map is clicked.
        Gmap.addListener('click', function (event) {
            addMarker(event.latLng);

            document.getElementById('long').value = event.latLng.lng();
            document.getElementById('lat').value = event.latLng.lat();
        });

        GetListingLocations();

        return Gmap;
    }

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
        deleteMarkers();
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(_map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(_map);
        }
    }

    //A function to display the rest of the Listing's Locations on the map
    function GetListingLocations() {
        var listingId = localStorage.getItem("selectedListingId");

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                message = JSON.parse(this.responseText);
                if (message.success == 1) {
                    var sfImage = "img/icon25_25.png";
                    for (var location in message.listingLocations)
                    {
                        //don't add the current location
                        var listingLocationId = localStorage.getItem("selectedListingLocationId");
                        if (listingLocationId != message.listingLocations[location].ListingLocationId)
                        {
                            locationPosition = { lat: parseFloat(message.listingLocations[location].Latitude), lng: parseFloat(message.listingLocations[location].Longitude) };

                            var marker = new google.maps.Marker({
                                position: locationPosition,
                                map: map,
                                icon: sfImage
                            });

                            var MarkerContent = "<div>" +
                                                    "<h2>" + message.listingLocations[location].Title + "</h2>" +
                                                    "<p>" + message.listingLocations[location].StreetAddress + "</p>" +
                                                "</div>";

                            google.maps.event.addListener(marker, 'click', function (marker, MarkerContent, info) {
                                return function () {
                                    info.setContent(MarkerContent);
                                    info.open(map, marker);
                                };
                            }(marker, MarkerContent, info));
                        }
                    }
                }
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetListingLocationsByListingId", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("listingId=" + listingId);
    }
}

function GoogleMapForNewLocation() {
    var map;
    var markers;
    var info;

    this.initialize = function () {
        markers = [];
        info = new google.maps.InfoWindow();
        google.maps.event.addDomListener(window, 'load', onLocationSuccess);
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, { timeout: 10000 });
    }

    function onLocationSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;

        map = showMapMyLocation(lat, lang);
        return map;
    }

    var showMapMyLocation = function (lat, lang) {
        var mapOptions =
            {
                zoom: 13,
                center: new google.maps.LatLng(lat, lang)
            }

        var Gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        google.maps.event.addListener(Gmap, 'click', function (event) {
            addMarker(event.latLng);

            GetAddress(event.latLng.lat(), event.latLng.lng());

            document.getElementById('long').value = event.latLng.lng();
            document.getElementById('lat').value = event.latLng.lat();
        });

        GetListingLocations();

        return Gmap;
    }

    function onLocationError(error) {
        map = showMapWholeWorld();
        return map;
    }

    var showMapWholeWorld = function () {
        var mapOptions =
            {
                zoom: 2,
                center: new google.maps.LatLng(0, 0)
            }

        var Gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        google.maps.event.addListener(Gmap, 'click', function (event) {
            addMarker(event.latLng);

            document.getElementById('long').value = event.latLng.lng();
            document.getElementById('lat').value = event.latLng.lat();
        })

        GetListingLocations();

        return Gmap;
    }

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
        deleteMarkers();
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(_map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(_map);
        }
    }

    //A function to display the rest of the Listing's Locations on the map
    function GetListingLocations() {
        var listingId = localStorage.getItem("selectedListingId");

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                if (message.success == 1)
                {
                    var sfImage = "img/icon25_25.png";

                    for (var location in message.listingLocations)
                    {
                        locationPosition = { lat: parseFloat(message.listingLocations[location].Latitude), lng: parseFloat(message.listingLocations[location].Longitude) };

                        var marker = new google.maps.Marker({
                            position: locationPosition,
                            map: map,
                            icon: sfImage
                        });

                        var MarkerContent = "<div>" +
                                                "<h2>" + message.listingLocations[location].Title + "</h2>" +
                                                "<p>" + message.listingLocations[location].StreetAddress + "</p>" +
                                            "</div>";

                        google.maps.event.addListener(marker, 'click', function (marker, MarkerContent, info) {
                            return function () {
                                info.setContent(MarkerContent);
                                info.open(map, marker);
                            };
                        }(marker, MarkerContent, info));
                    }
                }
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetListingLocationsByListingId", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("listingId=" + listingId);
    }

    function GetAddress(lat, lng)
    {
        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);

                alert(JSON.stringify(message, null, 4));
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetAddressByCoords", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("lat=" + lat + "&long=" + lng);
    }
}

function GoogleMapForNewUserBooking() {

    var map;

    this.initialize = function () {
        google.maps.event.addDomListener(window, 'load', onLocationSuccess);
        navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, { timeout: 10000 });
    }

    function onLocationSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;

        map = showMapOnLocation(lat, lang);
        return map;
    }

    function onLocationError(error) {
        alert("Error");
    }

    var showMapOnLocation = function (lat, lang) {

        var mapOptions =
        {
            zoom: 13,
            center: new google.maps.LatLng(lat, lang)
        }

        var Gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        GetAllListingLocations();

        return Gmap;
    }


    //A function to display the Listing's Locations on the map
    function GetAllListingLocations() {
        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                if (message.success == 1)
                {
                    var sfImage = "img/icon25_25.png";
                    for (var location in message.listingLocations)
                    {
                        locationPosition = { lat: parseFloat(message.listingLocations[location].Latitude), lng: parseFloat(message.listingLocations[location].Longitude)};

                        var marker = new google.maps.Marker({
                            position: locationPosition,
                            map: map,
                            icon: sfImage
                        });

                        marker.set("id", message.listingLocations[location].ListingLocationId);

                        google.maps.event.addListener(marker, 'click', function () {
                            addClickHandler(marker);
                        }());
                    }
                }
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetAllListingLocations", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("");
    }

    function addClickHandler(marker)
    {
        google.maps.event.addListener(marker, 'click', function ()
        {
            localStorage.setItem("selectedListingLocationId", marker.get("id"));
            window.location = "newBooking_chooseOffice.html";
        });
    }
}
