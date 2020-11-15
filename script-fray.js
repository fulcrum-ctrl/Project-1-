
var charities = findWithinRadius("5");

var charityList = document.querySelector("#give-money ul");


var anchorsWithModals = document.querySelectorAll(".opensModal");

function closeModal() {
    this.parentElement.parentElement.parentElement.style.display="none";
}

function openModal(index){

    console.log(index);

    var modal = document.createElement("div");
    modal.classList.add("w3-modal");

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
    h1.innerText = this.innerText;
    modalHeader.appendChild(modalX);
    modalHeader.appendChild(h1);

    var p = document.createElement("p");
    p.innerText =  "nothing for now";
    modal.style.display = "block";
    console.log(charities, "here");
    var link = document.createElement("a");
    console.log(link.innerText);
    console
    link.innerText = this.getAttribute("data-charity");
    link.href = this.getAttribute("data-url");
    link.target ="_blank";

    modalContent.append(modalHeader, p, link)
    modal.appendChild(modalContent);

    this.parentElement.appendChild(modal);
}

var sections = document.querySelectorAll("section");

function createListItem(lst) {
    charityList.innerText = "";
    for (var i = 0; i < lst.length; i++) {
        console.log(i);
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
        link.setAttribute("data-charity", charities[i][0]);
        link.setAttribute("data-url", charities[i][1]);
        charityList.appendChild(li);
        link.addEventListener("click", function() {
            openModal();
        });
        
    }
}

var giveMoneyBtn = document.querySelector(".give-money-btn");
giveMoneyBtn.addEventListener("click", function() {
    createListItem(charities);
    console.log(charities);
});
