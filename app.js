let myLibrary = [];
const books = document.querySelector('.books');

// Create the book constructor
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Some example books
const book1 = new Book(0, 'Steve Jobs', 'Julius', 670, true);
const book2 = new Book(1, 'GOT', 'Martin', 540, false);
const book3 = new Book(2, 'Cracking the code', 'abs', 640, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

// Add the object book to myLibrary array
function addBookToLibrary() {
    const bookInfo = {
        'title': document.querySelector('#title').value,
        'author': document.querySelector('#author').value,
        'pages': document.querySelector('#pages').value,
        'read': document.querySelector('#read').checked,
    }

    const book = new Book(myLibrary.length, bookInfo.title, bookInfo.author, bookInfo.pages, bookInfo.read);
    addNewBook(book);
    myLibrary.push(book);

}

// Create a new book and display it on the DOM
function addNewBook(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = myLibrary.length;
    card.dataset.read = book.read;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const title = document.createElement('h2');
    title.innerText = book.title;

    const author = document.createElement('p');
    author.innerText = book.author;

    const pages = document.createElement('p');
    pages.innerText = book.pages;


    const btn = document.createElement('button');
    btn.classList.add('erase');
    btn.innerText = 'Delete';
    // btn.dataset.id = myLibrary.length;

    const btnRead = document.createElement('button');
    btnRead.classList.add('readBtn');
    btnRead.innerText = book.read ? 'Already read' : 'Not read yet';
    // btnRead.dataset.read = book.read;

    infoDiv.appendChild(title);
    infoDiv.appendChild(author);
    infoDiv.appendChild(pages);

    card.appendChild(infoDiv);
    card.appendChild(btn);
    card.appendChild(btnRead);

    
    books.appendChild(card);


    erase();
    changeReadStatus();
}

// Show the books on myLibrary array
function showBooks() {   
    
    let arrLen = myLibrary.length;

    for (let i = 0; i < arrLen; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = i;
        card.dataset.read = myLibrary[i].read;
        myLibrary[i].id = i;
        
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const title = document.createElement('h2');
        title.innerText = myLibrary[i].title;

        const author = document.createElement('p');
        author.innerText = myLibrary[i].author;

        const pages = document.createElement('p');
        pages.innerText = myLibrary[i].pages;


        const btn = document.createElement('button');
        btn.classList.add('erase');
        btn.innerText = 'Delete';

        const btnRead = document.createElement('button');
        btnRead.classList.add('readBtn');
        btnRead.innerText = myLibrary[i].read ? 'Already read' : 'Not read yet';

        infoDiv.appendChild(title);
        infoDiv.appendChild(author);
        infoDiv.appendChild(pages);

        card.appendChild(infoDiv);
        card.appendChild(btn);
        card.appendChild(btnRead);
        
        books.appendChild(card);

    }
    
}

function erase() {
    const eraseBtns = document.querySelectorAll('.erase');
    
    eraseBtns.forEach(btn => {
        
        btn.addEventListener('click', e => {
            
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == e.target.parentElement.dataset.id) {
                    myLibrary.splice(i, 1);
                }
            }

            e.target.parentElement.remove();
        });
    });
}

function changeReadStatus() {
    const readBtns = document.querySelectorAll('.readBtn');
    
    readBtns.forEach(btn => {
        
        btn.addEventListener('click', e => {
            
            // Change the read status on myLibrary array
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == e.target.parentElement.dataset.id) {
                    if (e.target.parentElement.dataset.read == 'true') {
                        myLibrary[i].read = false;
                    } else {
                        myLibrary[i].read = true;
                    }
                }
            }

            e.target.classList.toggle('readBtn');

            // Change read status on the DOM
            if (e.target.parentElement.dataset.read == 'true') {
                e.target.parentElement.dataset.read = 'false';
                e.target.innerText = 'Not read yet';
            } else {
                e.target.parentElement.dataset.read = 'true';
                e.target.innerText = 'Already read';
            }
            
            console.log(myLibrary);
        });
    });
}

// Add a new book
const add = document.querySelector('#add');
add.addEventListener('click', e => {
    e.preventDefault();

    addBookToLibrary();
    
    console.log(myLibrary);
});

const closeForm = document.querySelector('#close-form');
closeForm.addEventListener('click', e => {
    e.preventDefault();

    const form = document.querySelector('.form');
    
    form.classList.remove('show');
});

// Show the form
const newBook = document.querySelector('#newBook');
newBook.addEventListener('click', e => {
    const form = document.querySelector('.form');
    
    form.classList.add('show');
});

showBooks();
erase();
changeReadStatus();