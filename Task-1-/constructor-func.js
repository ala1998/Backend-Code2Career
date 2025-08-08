
// 2- Constructor Function Pattern
function Book(title, author, isRead = false) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}
Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
};

Book.prototype.describe = function () {
    return `📖 "${this.title}" by ${this.author} is [${this.isRead ? 'Read' : 'Unread'}]`;
};

const book1 = new Book('Java', "Author1");
const book2 = new Book('Python', "Author2"); 

  book1.toggleReadStatus(); 

  console.log(book1.describe()); 
  console.log(book2.describe()); 

  console.log(book1.toggleReadStatus === book2.toggleReadStatus);
  console.log(book1.describe === book2.describe); 

  console.log(book1 instanceof Book); 
  console.log(book1.constructor === Book); 
console.log(book2 instanceof Book); 
  console.log(book2.constructor === Book); 
