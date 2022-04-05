import bowUtilities from './utilities.js';
window.myBows = new bowUtilities();
window.addEventListener("load", () => {
    myBows.showingSavedBows();    
});
