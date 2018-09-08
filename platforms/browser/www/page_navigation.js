function _Back()
{
    var currentPage = location.pathname.split('/').pop();
    if(currentPage.indexOf('list_of_listings.html') !== -1)
    {
        window.location = "index.html";
    }
    else if (currentPage.indexOf('list_of_locations.html') !== -1)
    {
        window.location = "list_of_listings.html";
    }
    else if (currentPage.indexOf('list_of_officeSpaces.html') !== -1) {
        window.location = "list_of_locations.html";
    }
    else if (currentPage.indexOf('list_of_genericOfficeItems.html') !== -1) {
        window.location = "list_of_officeSpaces.html";
    }
    else if (currentPage.indexOf('details_officeSpace.html') !== -1) {
        window.location = "list_of_officeSpaces.html";
    }
    else if (currentPage.indexOf('details_officeHour.html') !== -1) {
        window.location = "list_of_officeSpaces.html";
    }
    else if (currentPage.indexOf('list_of_specificOfficeItems.html') !== -1) {
        window.location = "details_officeSpace.html";
    }

    else if (currentPage.indexOf('details_listing.html') !== -1) {
        var getData = localStorage.getItem("getListingData");
        if (getData == "true")
        {
            window.location = "list_of_locations.html";
        }
        else
        {
            window.location = "list_of_listings.html";
        }
    }
    else if (currentPage.indexOf('details_location.html') !== -1) {
        var getData = localStorage.getItem("getListingLocationData");
        if (getData == "true")
        {
            window.location = "list_of_officeSpaces.html";
        }
        else
        {
            window.location = "list_of_locations.html";
        }
    }
    else if (currentPage.indexOf('newBooking_chooseLocation.html') !== -1) {
        window.location = "index.html";
    }
    else if (currentPage.indexOf('newBooking_chooseOffice.html') !== -1) {
        window.location = "index.html";
    }
    else if (currentPage.indexOf('newBooking_Details.html') !== -1) {
        window.location = "newBooking_chooseOffice.html";
    }
}


//Theoretically I should be able to use these to catch native 'back button' events, but have not got them to work yet

//$(window).on("navigate", function (event, data) {
//    if (data.state.direction == "back") {
//        _Back();
//    }
//});

//$(document).bind('keydown', function (event) {
//    if (event.keyCode == 27) {
//        _Back();
//    }
//});
