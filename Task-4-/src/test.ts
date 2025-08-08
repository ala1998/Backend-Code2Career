import * as Index from "./index";

// Testing Of User Model
const users = new Index.UserRepo();
await users.createNewItem({
  id: 4,
  name: "Ayloul",
  email: "ayloul@gmail.com",
  gender: Index.Gender.FEMALE,
});
await users.createNewItem({
  id: 5,
  name: "Sara",
  email: "sara@gmail.com",
  gender: Index.Gender.FEMALE,
});
await users.createNewItem({ id: 4, name: "Farah", email: "farah@gmail.com" });
console.log(await users.fetchAllItems());
const user1 = await users.fetchOneItemByID(2);
console.log(user1 !== undefined ? user1 : "No user found!");
const user2 = await users.fetchOneItemByID(16);
console.log(user2 !== undefined ? user2 : "No user found!");
await users.updateExistingItem({ id: 2, email: "ayman@hotmail.com" });
await users.updateExistingItem({ id: 9, gender: Index.Gender.FEMALE });
await users.deleteItemByID({ id: 5 });
await users.deleteItemByID({ id: 9 });
console.log(
  await users.findItemsByFilter({ name: "Jood", gender: Index.Gender.MALE })
);
// Testing Additional Methods
console.log(users.getFemales);
console.log(users.findByGender(Index.Gender.MALE));
console.log(`Number Of Created Users is: ${await users.NumOfCreatedItems()}`);
console.log(`Number Of Deleted Users is: ${await users.NumOfDeletedItems()}`);

// Testing Of Course Model
const courses = new Index.CourseRepo();
await courses.createNewItem({
  id: 4,
  name: "Python from Zero to Hero",
  department: Index.Departments.PROGRAMMING,
  price: 170,
});
await courses.createNewItem({
  id: 5,
  name: "Learn Sales Strategies",
  department: Index.Departments.NON_TECH,
  price: 100,
  discount: 0.3,
});
await courses.createNewItem({
  id: 2,
  name: "Linux Essentials for Developers",
  department: Index.Departments.OS,
  price: 130,
});
console.log(await courses.fetchAllItems());
const course1 = await courses.fetchOneItemByID(2);
console.log(course1 !== undefined ? course1 : "No course found!");
const course2 = await courses.fetchOneItemByID(16);
console.log(course2 !== undefined ? course2 : "No course found!");
await courses.updateExistingItem({ id: 3, name: "NodeJS for Everyone" });
await courses.updateExistingItem({ id: 9, price: 190 });
await courses.deleteItemByID({ id: 4 });
await courses.deleteItemByID({ id: 9 });
console.log(
  await courses.findItemsByFilter({ department: Index.Departments.PROGRAMMING })
);
// Testing Additional Methods
console.log(courses.getCheapestCourses());
console.log(courses.getCoursesWithDiscounts());
console.log(
  `Number Of Created Courses is: ${await courses.NumOfCreatedItems()}`
);
console.log(
  `Number Of Deleted Courses is: ${await courses.NumOfDeletedItems()}`
);

// Testing Of Booking Model
const bookings = new Index.BookingRepo();
await bookings.createNewItem({
  id: 4,
  userID: 4,
  courseID: 1,
  BookedAt: new Date(),
  status: "done",
});
await bookings.createNewItem({
  id: 5,
  userID: 4,
  courseID: 2,
  BookedAt: new Date(),
  status: "cancelled",
});
await bookings.createNewItem({
  id: 6,
  userID: 2,
  courseID: 5,
  BookedAt: new Date(),
  status: "pending",
});
await bookings.createNewItem({
  id: 1,
  userID: 5,
  courseID: 2,
  BookedAt: new Date(),
  status: "done",
});
console.log(await bookings.fetchAllItems());
const booking1 = await courses.fetchOneItemByID(2);
console.log(booking1 !== undefined ? booking1 : "No booking found!");
const booking2 = await courses.fetchOneItemByID(16);
console.log(booking2 !== undefined ? booking2 : "No booking found!");
await bookings.updateExistingItem({ id: 3, userID: 1, status: "cancelled" });
await bookings.updateExistingItem({ id: 9, status: "done" });
await bookings.deleteItemByID({ id: 4 });
await bookings.deleteItemByID({ id: 9 });
console.log(
  await bookings.findItemsByFilter({
    userID: 4,
    status: "done",
  })
);
// Testing Additional Methods
console.log(bookings.getDoneBookings());
console.log(bookings.getCancelledBookings());
const userID = 2;
console.log(
  `Courses booked by user (${userID}) are: ${bookings.coursesBookedByUser(
    userID
  )}`
);
const courseID = 1;
console.log(
  `Users who booked course (${courseID}) are: ${bookings.usersBookedSpecificCourse(
    courseID
  )}`
);
console.log(
  `Number Of Created Bookings is: ${await bookings.NumOfCreatedItems()}`
);
console.log(
  `Number Of Deleted Bookings is: ${await bookings.NumOfDeletedItems()}`
);
