var charitySection = document.querySelector("#give-money");

var charities = findWithinRadius("5");

var anchorsWithModals = document.querySelectorAll(".opensModal");

function closeModal() {
    this.parentElement.parentElement.parentElement.style.display="none";
}

function openModal(){

    var modal = createModal(this.innerText, "nothing for now", this.getAttribute("data-name"), this.getAttribute("data-url"))

    this.parentElement.appendChild(modal);
    console.log(this.parentElement);
}

var sections = document.querySelectorAll("section");



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

document.querySelector("#distanceBtn").addEventListener("click", function() {
    var distance = maxDistanceToCharityInput.value;
    if (distance < 1 || distance > 16) {
        modal = createModal("Not within Distance", "Sorry, you need to choose a distance between 1 and 16 km.", "Please try again.","");
        volunteerSection.appendChild(modal);
    } else {
        console.log(charities);
        charities = findWithinRadius(distance);
        createListItem(charities, charitySection);
    }
})

