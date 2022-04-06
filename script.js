const imgContainer = document.querySelector("#img-container");
const loader = document.querySelector(".loader");

let photosArray = [];
let imgsLoaded = 0;
let totalImgs = 0;
let ready = false;
// Using Unsplash API
const count = 10;
const apiKey = "CFKJPaejnN0m3NSDUCfvssZQRILPWxmSf5fOy5gAhPw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function ImageLoaded() {
  imgsLoaded++;
  console.log(imgsLoaded);
  if (imgsLoaded === totalImgs) {
    ready = true;
    loader.hidden = true;
  }
}

// Healper Function to set attributes
// function setAttributes(elements, attributes) {
//   for (const key in attributes) {
//     elements.setAttribute(key, attributes[key]);
//   }
// }

function displayPhotos() {
  imgsLoaded = 0;
  totalImgs = photosArray.length;

  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // setAttributes(item, {
    //   href: photo.links.html,
    //   target: "_blank",
    // });

    // Create <Img> tag for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // setAttributes(img, {
    //   src: photo.urls.regular,
    //   alt: photo.alt_description,
    //   title: photo.alt_description,
    // });
    img.addEventListener("load", ImageLoaded);
    // Put <img> tag into <a> tag for link and then put both into .img-container div
    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

// Get Photos From Unsplash Api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Load More photos by scrolling
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
