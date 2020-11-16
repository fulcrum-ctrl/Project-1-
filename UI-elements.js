function createModal(header, content, footer, optionalUrl) { // enter "" if not using optionalUrl
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
    h1.innerText = header;
    modalHeader.appendChild(modalX);
    modalHeader.appendChild(h1);

    var p = document.createElement("p");
    p.innerText =  content;
    modal.style.display = "block";
    console.log(charities, "here");
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