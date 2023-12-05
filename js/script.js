const AddButton = document.getElementById("ADDBUTTON");
const ISBN = document.getElementById("ISBN");
const Title = document.getElementById("Title");
const Author = document.getElementById("Author");
const Pages = document.getElementById("Pages");
const Status = document.getElementById("Status");
const Tbody = document.getElementById("TBODY");
const Shelf = document.getElementById("Shelf");

const MyShelf = [];
function AddtoMyShelf(book) {
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

  tdISBN.textContent += book.ISBN;
  tdTitle.textContent += book.Title;
  tdAuthor.textContent += book.Author;
  tdPages.textContent += book.Pages;
  tdStatus.textContent += book.Status;

  tr.appendChild(tdISBN);
  tr.appendChild(tdTitle);
  tr.appendChild(tdAuthor);
  tr.appendChild(tdPages);
  tr.appendChild(tdStatus);
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
    AddtoMyShelf(book);
    console.log(MyShelf);
  } else {
    console.log("Empty Input Field");
  }
});
const Book1 = new Book(
  9788804714095,
  "The Name Of The Wind",
  "Patrick Rothfuss",
  622,
  "Read"
);
const Book2 = new Book(
  9783608938166,
  "The Wise Man's Fear",
  "Patrick Rothfuss",
  994,
  "Read"
);
const Book3 = new Book(
  9780008115456,
  "Assassin's Apprentice",
  "Robin Hobb",
  400,
  "Reading"
);

MyShelf.push(Book1, Book2, Book3);
// Scans the whole array for books and displays them
MyShelf.forEach((book) => {
  AddtoMyShelf(book);
});
