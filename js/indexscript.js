const shelfbtn = document.getElementById("shelfbtn");
shelfbtn.addEventListener("click", () => {
  window.location.href = "shelf.html";
});

// Footer Stuff
const footerPictures = document.getElementById("footerPicture");

footerPictures.addEventListener("mouseenter", () => {
  footerPictures.animate(
    { transform: ["rotate(0deg)", "rotate(360deg)"] },
    550
  );
});
