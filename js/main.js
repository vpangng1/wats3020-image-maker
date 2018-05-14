/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor(){
       
        this.imagePreview = document.querySelector('#image-preview'); // selects image-preview div of index.html document
        
        this.topText = document.createElement('p');          // 
                                                             // 
        this.topText.setAttribute('class', 'top-text');      // create a new <p> element called this.topText
                                                             //
        this.imagePreview.appendChild(this.topText);         // adds this.topText child element to this.imagePreview

        this.bottomText = document.createElement('p');        //
                                                              // create a new <p> element with classname bottom-text
        this.bottomText.setAttribute('class', 'bottom-text'); // 
                                                              //
        this.imagePreview.appendChild(this.bottomText);       // add this.bottomText to this.imagePreview
      
        //this.colorText = document.createElement('p');
      
        //this.colorText.setAttribute('class', 'color-text');
      
        //this.imagePreview.appendChild(this.colorText);
      
       
      
        // Form fields for reading user input
        
        this.backgroundInput = document.querySelector('select[name="backgroundImage"]'); // selects the backgroundImage element 

      
        this.topTextInput = document.querySelector('input[name="topText"]'); // selects the topText input element

    
        this.bottomTextInput = document.querySelector('input[name="bottomText"]'); // selects the bottomText input element
      
      
        //this.colorTextInput = document.querySelector('input[name="colorText"]');
     
    }
  
  
        
    drawPreview(){
      
        // This function is called whenever a user changes one of the form fields
        // and whenever an image is generated for download. This function must
        // update the style attributes and innerHTML content of the HTML
        // elements selected in the `constructor()` of this class in order to
        // update `this.imagePreview`.
      
      this.imagePreview.style.backgroundImage = `url(images/${this.backgroundInput.value})`; // updates background-image property of this.imagePreview
       
      this.topText.innerHTML = this.topTextInput.value; // updates the innerHTML content of this.topText
       
      this.bottomText.innerHTML = this.bottomTextInput.value; // updates the innerHTML content of this.bottomText
      
      //this.colorTextInput.innerHTML = this.colorText.value;

    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();
