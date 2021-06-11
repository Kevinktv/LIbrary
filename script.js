let myLibrary = [];

function Book(title, author, pages, read){
    // Book constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read? 'read.': 'not read.'}`
    };
}

Book.prototype.changeReadStatus = function(){
    this.read = !this.read;
}

//DOM ELEMENTS
let books = document.querySelectorAll('.del');
let bookStatus = document.querySelectorAll('.change');


// function validateForm() {
//     var name = document.forms["myForm"]["book-name"].value;
//     if (name == "") {
//       alert("Name must be filled out");
//       return false;
//     }
    
//   }

function addBookToLibrary(title, author, pages, read){
    // Adds a new book to library after asking user input
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayOneBook(newBook, myLibrary.length - 1);
}

function submitForm(e){
    // Submits and updates the table after entering book
    let bookName = document.querySelector('#book-name');
    let bookAuthor = document.querySelector('#author-name');
    let pages = document.querySelector('#pages');
    let yes = document.querySelector('#yes');

    if(bookName.value === '' || bookAuthor.value === ''){
        alert('Name and author cannot be left empty');
    }
    else if(!pages.value.trim().match(/^[0-9]+$/)){
        alert('Enter a valid page number')
    }

    else{
        addBookToLibrary(bookName.value.trim(), bookAuthor.value.trim(), pages.value.trim(), yes.checked);
        bookName.value = '';
        bookAuthor.value = '';
        pages.value = '';
        yes.checked = true;
        document.querySelector('#modal').style.display = 'none';
        document.querySelector('body').style.backgroundColor = 'white';
    }
}

function clearLibraryDisplay(){
    // Clears library display
    let parent = document.querySelector('table');
    let allRows = document.querySelectorAll('tr');
    allRows = Array.from(allRows);
    for(let i = 1; i < allRows.length; ++i){
        parent.removeChild(allRows[i]);
    }
}

function displayAll(){
    // Displays all the books inside the library
    let table = document.querySelector('table');

    for(let i = 0; i < myLibrary.length; ++i){
        let book = myLibrary[i];

        let newRow = document.createElement('tr');
        let newTitle = document.createElement('td');
        let newAuthor = document.createElement('td');
        let newPages = document.createElement('td');
        let newRead = document.createElement('td');
        let changeRead = document.createElement('td');
        let del = document.createElement('td');

        del.classList.add('del');
        changeRead.classList.add('change')
        
        del.setAttribute('data-bookno', `${i}`);
        newRow.setAttribute('data-bookno', `${i}`);
        changeRead.setAttribute('data-bookno', `${i}`);
        newTitle.textContent = book.title;
        newAuthor.textContent = book.author;
        newPages.textContent = book.pages;
        newRead.textContent = `${book.read}`;
        changeRead.textContent = 'Change read status?';
        del.textContent = 'Delete';
        newRow.appendChild(newTitle);
        newRow.appendChild(newAuthor);
        newRow.appendChild(newPages);
        newRow.appendChild(newRead);
        newRow.appendChild(changeRead);
        newRow.appendChild(del);
        table.appendChild(newRow);      
    }

    let books = document.querySelectorAll('.del');
    books.forEach(function(book){book.addEventListener('click', deleteBook)});

    let bookStatus = document.querySelectorAll('.change');
    bookStatus.forEach(function(book){book.addEventListener('click', changeReadStatusDom)});
}

function deleteBook(e){
    let bookIndex = this.dataset.bookno;
    myLibrary.splice(bookIndex, 1);

    clearLibraryDisplay();

    displayAll();

    // let books = document.querySelectorAll('.del');
    // books.forEach(function(book){book.addEventListener('click', deleteBook)});

}


function changeReadStatusDom(e){
    console.log(this.dataset);
    let bookIndex = this.dataset.bookno;
    myLibrary[bookIndex].changeReadStatus();
    clearLibraryDisplay();
    displayAll();

    let books = document.querySelectorAll('.del');
    books.forEach(function(book){book.addEventListener('click', deleteBook)});

    let bookStatus = document.querySelectorAll('.change');
    bookStatus.forEach(function(book){book.addEventListener('click', changeReadStatusDom)});
}


function displayOneBook(book, length){
    // Displays one new added book into the table
    let table = document.querySelector('table');
    let newRow = document.createElement('tr');
    let newTitle = document.createElement('td');
    let newAuthor = document.createElement('td');
    let newPages = document.createElement('td');
    let newRead = document.createElement('td'); 
    let changeRead = document.createElement('td');
    let del = document.createElement('td');

    del.setAttribute('data-bookno', `${length}`);
    newRow.setAttribute('data-bookno', `${length}`);
    changeRead.setAttribute('data-bookno', `${length}`);

    del.classList.add('del');
    changeRead.classList.add('change');

    newTitle.textContent = book.title;
    newAuthor.textContent = book.author;
    newPages.textContent = book.pages;
    newRead.textContent = `${book.read}`;
    changeRead.textContent = 'Change read status?'
    del.textContent = 'Delete';
    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newPages);
    newRow.appendChild(newRead);
    newRow.appendChild(changeRead);
    newRow.appendChild(del);
    table.appendChild(newRow);

    let books = document.querySelectorAll('.del');
    books.forEach(function(book){book.addEventListener('click', deleteBook)});

    let bookStatus = document.querySelectorAll('.change');
    bookStatus.forEach(function(book){book.addEventListener('click', changeReadStatusDom)});
}

const addBook = document.querySelector('#subm');
const newBook = document.querySelector('#add-book');
const modal = document.querySelector('#modal');
const clos = document.querySelector('#close');

addBook.addEventListener('click', submitForm);
newBook.onclick = () => {modal.style.display = 'block'; document.querySelector('body').style.backgroundColor = 'rgba(0, 0, 0, 0.1)';};
clos.onclick = () => {modal.style.display = 'none'; document.querySelector('body').style.backgroundColor = 'white';};

books.forEach(function(book){book.addEventListener('click', deleteBook)});
bookStatus.forEach(function(book){book.addEventListener('click', changeReadStatusDom)});