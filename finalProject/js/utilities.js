
import { cameras } from './cameras.js';
import { ls } from './ls.js';
var favorites = [];

// document.getElementById("findcamerabutton").onclick = this.filterResults();

export default class cameraUtilities {

    constructor() {
        // querySelector returns the first element that matches, in this case its the id 
        this.favoriteCameras = document.querySelector('#favorites');
        // this.parentElement = document.getElementById(elementId);
    }

    getFavoriteCameras() {
        favorites = ls.get();
        return favorites;
    }

    determineLevel() {
        const levelSelected = document.getElementById("level");
        const levelValue = levelSelected.options[levelSelected.selectedIndex].value;
        return levelValue;
    }

    determineType() {
        const typeSelected = document.getElementById("type");
        const typeValue = typeSelected.options[typeSelected.selectedIndex].value;
        return typeValue;
    }

    determineCategory() {
        const catSelected = document.getElementById("category");
        const catValue = catSelected.options[catSelected.selectedIndex].value;
        return catValue;
    }

    filterResults() {
        const level = this.determineLevel();
        const type = this.determineType();
        const category = this.determineCategory();
        const filteredCameras = cameras.filter(camera => camera.level == level && camera.type == type && camera.category == category);
        // console.log(filteredCameras);
        const results = this.renderCameras(filteredCameras);
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
        resultsDiv.innerHTML = results;
        // console.log(resultsDiv);
        // console.log(resultsDiv.querySelectorAll(".camerabox1"));
        // console.log(resultsDiv.getElementsByTagName("h3")[1].innerHTML);
        // console.log(resultsDiv.getElementsByTagName("h3")[0].innerHTML);
        let newArray = resultsDiv.querySelectorAll(".camerabox1");
        for (var i = 0; i < newArray.length; i++) {
            // console.log(newArray[i].getElementsByTagName("h3")[0].innerHTML);
            let cameraname = newArray[i].getElementsByTagName("h3")[0].innerHTML;
            newArray[i].addEventListener('click', (event) => this.renderOneCamera(cameraname));
        }

    }

    // This is just a function to get ideas on how to display the cameras and the info
    renderCameras(filteredCameras) {
        let item = "";
        filteredCameras.forEach(camera => {
            item += `
                <div class="camerabox1">
                    <h3>${camera.name}</h3>
                    <div><img src="${camera.imgSrc}" alt="${camera.imgAlt}" class="image"></div>
                        <div class = "detail">
                            <div>
                                <h5>Draw Weight</h5>
                                <p>${camera.drawWeight}</p>
                            </div>
                            <div>
                                <h5>Mass Weight</h5>
                                <p>${camera.massWeight}</p>
                            </div>
                            <div>
                                <h4>Click Here for More Information</h4>
                            </div>
                        </div>
                    </div>
                    `;
            // list.appendChild(item);
        });
        return item;
    }

    renderOneCamera(cameraname) {
        let specificCamera = cameras.filter(camera => camera.name == cameraname);
        // console.log(specificCamera[0]);
        let item = "";
        item += `
            <div class="camerabox2">
            <h3>${specificCamera[0].name}</h3>
            <div><img src="${specificCamera[0].imgSrc}" alt="${specificCamera[0].imgAlt}" class="image"></div>
                <div class = "detail">
                    <div>
                        <h5>Draw Weight</h5>
                        <p>${specificCamera[0].drawWeight}</p>
                    </div>
                    <div>
                        <h5>Draw Length</h5>
                        <p>${specificCamera[0].drawLength}</p>
                    </div>
                    <div>
                        <h5>Mass Weight</h5>
                        <p>${specificCamera[0].massWeight}</p>
                    </div>
                    <div>
                        <h5>Speed</h5>
                        <p>${specificCamera[0].speed}</p>
                    </div> 
                    <div>
                        <h5>Axle to Axle</h5>
                        <p>${specificCamera[0].axle2axle}</p>
                    </div> 
                    <div>
                        <h5>Colors Available</h5>
                        <p>${specificCamera[0].color}</p>
                    </div> 
                    <div>
                        <h5>More information and where to buy this item:</h5>
                        <a href="${specificCamera[0].url}" target="_blank" class="purchasebutton">${specificCamera[0].name}</a>
                    </div>
                    <div>
                        <h5>Save this item to my favorites list</h5>
                        <p>(Item gets saved below)</p>
                        <button onclick="window.myCameras.saveCamera('${specificCamera[0].name}')" class="save">Save to Favorites</button>
                    </div>
                </div>
            </div>
            `;
        // console.log(specificCamera[0]);
        let resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
        resultsDiv.innerHTML = item;
    }


    saveCamera(specificCamera) {
        // console.log(JSON.stringify(specificCamera));
        let favoriteCameras = this.getFavoriteCameras();
        if (favoriteCameras == null) {
            favoriteCameras = new Array();
        }
        // make it so they can't add an item twice
        let savedFavoriteCamera = specificCamera;
        let n = favoriteCameras.includes(savedFavoriteCamera);
        // console.log(n);
        if (n) {
            let errormsg = document.getElementById("error");
            errormsg.classList.remove("hidden");
            window.setTimeout(() => errormsg.classList.add("hidden"), 3000);
        }
        else {favoriteCameras.push(savedFavoriteCamera);
        ls.set(favoriteCameras);
        this.showingSavedCameras();}
    }

    showingSavedCameras() {
        let savedArrayofCameras = this.getFavoriteCameras();
        let favoritesDiv = document.getElementById("favorites");
        favoritesDiv.innerHTML = "";
        if (savedArrayofCameras == null || savedArrayofCameras == '') {
            favoritesDiv.innerHTML += `<p>No cameras have been saved to your favorites yet.</p>`;
        }
        savedArrayofCameras.forEach(favcamera => {
            let specificCamera = cameras.filter(camera => camera.name == camera);
            let item = "";
            item += `
                <div class="camerabox3">
                <h3>${specificCamera[0].name}</h3>
                <div><img src="${specificCamera[0].imgSrc}" alt="${specificCamera[0].imgAlt}" class="image"></div>
                    <div class = "detail">
                            <h5>Remove item from my favorites list</h5>
                            <button onclick="window.myCameras.removeSavedCamera('${specificCamera[0].name}')" class="remove">Remove from Favorites</button>
                    </div>
                `;
            favoritesDiv.innerHTML += item;
        }
        )
    }

    removeSavedCamera(removeCamera) {
        let savedCameras = this.getFavoriteCameras();
        for (var i = 0; i < savedCameras.length; i++) {
            // console.log(removeCamera);
            // console.log(savedCameras[i]);
            if (removeCamera == savedCameras[i]){
                savedCameras.splice(i, 1);
            }
        }
        ls.set(savedCameras);
        this.showingSavedCameras();
        return savedCameras;
    }
}
