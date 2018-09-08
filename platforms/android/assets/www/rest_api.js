//Functions called from html pages
function _SignUp()
{	
    if (ValidateSystemUser())
	{	
		var email = document.getElementById('email').value;		
		var firstName = document.getElementById('firstName').value;
		var lastName = document.getElementById('lastName').value;
		var contactNumber = document.getElementById('contactNumber').value;
		var password = document.getElementById('password').value;

		Show_LoadingCircle();
		
		var xmlhttp = "";
		xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200)
			{					
				message = JSON.parse(this.responseText);
				Hide_LoadingCircle();
				if (message.success == 1) 
				{					
				    alert('SUCCESS!\n' + message.message);

				    localStorage.setItem("isLoggedOn", "true");

				    localStorage.setItem("currentUserEmail", message.email);
				    localStorage.setItem("currentUserFirstName", message.firstName);
				    localStorage.setItem("currentUserLastName", message.lastName);
				    localStorage.setItem("currentUserContactNumber", message.contactNumber);
				    localStorage.setItem("currentUserPassword", message.password);
				} 
				else 
				{
					alert('ERROR: ' + message.message);
				}
			}
		};
		
		xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SignUpNewUser", true);
		xmlhttp.withCredentials = true;
		xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("email=" + email+"&firstName=" + firstName+"&lastName="+lastName+"&contactNumber=" + contactNumber+"&password=" + password);
	}
}       

function _GoToLogin()
{
    var isLoggedOn = localStorage.getItem("isLoggedOn");
    if(isLoggedOn === "true")
    {
        _GoToNextPage();
    }
    else
    {
        window.location = "login.html";
    }
}

function _GoToNextPage()
{
    var nextPage = localStorage.getItem("nextPage");
    window.location = nextPage;
}

function _Login()
{
    if (ValidateLogin())
    {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1)
                {
                    alert('SUCCESS!\n' + message.firstName + " " + message.lastName + " is now logged in");

                    localStorage.setItem("isLoggedOn", "true");

                    localStorage.setItem("currentUserEmail", message.email);
                    localStorage.setItem("currentUserFirstName", message.firstName);
                    localStorage.setItem("currentUserLastName", message.lastName);
                    localStorage.setItem("currentUserContactNumber", message.contactNumber);
                    localStorage.setItem("currentUserPassword", message.password);

                    _GoToNextPage();
                }
                else
                {
                    localStorage.setItem("isLoggedOn", "false");

                    localStorage.setItem("currentUserEmail", "");
                    localStorage.setItem("currentUserFirstName","");
                    localStorage.setItem("currentUserLastName", "");
                    localStorage.setItem("currentUserContactNumber", "");
                    localStorage.setItem("currentUserPassword", "");

                    alert('ERROR: ' + message.message);
                }
            }
        };
        
        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/Login", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("email=" + email + "&password=" + password);
    }
}

function _Logout() {

    localStorage.setItem("isLoggedOn", "false");

    localStorage.setItem("currentUserEmail", "");
    localStorage.setItem("currentUserFirstName", "");
    localStorage.setItem("currentUserLastName", "");
    localStorage.setItem("currentUserContactNumber", "");
    localStorage.setItem("currentUserPassword", "");

    window.location = "index.html";
}

function _UpdateUserProfile()
{
    if (ValidateSystemUser())
    {
        var email = document.getElementById('email').value;
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var contactNumber = document.getElementById('contactNumber').value;

        var currentEmail = localStorage.getItem('currentUserEmail');
        var password = document.getElementById('password').value;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1)
                {
                    alert('SUCCESS!\n' + message.message);

                    localStorage.setItem("isLoggedOn", "true");

                    localStorage.setItem("currentUserEmail", message.email);
                    localStorage.setItem("currentUserFirstName", message.firstName);
                    localStorage.setItem("currentUserLastName", message.lastName);
                    localStorage.setItem("currentUserContactNumber", message.contactNumber);
                    localStorage.setItem("currentUserPassword", message.password);

                    window.location = "details_userProfile.html";
                }
                else
                {
                    alert('ERROR: ' + message.message);
                }
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/UpdateUserProfile", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("email=" + email + "&firstName=" + firstName + "&lastName=" + lastName + "&contactNumber=" + contactNumber + "&password=" + password + "&currentEmail=" + currentEmail);
    }
}

function _SaveNewPassword()
{
    if (ValidateNewPassword())
    {
        var email = localStorage.getItem("currentUserEmail");
        var password = localStorage.getItem("currentUserPassword");
        var newPassword = document.getElementById('newPassword').value;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1)
                {
                    alert('Password successfully updated!');
                    localStorage.setItem("currentUserPassword", message.password);                    
                }
                else
                {
                    alert('ERROR!\n Something went wrong');
                }
                window.location = "details_userProfile.html";
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/UpdateUserPassword", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("email=" + email +"&password=" + password + "&newPassword=" + newPassword);
    }
}

function _SaveListing()
{
    var email = localStorage.getItem("currentUserEmail");
    var listingName = document.getElementById('companyName').value;

    var getData = localStorage.getItem("getListingData");
    var listingId = localStorage.getItem("selectedListingId") || -1;
    if (getData == "false")
    {
        var listingId = -1;
    }

    //add image as well :-)

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                alert('Listing Saved Successfully');
            }
            else
            {
                alert('ERROR!\n Something went wrong');
            }
            window.location = "list_of_listings.html";
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SaveListing", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email=" + email + "&listingName=" + listingName + "&listingId=" + listingId);
}

function _SaveListingLocation()
{
    if(ValidateLocation())
    {
        var listingId = localStorage.getItem("selectedListingId") || -1;
        var getData = localStorage.getItem("getListingLocationData") || "false";
        var listingLocationId = localStorage.getItem("selectedListingLocationId") || -1;
        if (getData == "false") {
            var listingLocationId = -1;
        }
        var lat = document.getElementById('lat').value
        var long = document.getElementById('long').value
        var title = document.getElementById('title').value;
        var email = document.getElementById('email').value;
        var address = document.getElementById('address').value;
        var contactNumber = document.getElementById('contactNumber').value;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();

                if (message.success == 1)
                {
                    alert('Listing Location Saved Successfully');
                }
                else
                {
                    alert('ERROR!\n Something went wrong');
                }
                window.location = "list_of_locations.html";
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SaveListingLocation", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("listingLocationId=" + listingLocationId + "&listingId=" + listingId + "&title=" + title + "&lat=" + lat + "&long=" + long + "&address=" + address + "&contactNumber=" + contactNumber + "&email=" + email);
    }
}

function _SaveOfficeSpace()
{
    if (ValidateOfficeSpace())
    {
        var listingLocationId = localStorage.getItem("selectedListingLocationId");
        var getData = localStorage.getItem("getOfficeSpaceData");
        var officeSpaceId = localStorage.getItem("selectedOfficeSpaceId") || -1;
        if (getData == "false") {
            var officeSpaceId = -1;
        }

        var officeTitle = document.getElementById('officeTitle').value;
        var flatRate = document.getElementById('flatRate').value;
        var roomSize = document.getElementById('officeSize').value;
        var maxPeople = document.getElementById('maxPeople').value;
        var minPeople = document.getElementById('minPeople').value;
        var description = document.getElementById('description').value;
        var type = document.getElementById('officeType').selectedIndex;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1)
                {
                    alert('Office Space Saved Successfully');
                }
                else
                {
                    alert('ERROR!\n Something went wrong');
                }
                window.location = "list_of_officeSpaces.html";
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SaveOfficeSpace", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("officeSpaceId=" + officeSpaceId + "&listingLocationId=" + listingLocationId + "&title=" + officeTitle + "&roomSize=" + roomSize + "&max=" + maxPeople + "&min=" + minPeople + "&flatRate=" + flatRate + "&type=" + type + "&description=" + description);
    }
}

function _SaveItem()
{
    if(ValidateItem())
    {
        var listingLocationId = localStorage.getItem("selectedListingLocationId");
        var getData = localStorage.getItem("getItemData");
        var itemId = localStorage.getItem("selectedItemId") || -1;
        if (getData == "false") {
            var itemId = -1;
        }

        alert("Selected Item: " + itemId + "\nLocation: "+listingLocationId);

        var title = document.getElementById('itemTitle').value;
        var flatRate = document.getElementById('flatRate').value;
        var description = document.getElementById('description').value;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function ()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1)
                {
                    alert('Item Saved Successfully');
                }
                else
                {
                    alert('ERROR!\n Something went wrong');
                }
                window.location = "list_of_genericOfficeItems.html";
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SaveItem", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("itemId=" + itemId + "&linkedId=" + listingLocationId + "&title=" + title + "&flatRate=" + flatRate + "&description=" + description);
    }
}

function _SaveSpecificItem()
{
    if (ValidateSpecificItem())
    {
        var officeSpaceId = localStorage.getItem("selectedOfficeSpaceId");
        var getData = localStorage.getItem("getSpecificItemData");
        var itemId = localStorage.getItem("selectedSpecificItemId") || -1;
        if (getData == "false") {
            var itemId = -1;
        }

        alert("Office Space: " + officeSpaceId + "\nItem: " + itemId);

        var title = document.getElementById('itemTitle').value;
        var description = document.getElementById('description').value;

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1) {
                    alert('Item Saved Successfully');
                }
                else {
                    alert('ERROR!\n Something went wrong');
                }
                window.location = "list_of_specificOfficeItems.html";
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SaveSpecificItem", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("itemId=" + itemId + "&linkedId=" + officeSpaceId + "&title=" + title + "&description=" + description);
    }
}

function _SaveOfficeHours()
{
    if(ValidateOfficeHours())
    {
        var mondayOpen = 0;
        if($("#chkMonday").is(":checked")) {
            mondayOpen = 1;
        }

        var tuesdayOpen = 0;
        if ($("#chkTuesday").is(":checked")) {
            tuesdayOpen = 1;
        }

        var wednesdayOpen = 0;
        if ($("#chkWednesday").is(":checked")) {
            wednesdayOpen = 1;
        }

        var thursdayOpen = 0;
        if ($("#chkThursday").is(":checked")) {
            thursdayOpen = 1;
        }

        var fridayOpen = 0;
        if ($("#chkFriday").is(":checked")) {
            fridayOpen = 1;
        }

        var saturdayOpen = 0;
        if ($("#chkSaturday").is(":checked")) {
            saturdayOpen = 1;
        }

        var sundayOpen = 0;
        if ($("#chkSunday").is(":checked")) {
            sundayOpen = 1;
        }

        var mondayOpenTime = document.getElementById("monday_OpenTime").value || "08:00";
        var mondayCloseTime = document.getElementById("monday_CloseTime").value || "16:00";
        var tuesdayOpenTime = document.getElementById("tuesday_OpenTime").value || "08:00";
        var tuesdayCloseTime = document.getElementById("tuesday_CloseTime").value || "16:00";
        var wednesdayOpenTime = document.getElementById("wednesday_OpenTime").value || "08:00";
        var wednesdayCloseTime = document.getElementById("wednesday_CloseTime").value || "16:00";
        var thursdayOpenTime = document.getElementById("thursday_OpenTime").value || "08:00";
        var thursdayCloseTime = document.getElementById("thursday_CloseTime").value || "16:00";
        var fridayOpenTime = document.getElementById("friday_OpenTime").value || "08:00";
        var fridayCloseTime = document.getElementById("friday_CloseTime").value || "16:00";
        var saturdayOpenTime = document.getElementById("saturday_OpenTime").value || "08:00";
        var saturdayCloseTime = document.getElementById("saturday_CloseTime").value || "13:00";
        var sundayOpenTime = document.getElementById("sunday_OpenTime").value || "08:00";
        var sundayCloseTime = document.getElementById("sunday_CloseTime").value || "13:00";

        var listingLocationId = localStorage.getItem("selectedListingLocationId");

        Show_LoadingCircle();

        var xmlhttp = "";
        xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                message = JSON.parse(this.responseText);
                Hide_LoadingCircle();
                if (message.success == 1) {
                    alert('Office Hours Saved Successfully');
                }
                else {
                    alert('ERROR!\n Something went wrong');
                }
            }
        };

        xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/SaveOfficeHours", true);
        xmlhttp.withCredentials = true;
        xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("listingLocationId=" + listingLocationId + "&mondayOpen=" + mondayOpen + "&mondayOpenTime=" + mondayOpenTime + "&mondayCloseTime=" + mondayCloseTime + "&tuesdayOpen=" + tuesdayOpen + "&tuesdayOpenTime=" + tuesdayOpenTime + "&tuesdayCloseTime=" + tuesdayCloseTime + "&wednesdayOpen=" + wednesdayOpen + "&wednesdayOpenTime=" + wednesdayOpenTime + "&wednesdayCloseTime=" + wednesdayCloseTime + "&thursdayOpen=" + thursdayOpen + "&thursdayOpenTime=" + thursdayOpenTime + "&thursdayCloseTime=" + thursdayCloseTime + "&fridayOpen=" + fridayOpen + "&fridayOpenTime=" + fridayOpenTime + "&fridayCloseTime=" + fridayCloseTime + "&saturdayOpen=" + saturdayOpen + "&saturdayOpenTime=" + saturdayOpenTime + "&saturdayCloseTime=" + saturdayCloseTime + "&sundayOpen=" + sundayOpen + "&sundayOpenTime=" + sundayOpenTime + "&sundayCloseTime=" + sundayCloseTime);
    }
}

function _GetUserListings()
{
    var email = localStorage.getItem("currentUserEmail");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1) {

                //var list = document.getElementById('listings');
                for (var listingElement in message.listings) {
                    $("#listings").append('<li><a onclick="viewListingLocations(this)" data-id=' + message.listings[listingElement].ListingId + '><img src="img/icon.png"/><h1>' + message.listings[listingElement].Title + '</h1><p style="color: orangered">' + message.listings[listingElement].Info + '</p></a></li>');
                }
                $("#listings").listview('refresh');
            }
            else {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetListingsBySystemUserId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email=" + email);
}

function _GetListingLocations()
{
    var listingId = localStorage.getItem("selectedListingId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                for (var location in message.listingLocations)
                {
                    $("#locations").append('<li><a onclick="viewLocationOfficeSpaces(this)" data-id=' + message.listingLocations[location].ListingLocationId + '><img src="img/icon.png"/><h1>' + message.listingLocations[location].Title + '</h1><p style="color: darkgreen">' + message.listingLocations[location].StreetAddress + '</p><p style="color: orangered">' + message.listingLocations[location].Info + '</p></a></li>');
                }
                $("#locations").listview('refresh');
            }
            else
            {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetListingLocationsByListingId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingId=" + listingId);
}

function _GetLocationOfficeSpaces()
{
    var listingLocationId = localStorage.getItem("selectedListingLocationId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                for (var office in message.officeSpaces)
                {
                    $("#offices").append('<li><a onclick="viewOfficeDetails(this)" data-id=' + message.officeSpaces[office].OfficeSpaceId + '><img src="img/icon.png"/><h1>' + message.officeSpaces[office].Title + '</h1><p style="color: orangered">' + message.officeSpaces[office].Description + '</p></a></li>');
                }
                $("#offices").listview('refresh');
            }
            else
            {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetOfficeSpacesByListingLocationId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingLocationId=" + listingLocationId);
}

function _GetLocationOfficeSpacesForBooking() {
    var listingLocationId = localStorage.getItem("selectedListingLocationId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                for (var office in message.officeSpaces)
                {
                    $("#offices").append('<li><a onclick="reserveOffice(this)" data-id=' + message.officeSpaces[office].OfficeSpaceId + '><img src="img/icon.png"/><h1>' + message.officeSpaces[office].Title + '</h1><div style="display:block"><img src="img/coin.png" height="14" width="14" style="float:left" /><p style="padding-left:10px">R ' + message.officeSpaces[office].FlatRatePerHour + ' p/h</p></div><div style="display:block"><img src="img/people.png" height="14" width="14"  style="float:left" /><p style="padding-left:10px">sits ' + message.officeSpaces[office].MaxPeople + ' people</p></div><div style="display:block"><img src="img/officeType.png" height="14" width="14" style="float:left" /><p style="padding-left:10px">' + GetOfficeType(message.officeSpaces[office].TypeEnum) + '</p></div><div style="display:block"><img src="img/ruler.png" height="14" width="14" style="float:left" /><p style="padding-left:10px">' + message.officeSpaces[office].RoomSize + ' m<sup>2</sup></p></div></a></li>');
                }
                $("#offices").listview('refresh');
            }
            else {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetOfficeSpacesByListingLocationId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingLocationId=" + listingLocationId);
}

function _GetLocationOfficeItems()
{
    var listingLocationId = localStorage.getItem("selectedListingLocationId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                for (var item in message.items)
                {
                    $("#items").append('<li><a onclick="viewItemDetails(this)" data-id=' + message.items[item].ItemId + '><img src="img/icon.png"/><h1>' + message.items[item].Title + '</h1><p style="color: darkgreen">R ' + message.items[item].FlatRatePerHour + ' p/h</p><p style="color: orangered">' + message.items[item].Description + '</p></a></li>');
                }
                $("#items").listview('refresh');
            }
            else
            {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetItemsByListingLocationId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingLocationId=" + listingLocationId);
}

function _GetOfficeSpaceItems() {
    var officeSpaceId = localStorage.getItem("selectedOfficeSpaceId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1) {
                for (var item in message.items) {
                    $("#items").append('<li><a onclick="viewItemDetails(this)" data-id=' + message.items[item].ItemId + '><img src="img/icon.png"/><h1>' + message.items[item].Title + '</h1><p style="color: orangered">' + message.items[item].Description + '</p></a></li>');
                }
                $("#items").listview('refresh');
            }
            else {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetItemsByOfficeSpaceId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("officeSpaceId=" + officeSpaceId);
}

function _GetOfficeHoursByListingLocationId()
{
    var listingLocationId = localStorage.getItem("selectedListingLocationId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                var mondayOpenTime = document.getElementById("monday_OpenTime");
                mondayOpenTime.value = message.hours[0].OpeningHour;

                var mondayCloseTime = document.getElementById("monday_CloseTime");
                mondayCloseTime.value = message.hours[0].ClosingHour;

                var tuesdayOpenTime = document.getElementById("tuesday_OpenTime");
                tuesdayOpenTime.value = message.hours[1].OpeningHour;

                var tuesdayCloseTime = document.getElementById("tuesday_CloseTime");
                tuesdayCloseTime.value = message.hours[1].ClosingHour;

                var wednesdayOpenTime = document.getElementById("wednesday_OpenTime");
                wednesdayOpenTime.value = message.hours[2].OpeningHour;

                var wednesdayCloseTime = document.getElementById("wednesday_CloseTime");
                wednesdayCloseTime.value = message.hours[2].ClosingHour;

                var thursdayOpenTime = document.getElementById("thursday_OpenTime");
                thursdayOpenTime.value = message.hours[3].OpeningHour;

                var thursdayCloseTime = document.getElementById("thursday_CloseTime");
                thursdayCloseTime.value = message.hours[3].ClosingHour;

                var fridayOpenTime = document.getElementById("friday_OpenTime");
                fridayOpenTime.value = message.hours[4].OpeningHour;

                var fridayCloseTime = document.getElementById("friday_CloseTime");
                fridayCloseTime.value = message.hours[4].ClosingHour;

                var saturdayOpenTime = document.getElementById("saturday_OpenTime");
                saturdayOpenTime.value = message.hours[5].OpeningHour;

                var saturdayCloseTime = document.getElementById("saturday_CloseTime");
                saturdayCloseTime.value = message.hours[5].ClosingHour;

                var sundayOpenTime = document.getElementById("sunday_OpenTime");
                sundayOpenTime.value = message.hours[6].OpeningHour;

                var sundayCloseTime = document.getElementById("sunday_CloseTime");
                sundayCloseTime.value = message.hours[6].ClosingHour;

                if (message.hours[0].IsOpen == 1){
                    $('#chkMonday').prop('checked', true).checkboxradio('refresh');
                }
                else{
                    $('#chkMonday').prop('checked', false).checkboxradio('refresh');
                }

                if (message.hours[1].IsOpen == 1) {
                    $('#chkTuesday').prop('checked', true).checkboxradio('refresh');
                }
                else {
                    $('#chkTuesday').prop('checked', false).checkboxradio('refresh');
                }

                if (message.hours[2].IsOpen == 1) {
                    $('#chkWednesday').prop('checked', true).checkboxradio('refresh');
                }
                else {
                    $('#chkWednesday').prop('checked', false).checkboxradio('refresh');
                }

                if (message.hours[3].IsOpen == 1) {
                    $('#chkThursday').prop('checked', true).checkboxradio('refresh');
                }
                else {
                    $('#chkThursday').prop('checked', false).checkboxradio('refresh');
                }

                if (message.hours[4].IsOpen == 1) {
                    $('#chkFriday').prop('checked', true).checkboxradio('refresh');
                }
                else {
                    $('#chkFriday').prop('checked', false).checkboxradio('refresh');
                }

                if (message.hours[5].IsOpen == 1) {                    
                    $('#chkSaturday').prop('checked', true).checkboxradio('refresh');
                }
                else {
                    $('#chkSaturday').prop('checked', false).checkboxradio('refresh');
                }

                if (message.hours[6].IsOpen == 1) {
                    $('#chkSunday').prop('checked', true).checkboxradio('refresh');
                }
                else {
                    $('#chkSunday').prop('checked', false).checkboxradio('refresh');
                }
            }
            else
            {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetOfficeHoursByListingLocationId", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingLocationId=" + listingLocationId);
}

function _GetListing()
{
    var listingId = localStorage.getItem("selectedListingId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                var companyName = document.getElementById('companyName');
                companyName.value = message.Title;

                //remember image
            }
            else {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetListingById", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingId=" + listingId);
}

function _GetListingLocation()
{
    var listingLocationId = localStorage.getItem("selectedListingLocationId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                var lat = document.getElementById('lat');
                lat.value = message.Latitude;
                var long = document.getElementById('long');
                long.value = message.Longitude;
                var title = document.getElementById('title');
                title.value = message.Title;
                var email = document.getElementById('email');
                email.value = message.Email;
                var address = document.getElementById('address');
                address.value = message.StreetAddress;
                var contactNumber = document.getElementById('contactNumber');
                contactNumber.value = message.ContactNumber;


                var map = new GoogleMap();
                map.initialize(message.Latitude, message.Longitude);
            }
            else
            {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetListingLocationById", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("listingLocationId=" + listingLocationId);
}

function _GetOfficeSpace()
{
    var officeSpaceId = localStorage.getItem("selectedOfficeSpaceId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1)
            {
                var officeTitle = document.getElementById('officeTitle');
                officeTitle.value = message.Title;
                var flatRate = document.getElementById('flatRate');
                flatRate.value = message.FlatRatePerHour;
                var roomSize = document.getElementById('officeSize');
                roomSize.value = message.RoomSize;
                var maxPeople = document.getElementById('maxPeople');
                maxPeople.value = message.MaxPeople;
                var minPeople = document.getElementById('minPeople');
                minPeople.value = message.MinPeople;
                var description = document.getElementById('description');
                description.value = message.Description;
                var type = document.getElementById('officeType');
                type.selectedIndex = message.TypeEnum;
                $("#officeType").selectmenu('refresh', true);
            }
            else
            {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetOfficeSpaceById", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("officeSpaceId=" + officeSpaceId);
}

function _GetItem() {
    var itemId = localStorage.getItem("selectedItemId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1) {
                var title = document.getElementById('itemTitle');
                title.value = message.Title;
                var flatRate = document.getElementById('flatRate');
                flatRate.value = message.FlatRatePerHour;
                var description = document.getElementById('description');
                description.value = message.Description;
            }
            else {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetItemById", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("itemId=" + itemId);
}

function _GetSpecificItem() {
    var itemId = localStorage.getItem("selectedSpecificItemId");

    Show_LoadingCircle();

    var xmlhttp = "";
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            message = JSON.parse(this.responseText);
            Hide_LoadingCircle();
            if (message.success == 1) {
                var title = document.getElementById('itemTitle');
                title.value = message.Title;
                var description = document.getElementById('description');
                description.value = message.Description;
            }
            else {
                alert('ERROR!\n\tSomething went wrong');
            }
        }
    };

    xmlhttp.open("POST", "http://www.superfluity.co.za/webservices/mobile_api/GetItemById", true);
    xmlhttp.withCredentials = true;
    xmlhttp.setRequestHeader("Authorization", 'Basic ' + btoa('user:11'));
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("itemId=" + itemId);
}

//Validate UI Screens

function ValidateListing()
{
    var listingName = document.getElementById('companyName').value;
    if(!ValidateString('Listing Name', listingName, 50))
    {
        return false;
    }

    var image = document.getElementById('companyLogo');
    if (image == null)
    {
        return false;
    }
    return true;
}

function ValidateSystemUser()
{
    var firstName = document.getElementById('firstName').value;
    if (!ValidateString('First Name', firstName, 50)) {
        return false;
    }

    var lastName = document.getElementById('lastName').value;
    if (!ValidateString('Last Name', lastName, 50)) {
        return false;
    }

    var email = document.getElementById('email').value;
    if (!ValidateString('Email', email, 50)) {
        return false;
    }

    var password = document.getElementById('password').value;
    if (!ValidatePassword('Password', password)) {
        return false;
    }

    var contactNumber = document.getElementById('contactNumber').value;
    if (!ValidateContactNumber(contactNumber)) {
        return false;
    }

    return true;
}

function ValidateLogin() {
    //We are just checking that the values are not empty here

    var email = document.getElementById('email').value;
    if (email.length == 0) {
        alert('Please fill in a value for Email');
        return false;
    }

    var password = document.getElementById('password').value;
    if (password.length == 0) {
        alert('Please fill in a value for Password');
        return false;
    }

    return true;
}

function ValidateString(type, string, charactersAllowed)
{
    if (string.length == 0) {
        alert('Please fill in a value for '+type);
        return false;
    }

    if (!string.match(/\w+$/))
    {
        alert('Illegal character in '+ type);
        return false;
    }

    if (string.length > charactersAllowed) {
        alert(type + ' value must be less than ' + charactersAllowed + ' characters');
        return false;
    }

    return true;
}			

function ValidateNumber(number, type) {
    if (number.length == 0) {
        alert('Please fill in a value for ' + type);
        return false;
    }

    if (!number.match(/^[0-9]+$/)) {
        alert('Illegal character in ' + type);
        return false;
    }
    return true;
}

function ValidateNewPassword()
{
    var currentPassword = document.getElementById('currentPassword').value;
    var currentPasswordInSystem = localStorage.getItem("currentUserPassword");
    if (!ValidatePassword('Current Password', currentPassword))
    {
        return false;
    }

    if (currentPassword == currentPasswordInSystem)
    {
        var newPassword = document.getElementById('newPassword').value;

        if (!ValidatePassword('New Password', newPassword))
        {
            return false;
        }

        if (currentPassword == newPassword)
        {
            alert('You cannot use the Current Password as the New Password');
            return false;
        }

        var confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (!ValidatePassword('Confirm New Password', confirmNewPassword))
        {
            return false;
        }

        if(newPassword == confirmNewPassword)
        {
            return true;
        }
        else
        {
            alert('New Password does not match');
            return false;
        }
    }
    else
    {
        alert('Incorrect current password');
        return false;
    }   
}

function ValidatePassword(type, string)
{
    if (string.length == 0) {
        alert('Please fill in a value for ' + type);
        return false;
    }
    return true;
}

function ValidateContactNumber(number)
        {
            if (number.length == 0) {
                alert('Please fill in a value for Contact Number');
                return false;
            }

            if (!number.match(/^[0-9]+$/)) {
                alert('Illegal character in Contact Number');
                return false;
            }
            return true;
}

function ValidateLocation()
{
    var title = document.getElementById('title').value;
    if (!ValidateString('Location Title', title, 50)) {
        return false;
    }

    //There should be a method here to validate Lat & Long

    var email = document.getElementById('email').value;
    if (!ValidateString('Email', email, 50)) {
        return false;
    }

    var address = document.getElementById('address').value;
    if (!ValidateString('Street Address', address, 250)) {
        return false;
    }

    var contactNumber = document.getElementById('contactNumber').value;
    if (!ValidateContactNumber(contactNumber)) {
        return false;
    }

    return true;
}

function ValidateOfficeSpace()
{
    var officeTitle = document.getElementById('officeTitle').value;
    if (!ValidateString('Office Title', officeTitle, 50)) {
        return false;
    }

    var flatRate = document.getElementById('flatRate').value;
    if (!ValidateNumber(flatRate, 'Flat Rate')) {
        return false;
    }

    var roomSize = document.getElementById('officeSize').value;
    if (!ValidateNumber(roomSize, 'Room Size')) {
        return false;
    }

    var maxPeople = document.getElementById('maxPeople').value;
    if (!ValidateNumber(maxPeople, 'Maximum People')) {
        return false;
    }

    var minPeople = document.getElementById('minPeople').value;
    if (!ValidateNumber(minPeople, 'Minimum People')) {
        return false;
    }

    var description = document.getElementById('description').value;
    if (!ValidateString('Description', description, 500)) {
        return false;
    }

    return true;
}

function ValidateItem() {
    var title = document.getElementById('itemTitle').value;
    if (!ValidateString('Item Title', title, 50)) {
        return false;
    }

    var description = document.getElementById('description').value;
    if (!ValidateString('Description', description, 500)) {
        return false;
    }

    var flatRate = document.getElementById('flatRate').value;
    if (!ValidateNumber(flatRate)) {
        return false;
    }

    return true;
}

function ValidateSpecificItem() {
    var title = document.getElementById('itemTitle').value;
    if (!ValidateString('Item Title', title, 50)) {
        return false;
    }

    var description = document.getElementById('description').value;
    if (!ValidateString('Description', description, 500)) {
        return false;
    }

    return true;
}

function ValidateOfficeHours()
{
    var mondayOpen = $("#chkMonday");
    if (mondayOpen.is(":checked"))
    {
        var openTime = document.getElementById("monday_OpenTime").value;
        var closeTime = document.getElementById("monday_CloseTime").value;
        if(!ValidateHours("Monday", openTime, closeTime))
        {
            return false
        }
    }

    var tuesdayOpen = $("#chkTuesday");
    if (tuesdayOpen.is(":checked")) {
        var openTime = document.getElementById("tuesday_OpenTime").value;
        var closeTime = document.getElementById("tuesday_CloseTime").value;
        if (!ValidateHours("Tuesday", openTime, closeTime)) {
            return false
        }
    }

    var wednesdayOpen = $("#chkWednesday");
    if (wednesdayOpen.is(":checked")) {
        var openTime = document.getElementById("wednesday_OpenTime").value;
        var closeTime = document.getElementById("wednesday_CloseTime").value;
        if (!ValidateHours("Wednesday", openTime, closeTime)) {
            return false
        }
    }

    var thursdayOpen = $("#chkThursday");
    if (thursdayOpen.is(":checked")) {
        var openTime = document.getElementById("thursday_OpenTime").value;
        var closeTime = document.getElementById("thursday_CloseTime").value;
        if (!ValidateHours("Thursday", openTime, closeTime)) {
            return false
        }
    }

    var fridayOpen = $("#chkFriday");
    if (fridayOpen.is(":checked")) {
        var openTime = document.getElementById("friday_OpenTime").value;
        var closeTime = document.getElementById("friday_CloseTime").value;
        if (!ValidateHours("Friday", openTime, closeTime)) {
            return false
        }
    }

    var saturdayOpen = $("#chkSaturday");
    if (saturdayOpen.is(":checked")) {
        var openTime = document.getElementById("saturday_OpenTime").value;
        var closeTime = document.getElementById("saturday_CloseTime").value;
        if (!ValidateHours("Saturday", openTime, closeTime)) {
            return false
        }
    }

    var sundayOpen = $("#chkSunday");
    if (sundayOpen.is(":checked")) {
        var openTime = document.getElementById("sunday_OpenTime").value;
        var closeTime = document.getElementById("sunday_CloseTime").value;
        if (!ValidateHours("Sunday", openTime, closeTime)) {
            return false
        }
    }

    return true;
}

function ValidateHours(day, openTime, closeTime)
{

    if (openTime.length == 0) {
        alert('Please fill in a value for ' + day + ' Open Time');
        return false;
    }

    if (closeTime.length == 0) {
        alert('Please fill in a value for ' + day +  'Close Time');
        return false;
    }

    if (openTime > closeTime) {
        alert(day + ' Opening Time cannot be later than Closing Time');
        return false;
    }

    return true;
}

//Extra Stuffs
function Show_LoadingCircle()
{
    $.mobile.loading("show",
    {
        textVisible: true,
        textonly: false,
        text: "loading..."
    });
}

function Hide_LoadingCircle()
{
    $.mobile.loading("hide");
}

function GetOfficeType(typeEnum)
{
    var officeType = "Cubicle";

    if (typeEnum == 0)
    {
        officeType = "Open Office";
    }
    else if (typeEnum == 1)
    {
        officeType = "Cubicle";
    }
    else if (typeEnum == 2) {
        officeType = "Private Office";
    }
    else if (typeEnum == 3) {
        officeType = "Shared Office";
    }
    else if (typeEnum == 4) {
        officeType = "Tea Room";
    }
    else if (typeEnum == 5) {
        officeType = "Study Booth";
    }
    else if (typeEnum == 6) {
        officeType = "Work Lounge";
    }
    else if (typeEnum == 7) {
        officeType = "Small Meeting Room";
    }
    else if (typeEnum == 8) {
        officeType = "Large Meeting Room";
    }
    else if (typeEnum == 9) {
        officeType = "Auditorium";
    }
    else if (typeEnum == 10) {
        officeType = "Brainstorm Room";
    }

    return officeType;
}