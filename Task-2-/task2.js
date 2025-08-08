class LibraryItem {

    static counter = 0;

    #id;
    #name;
    #owner;
    #isAvailable;

    constructor(id, name, owner, isAvailable = false) {
        this.#id = id;
        this.#name = name;
        this.#owner = owner;
        this.#isAvailable = isAvailable;
        LibraryItem.counter++; // Only in this form
    }

    toggleAvailabilityStatus() {
        this.#isAvailable = !this.#isAvailable;
    }

    info() {
        return `The "${this.#name}" library item owned by ${this.#owner} is [${this.#isAvailable ? 'available' : 'unavailable'}] now!`;
    }

    getID() {
        return this.#id;
    }

    setID(id) {
        this.#id = id;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getOwner() {
        return this.#owner;
    }

    setOwner(owner) {
        this.#owner = owner;
    }

    isAvailableNow() {
        return this.#isAvailable;
    }

    static numberOfLibraryItems() {
        return `The number of Library Items created till now: ${this.counter}.`; // Or use LibraryItem.counter;
    }
}


class Book extends LibraryItem {

    static counter = 0;

    #publishedAt;
    #numOfPages;
    #isRead;

    constructor(id, title, author, publishedAt, numOfPages, isRead = false) {
        super(id, title, author); // Assume that the author is like the owner.
        this.#publishedAt = publishedAt;
        this.#numOfPages = numOfPages;
        this.#isRead = isRead;
        Book.counter++;
    }

    toggleReadStatus() {
        this.#isRead = !this.isRead;
    }

    info() {
        return `The "${this.getName()}" book by ${this.getOwner()}, which's published in ${this.#publishedAt} is [${this.#isRead ? 'read' : 'unread'}] now.`;
    }

    isReadNow() {
        return this.#isRead;
    }

    getPagesNum() {
        return this.#numOfPages;
    }

    setPagesNum(numOfPages) {
        if (numOfPages > 0) {
            this.#numOfPages = numOfPages;
        }
        else {
            console.log("The number of pages can't be negative!");
        }
    }

    whenPublished() {
        return this.#publishedAt;
    }

    setPublishYear(publishedAt) {
        this.#publishedAt = publishedAt;
    }

    static numberOfBooks() {
        return `The number of Books created till now: ${this.counter}.`; // Or use Book.counter;
    }
}

const item1 = new LibraryItem(1, "First LibraryItem", "IT team", true);
console.log(item1.info());
item1.toggleAvailabilityStatus();
console.log(item1.info());

const book1 = new Book(2, "Java: From Zero To Hero!", "Herbert Schildt", 2018, 1248, false);
console.log(book1.info());
book1.toggleReadStatus();
console.log(book1.info());
book1.setPagesNum(-2);

const book2 = new Book(3, "Python Advanced Course", "Eric Matthes", 2021, 544, true);
console.log(book2.info());
console.log(book2.isAvailableNow());

console.log(LibraryItem.numberOfLibraryItems());
console.log(Book.numberOfBooks());

