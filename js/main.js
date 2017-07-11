/* WATS 3020 Image Maker Code */
class ImageMaker {
    constructor(){

    }
    drawPreview(){

    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////
let canvas = document.getElementById("canvas");
let imageWrapper = document.getElementById("image-wrapper");
imageWrapper.style.overflow = "hidden";
imageWrapper.height = 0;
imageWrapper.width = 0;

function generateImage(elementID="image-preview"){
    imageWrapper.height = 700;
    imageWrapper.width = 1000;
    canvas.height = 600;
    canvas.width = 900;
    let htmlTemplate = document.getElementById(elementID).innerHTML;
    rasterizeHTML.drawHTML(htmlTemplate, canvas).then(function (result) {
        console.log(result);
    }, function (e) {
        console.log('An error occured:', e);
    });
}

function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.drawPreview();
        generateImage();
    })
}
applyEventListeners();
