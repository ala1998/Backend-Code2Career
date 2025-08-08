// 1- Factory Function Pattern
function createBook(title, author, isRead = false) {
    const book = {};

    book.title = title;
    book.author = author;
    book.isRead = isRead;

    book.toggleReadStatus = function () {
        this.isRead = !this.isRead;
    };

    book.describe = function () {
        return `📖 "${this.title}" by ${this.author} is [${this.isRead ? 'Read' : 'Unread'}]`;
    };
    return book;
}

const book1 = createBook('Java Book', 'Author1');
const book2 = createBook('Python Book', 'Author2');

book1.toggleReadStatus();

console.log(book1.describe());
console.log(book2.describe());

console.log(book1.toggleReadStatus === book2.toggleReadStatus);
console.log(book1.describe === book2.describe);
