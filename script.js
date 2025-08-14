//inputElement 

let searchInputEl = document.getElementById("searchInput");

//displayContainer 
let itemContainerEl = document.getElementById("searchResults");

//spinnerElement 
let spinnerEl = document.getElementById("spinner");
//display Funtion 

function displayItem(search_results) {
    //console.log(search_results)

    for (let obj of search_results) {
        //SmallContainer
        let smallItem = document.createElement("div");
        smallItem.style.textAlign = "center";
        smallItem.classList.add("m-3");


        // ImageElement
        let imageEl = document.createElement("img");
        imageEl.src = obj.imageLink;
        imageEl.classList.add("m-3");
        smallItem.appendChild(imageEl);

        // paragraphElement 
        let authorPara = document.createElement("p");
        authorPara.textContent = obj.author;
        authorPara.style.color = "#323f4b";
        authorPara.style.fontFamily = "Roboto";

        smallItem.appendChild(authorPara);


        //Small container Add ItemContainer 
        itemContainerEl.appendChild(smallItem);

    }




}



// search Funtion 

function dataDefine(event) {
    spinnerEl.classList.remove("d-none");
    itemContainerEl.classList.add("d-none");
    let valueOfSearch = event.target.value;
    let url = "https://apis.ccbp.in/book-store?title=" + valueOfSearch;


    let option = {
        method: "GET"
    }

    fetch(url, option)

        .then(function(response) {
            return response.json();
        })

        .then(function(data) {
            let search_results = data.search_results;
            let lenth = search_results.length;
            let headingEl = document.createElement("h1");
            headingEl.classList.add("head-books", "col-12", "mt-3", "mb-3");
            itemContainerEl.appendChild(headingEl);
            spinnerEl.classList.add("d-none");
            itemContainerEl.classList.remove("d-none");

            if (lenth === 0) {
                headingEl.textContent = "No results found";
            } else {

                if (event.key === "Enter") {
                    headingEl.textContent = "Popular Books";
                    displayItem(search_results);
                    valueOfSearch = "";
                }

            }


        })
}

searchInputEl.addEventListener("keydown", dataDefine)
