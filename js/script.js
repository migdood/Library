const AddButton = document.getElementById("ADDBUTTON");
const ClearButton = document.getElementById("CLEARBUTTON");
const ISBN = document.getElementById("ISBN");
const Title = document.getElementById("Title");
const Author = document.getElementById("Author");
const Pages = document.getElementById("Pages");
const Status = document.getElementById("Status");
const Tbody = document.getElementById("TBODY");
const Shelf = document.getElementById("Shelf");
const Form = document.getElementById("form");
const DropDownPuller = document.getElementById("DropDownPuller");
const DropDown = document.getElementById("DropDown");
let PullerIsDown = true;
DropDownPuller.style.rotate = "180deg";

DropDownPuller.addEventListener("click", () => {
  if (PullerIsDown) {
    DropDown.style.height = "0px";
    DropDown.style.borderBottom = "0px";
    DropDownPuller.style.rotate = "0deg";
    PullerIsDown = false;
  } else {
    DropDown.style.height = "";
    DropDown.style.borderBottom = "";
    DropDownPuller.style.rotate = "180deg";
    PullerIsDown = true;
  }
});
Form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const MyShelf = [];
// Delete Button is inside AddToMyShelfToDisplay function
function AddToMyShelfToDisplay(book) {
  // Creates the table rows and table data and button tags, adds the class to style
  const tr = document.createElement("tr");
  tr.classList.add("TR");
  tr.onmouseover = function () {
    this.style.backgroundColor = "rgb(218, 217, 217)";
  };
  tr.onmouseleave = function () {
    this.style.backgroundColor = "#fefefe";
  };
  const tdISBN = document.createElement("td");
  tdISBN.classList.add("TD");
  const tdTitle = document.createElement("td");
  tdTitle.classList.add("TD");
  const tdAuthor = document.createElement("td");
  tdAuthor.classList.add("TD");
  const tdPages = document.createElement("td");
  tdPages.classList.add("TD");
  const tdStatus = document.createElement("td");
  tdStatus.classList.add("TD");
  const Edittd = document.createElement("td");
  Edittd.classList.add("TD");
  const button = document.createElement("button");
  button.classList.add("btn");
  const Deletetd = document.createElement("td");
  Deletetd.classList.add("TD");
  const Delbutton = document.createElement("button");
  Delbutton.classList.add("btn");

  // Writes  info into the fields and buttons
  tdISBN.textContent += book.ISBN;
  tdTitle.textContent += book.Title;
  tdAuthor.textContent += book.Author;
  tdPages.textContent += book.Pages;
  tdStatus.textContent += book.Status;
  tdStatus.addEventListener("click", () => {
    if (book.Status === "Reading") {
      book.Status = "Read";
      tdStatus.textContent = "Read";
    } else if (book.Status === "Not Read") {
      book.Status = "Reading";
      tdStatus.textContent = "Reading";
    } else if (book.Status === "Read") {
      book.Status = "Not Read";
      tdStatus.textContent = "Not Read";
    }
  });

  button.textContent += "Edit";
  Delbutton.textContent += "Delete";
  Delbutton.addEventListener("click", () => {
    book.Delete();
    Tbody.removeChild(tr);
  });

  // Appends all the buttons to table rows and such
  tr.appendChild(tdISBN);
  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdPages);
  tr.appendChild(tdStatus);
  Edittd.appendChild(button);
  Deletetd.appendChild(Delbutton);
  tr.appendChild(Edittd);
  tr.appendChild(Deletetd);
  Tbody.appendChild(tr);
  Shelf.appendChild(Tbody);
}

class Book {
  constructor(ISBN, Title, Author, Pages, Status) {
    this.ISBN = ISBN;
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Status = Status;
  }

  Delete() {
    const index = MyShelf.indexOf(this);
    if (index !== -1) {
      MyShelf.splice(index, 1);
    }
  }
}
ClearButton.addEventListener("click", () => {
  ISBN.value = "";
  Title.value = "";
  Author.value = "";
  Pages.value = "";
  Status.value = "Read";
});
AddButton.addEventListener("click", () => {
  if (
    (ISBN.value != "",
    Title.value != "",
    Author.value != "",
    Pages.value != "",
    Status.value != "")
  ) {
    const book = new Book(
      ISBN.value,
      Title.value,
      Author.value,
      Pages.value,
      Status.value
    );
    MyShelf.push(book);
    AddToMyShelfToDisplay(book);
    console.log(MyShelf);
    // Adds any new addition of the shelf to the local storage.
    localStorage.setItem("MyShelf", JSON.stringify(MyShelf));
  } else {
    console.log("Empty Input Field");
  }
  ClearButton.click();
});

// Checks localStorage for any data then collects it and outputs it
window.addEventListener("load", () => {
  const storedShelf = localStorage.getItem("MyShelf");
  if (storedShelf) {
    MyShelf.length = 0;
    const parsedShelf = JSON.parse(storedShelf);
    parsedShelf.forEach((bookData) => {
      const book = new Book(
        bookData.ISBN,
        bookData.Title,
        bookData.Author,
        bookData.Pages,
        bookData.Status
      );
      MyShelf.push(book);
      AddToMyShelfToDisplay(book);
      console.log(localStorage);
    });
  }
});

// Scans the whole array for books and displays them
MyShelf.forEach((book) => {
  AddToMyShelfToDisplay(book);
});
