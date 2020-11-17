

var charitySection = document.querySelector("#give-money");

var charities = findWithinRadius("5");

var anchorsWithModals = document.querySelectorAll(".opensModal");

var giveMoney = document.querySelector("#give-money");

var volunteerSection = document.querySelector("#give-time");

var maxDistanceToCharity = document.querySelector("#distance");

var maxDistanceToCharityInput = document.querySelector("#distance input");

var sections = document.querySelectorAll("section");


function closeModal() {
    this.parentElement.parentElement.parentElement.style.display="none";
}

function openModal(){

    var modal = createModal(this.innerText, "nothing for now", this.getAttribute("data-name"), this.getAttribute("data-url"))

    this.parentElement.appendChild(modal);
    console.log(this.parentElement);
}

// this script creates the modal and the 

function createModal(header, content, footer, optionalUrl) { // enter "" if not using optionalUrl
    var modal = document.createElement("div");
    modal.classList.add("w3-modal", "w3-center");

    var modalContent = document.createElement("div");
    modal.appendChild(modalContent);
    modalContent.classList.add("w3-modal-content", "w3-display-container");

    var modalX = document.createElement("span");
    modalX.classList.add("w3-button", "w3-display-topright");
    modalX.innerHTML = "&times;"
    modalX.addEventListener("click", closeModal);

    var modalHeader = document.createElement("header");
    modalHeader.classList.add("modal-header", "w3-red");

    var h1 = document.createElement("h3");
    h1.innerText = header;
    modalHeader.appendChild(modalX);
    modalHeader.appendChild(h1);

    var p = document.createElement("p");
    p.innerHTML =  content;
    modal.style.display = "block";

    var link = document.createElement("a");
    console.log(footer);
    console
    link.innerText = footer;

    if (optionalUrl) {
        link.href = optionalUrl;
        link.target ="_blank";
    }

    modalContent.append(modalHeader, p, link)
    return modal;
}

function createListItem(lst, sectionID) {
    //console.log("createModal", lst)
    var ul = sectionID.querySelector("ul");
    
    ul.innerText = "";
    var i = 0
    while(lst[i] !== undefined) {
        var li = document.createElement("li");
        var link = document.createElement("a");
        var p = document.createElement("p");

        link.innerText = lst[i][0];
        p.innerText = "try to find description somehow";

        link.classList.add("w3-xlarge", "opensModal");
        p.classList.add("w3-large", "desc");
        
        link.addEventListener("click", openModal);
    
        li.appendChild(link);
        li.appendChild(p);
        link.setAttribute("data-name", lst[i][0]);
        link.setAttribute("data-url", lst[i][1]);
        console.log(link.outerHTML);
        ul.appendChild(li);
        link.addEventListener("click", openModal);
        console.log("createModal", ul.innerHTML);
        i++;
    }
    
}

// this is basically Omair's code, just modified so it uses geolocation and lat/lon
function findWithinRadius(KM) {

    var cors = "https://cors-anywhere.herokuapp.com/"
    var baseUrl = "http://data.orghunter.com/v1/charitysearch?"
    var user_key = "user_key=e2e157b99c8dc1f8dd1d4a2711144cfb"
    var distance = "distance=" + KM * 0.621371;
    var longitude = "";
    var latitude = "";
    var charities = [];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, noPosition, {timeout:10000});   
    } 
    console.log( "this " + this);
    function noPosition() {
        console.log(this);
        var modal = createModal("Location not Found", "Could not find location. Please enter your city name <br> <input type='text'>", "", "")
        volunteerSection.append(modal);
    }
    
    function getPosition(position) {
        var posn = [position.coords.latitude, position.coords.longitude];
        //console.log(posn);
        longitude = "longitude=" + posn[1];
        latitude = "latitude=" + posn[0];
    
        fetch(cors + baseUrl + user_key + "&" + distance + "&" + longitude + "&" + latitude)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {

                for (var i = 0; i <  jsonData.data.length; i++) {
                    var url = jsonData.data[i].url;
                    var charity = jsonData.data[i].charityName.toLowerCase();
                    charities.push([charity,url])
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        
    } console.log(charities); return charities;
}

// this is basically Omair's code, just modified so it uses geolocation and lat/lon
function getDesc(toSearch) {
    var baseUrl = "https://en.wikipedia.org/w/rest.php/v1/search/page?&";
    //var getDesc = "prop=extracts&exsentences=1&titles=" + toSearch;
    var desc = "limit=1&q=" + toSearch;
    var url = baseUrl + desc;
    var descript = "";
    console.log(url);

    

    function fetchData() {

        fetch(url)
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(jsonData) {
                //console.log(jsonData);
                //charityList.innerText = "";
                descript = jsonData;
            descript = (jsonData.pages[0].description);
            console.log(descript);
            })
            .catch(function(error) {
                console.log(error);
            })
    } 

    fetchData();
    return descript;
} 


console.log(getDesc("foundation+for+international"));

var giveMoneyBtn = document.querySelector(".give-money-btn");
giveMoneyBtn.addEventListener("click", function() {
    createListItem(charities, charitySection);
    console.log("char " + charities);
});

var giveTimeBtn = document.querySelector(".give-time-btn");
var volunteerSection = document.querySelector("#give-time");
giveTimeBtn.addEventListener("click", function() {
    var giveTimeList = [["something", ""]];
    createListItem(giveTimeList, volunteerSection);
    console.log(giveTimeList);
});

// document.querySelector("#distanceBtn").addEventListener("click", function() {
//     var distance = maxDistanceToCharityInput.value;
//     if (distance < 1 || distance > 16) {
//         modal = createModal("Not within Distance", "Sorry, you need to choose a distance between 1 and 16 km.", "Please try again.","");
//         volunteerSection.appendChild(modal);
//     } else {
//         console.log(charities);
//         charities = findWithinRadius(distance);
//         createListItem(charities, charitySection);
//     }
// })

