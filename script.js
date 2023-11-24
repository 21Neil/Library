const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeStatus = function () {
  if (this.read === 'not read yet') return (this.read = 'have read');
  if (this.read === 'have read') return (this.read = 'not read yet');
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295', 'not read yet');
const gameTime = new Book('Game Time', 'Game Boy', 1769, 'not read yet');
myLibrary.push(theHobbit, gameTime);

function makeBookList() {
  const bookTable = document.querySelector('#book-table>tbody');
  const bookTableRow = document.querySelectorAll('#book-table>tbody tr');
  bookTableRow.forEach(tr => tr.remove());
  myLibrary.forEach((book, i) => {
    const row = bookTable.insertRow(-1);
    const removeBtn = document.createElement('button');
    const changeStatusBtn = document.createElement('button');

    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;
    row.insertCell(3).appendChild(changeStatusBtn);
    row.insertCell(4).appendChild(removeBtn);
    removeBtn.textContent = 'remove';
    changeStatusBtn.textContent = book.read;
    row.dataset.index = i;

    removeBtn.addEventListener('click', () => {
      myLibrary.splice(row.dataset.index, 1);
      makeBookList();
    });

    changeStatusBtn.addEventListener('click', () => {
      book.changeStatus();
      makeBookList();
    });
  });
}

makeBookList();

document.querySelector('#add-book').addEventListener('click', () => {
  document.querySelector('#add-book-dialog').showModal();
});

document.querySelector('#add-book-dialog .confirm-btn').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#add-book-dialog').close();
  function getReadStatus() {
    const bookRead = document.getElementsByName('book-read')
    for(let i = 0; i < bookRead.length; i++) {
      if(bookRead[i].checked) return bookRead[i].value
    }
    return
  }
  let newBook = new Book(
    document.querySelector('#add-book-dialog #book-title').value,
    document.querySelector('#add-book-dialog #book-author').value,
    document.querySelector('#add-book-dialog #book-pages').value,
    getReadStatus()
  );
  addBookToLibrary(newBook);
  makeBookList();
});

document.querySelector('#add-book-dialog').addEventListener('close', () => {
  document.querySelector('#add-book-dialog form').reset();
});

document.querySelector('#add-book-dialog').addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.querySelector('#add-book-dialog').close();
    let newBook = new Book(
      document.querySelector('#add-book-dialog #book-title').value,
      document.querySelector('#add-book-dialog #book-author').value,
      document.querySelector('#add-book-dialog #book-pages').value
    );
    addBookToLibrary(newBook);
    makeBookList();
  }
});
