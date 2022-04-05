
import { bows } from './bows.js';
import { ls } from './ls.js';
var favorites = [];

// document.getElementById("findbowbutton").onclick = this.filterResults();

export default class bowUtilities {

    constructor() {
        // querySelector returns the first element that matches, in this case its the id 
        this.favoriteBows = document.querySelector('#favorites');
        // this.parentElement = document.getElementById(elementId);
    }

    getFavoriteBows() {
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
        const filteredBows = bows.filter(bow => bow.level == level && bow.type == type && bow.category == category);
        // console.log(filteredBows);
        const results = this.renderBows(filteredBows);
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
        resultsDiv.innerHTML = results;
        // console.log(resultsDiv);
        // console.log(resultsDiv.querySelectorAll(".bowbox1"));
        // console.log(resultsDiv.getElementsByTagName("h3")[1].innerHTML);
        // console.log(resultsDiv.getElementsByTagName("h3")[0].innerHTML);
        let newArray = resultsDiv.querySelectorAll(".bowbox1");
        for (var i = 0; i < newArray.length; i++) {
            // console.log(newArray[i].getElementsByTagName("h3")[0].innerHTML);
            let bowname = newArray[i].getElementsByTagName("h3")[0].innerHTML;
            newArray[i].addEventListener('click', (event) => this.renderOneBow(bowname));
        }

    }

    // This is just a function to get ideas on how to display the bows and the info
    renderBows(filteredBows) {
        let item = "";
        filteredBows.forEach(bow => {
            item += `
                <div class="bowbox1">
                    <h3>${bow.name}</h3>
                    <div><img src="${bow.imgSrc}" alt="${bow.imgAlt}" class="image"></div>
                        <div class = "detail">
                            <div>
                                <h5>Draw Weight</h5>
                                <p>${bow.drawWeight}</p>
                            </div>
                            <div>
                                <h5>Mass Weight</h5>
                                <p>${bow.massWeight}</p>
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

    renderOneBow(bowname) {
        let specificBow = bows.filter(bow => bow.name == bowname);
        // console.log(specificBow[0]);
        let item = "";
        item += `
            <div class="bowbox2">
            <h3>${specificBow[0].name}</h3>
            <div><img src="${specificBow[0].imgSrc}" alt="${specificBow[0].imgAlt}" class="image"></div>
                <div class = "detail">
                    <div>
                        <h5>Draw Weight</h5>
                        <p>${specificBow[0].drawWeight}</p>
                    </div>
                    <div>
                        <h5>Draw Length</h5>
                        <p>${specificBow[0].drawLength}</p>
                    </div>
                    <div>
                        <h5>Mass Weight</h5>
                        <p>${specificBow[0].massWeight}</p>
                    </div>
                    <div>
                        <h5>Speed</h5>
                        <p>${specificBow[0].speed}</p>
                    </div> 
                    <div>
                        <h5>Axle to Axle</h5>
                        <p>${specificBow[0].axle2axle}</p>
                    </div> 
                    <div>
                        <h5>Colors Available</h5>
                        <p>${specificBow[0].color}</p>
                    </div> 
                    <div>
                        <h5>More information and where to buy this item:</h5>
                        <a href="${specificBow[0].url}" target="_blank" class="purchasebutton">${specificBow[0].name}</a>
                    </div>
                    <div>
                        <h5>Save this item to my favorites list</h5>
                        <p>(Item gets saved below)</p>
                        <button onclick="window.myBows.saveBow('${specificBow[0].name}')" class="save">Save to Favorites</button>
                    </div>
                </div>
            </div>
            `;
        // console.log(specificBow[0]);
        let resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
        resultsDiv.innerHTML = item;
    }


    saveBow(specificBow) {
        // console.log(JSON.stringify(specificBow));
        let favoriteBows = this.getFavoriteBows();
        if (favoriteBows == null) {
            favoriteBows = new Array();
        }
        // make it so they can't add an item twice
        let savedFavoriteBow = specificBow;
        let n = favoriteBows.includes(savedFavoriteBow);
        // console.log(n);
        if (n) {
            let errormsg = document.getElementById("error");
            errormsg.classList.remove("hidden");
            window.setTimeout(() => errormsg.classList.add("hidden"), 3000);
        }
        else {favoriteBows.push(savedFavoriteBow);
        ls.set(favoriteBows);
        this.showingSavedBows();}
    }

    showingSavedBows() {
        let savedArrayofBows = this.getFavoriteBows();
        let favoritesDiv = document.getElementById("favorites");
        favoritesDiv.innerHTML = "";
        if (savedArrayofBows == null || savedArrayofBows == '') {
            favoritesDiv.innerHTML += `<p>No bows have been saved to your favorites yet.</p>`;
        }
        savedArrayofBows.forEach(favbow => {
            let specificBow = bows.filter(bow => bow.name == favbow);
            let item = "";
            item += `
                <div class="bowbox3">
                <h3>${specificBow[0].name}</h3>
                <div><img src="${specificBow[0].imgSrc}" alt="${specificBow[0].imgAlt}" class="image"></div>
                    <div class = "detail">
                            <h5>Remove item from my favorites list</h5>
                            <button onclick="window.myBows.removeSavedBow('${specificBow[0].name}')" class="remove">Remove from Favorites</button>
                    </div>
                `;
            favoritesDiv.innerHTML += item;
        }
        )
    }

    removeSavedBow(removeBow) {
        let savedBows = this.getFavoriteBows();
        for (var i = 0; i < savedBows.length; i++) {
            // console.log(removeBow);
            // console.log(savedBows[i]);
            if (removeBow == savedBows[i]){
                savedBows.splice(i, 1);
            }
        }
        ls.set(savedBows);
        this.showingSavedBows();
        return savedBows;
    }
}
