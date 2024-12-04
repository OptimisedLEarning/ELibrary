class Library {
  constructor() {
    this.myLibrary = [];
    this.form = document.getElementById("newform");
    this.tableBody = document.querySelector("tbody");
    this.thead =document.querySelector("thead");

    // Set up event listeners
    this.initEventListeners();
  }

  initEventListeners() {
    // Show form
    document.getElementById("newBookButton").addEventListener("click", () => {
      this.form.classList.remove("hidden");
    });

    // Close form
    document.getElementById("close").addEventListener("click", () => {
      this.form.classList.add("hidden");
      this.form.reset();
    });

    // Form submission
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addBookToLibrary();
    });
  }

  addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("status").checked;

    // Add book to library
    this.myLibrary.push(new Book(title, author, pages, read));

    // Update UI
    this.displayBooks();

    // Reset form
    this.form.reset();
    this.form.classList.add("hidden");
  }

  displayBooks() {
   
    
    this.tableBody.innerHTML = ""; // Clear table

    this.myLibrary.forEach((book, index) => {
      this.thead.innerHTML="";

      const table_head = document.createElement("tr");
      
     
      
      

      table_head.innerHTML =`<th> Title </th> 
                              <th> Author </th>
                              <th> Pages </th>
                              <th> Status </th>
                              <th> Action </th>`

        this.thead.appendChild(table_head);
        
        
      const row = document.createElement("tr");

      // Add book details to the row
      row.innerHTML = `
      
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
          <button onclick="library.toggleStatus(${index})">
            ${book.read ? "Read" : "Not Read"}
          </button>
        </td>
        <td>
          <button onclick="library.removeBook(${index})">Remove</button>
        </td>
      `;

      this.tableBody.appendChild(row); // Add the row to the table
    });
  }

  removeBook(index) {
    this.myLibrary.splice(index, 1); // Remove book
    this.displayBooks(); // Update the table
  }

  toggleStatus(index) {
    const book = this.myLibrary[index];
    book.read = !book.read; // Toggle the read status
    this.displayBooks(); // Update the table
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Initialize library
const library = new Library();
