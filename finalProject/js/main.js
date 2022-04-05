import cameraUtilities from './utilities.js';
window.myCameras = new cameraUtilities();
window.addEventListener("load", () => {
    myCameras.showingSavedCameras();    
});
