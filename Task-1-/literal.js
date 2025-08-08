const book = {
    title: "Java",
    author: "Someone",
    isRead: false,
    toggleReadStatus() {
        this.isRead = !this.isRead;
    },
    describe() {
        return `📖 "${this.title}" by ${this.author} is [${this.isRead ? 'Read' : 'Unread'}].`;
    }
};

console.log(book);
console.log(book.title);
console.log(book.author);
book.toggleReadStatus()
console.log(book.describe());