type Item = { // OR interface
  id: number;
};

interface Repository<T extends Item> {
  fetchAllItems(): Promise<T[]>;
  fetchOneItemByID(id: number): Promise<T | undefined>;
  createNewItem(item: T): Promise<void>;
  updateExistingItem(fields: Partial<T>): Promise<boolean>;
  deleteItemByID(id: Pick<T, "id">): Promise<boolean>; // Or only as a number argument
  findItemsByFilter(fields: Partial<T>): Promise<T[]>;
}

class BaseRepository<T extends Item> implements Repository<T> {
  private items: T[] = [];
  private createdItems: number = 0;
  private deletedItems: number = 0;

  constructor(items: T[]) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  NumOfCreatedItems() {
    return this.createdItems;
  }

  NumOfDeletedItems() {
    return this.deletedItems;
  }

  async fetchAllItems(): Promise<T[]> {
    return this.items;
  }

  async fetchOneItemByID(id: number): Promise<T | undefined> {
    const item = this.items.find((item) => item.id === id);
    return item;
  }

  async createNewItem(newItem: T): Promise<void> {
    const isIDExist = this.items.some((item) => item.id === newItem.id); // OR using find()
    if (isIDExist) console.log(`Item with id: ${newItem.id} is already exist!`);
    else {
      this.items.push(newItem);
      console.log("Item is successfully created!");
      this.createdItems++;
    }
  }

  async updateExistingItem(
    fields: { id: number } & Partial<T>
  ): Promise<boolean> {
    // To make id mandatory.
    const index = this.items.findIndex((item) => fields.id === item.id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...fields };
      return true;
    } else {
      console.log(`There's no item with ID: ${fields.id}`);
      return false;
    }
  }

  async deleteItemByID(field: Pick<T, "id">): Promise<boolean> {
    const index = this.items.findIndex((item) => field.id === item.id);
    if (index !== -1) {
      this.items.filter((item) => item.id !== field.id);
      console.log(`Item with id: ${field.id} is successfully deleted!`);
      this.deletedItems++;
      return true;
    } else {
      console.log(`There's no item with ID: ${field.id}`);
      return false;
    }
  }

  async findItemsByFilter(fields: Partial<T>): Promise<T[]> {
    const filteredItems = this.items.filter((item) => {
      for (const key in fields) {
        if (fields[key] !== item[key]) return false;
      }
      return true;
    });
    return filteredItems;
  }
}

export enum Gender {
  FEMALE = 1,
  MALE = 2,
}

type userModel = {
  id: number;
  name: string;
  email: string;
  gender?: Gender;
  age?: number;
};

export class UserRepo extends BaseRepository<userModel> {
  private createdUsers: number = 0;

  constructor() {
    const staticData: userModel[] = [
      { id: 1, name: "Ala'", email: "ala@gmail.com", gender: Gender.FEMALE },
      { id: 2, name: "Ayman", email: "ayman@gmail.com", gender: Gender.MALE },
      { id: 3, name: "Jood", email: "sara@gmail.com", gender: Gender.MALE },
    ];
    super(staticData);
  }

  getFemales() {
    return this.getItems().filter((item) => item.gender === Gender.FEMALE);
  }

  getMales() {
    return this.getItems().filter((item) => item.gender === Gender.MALE);
  }

  // OR
  findByGender(gender: Gender) {
    return this.getItems().filter((item) => item.gender === gender);
  }
}

export enum Departments {
  PROGRAMMING = 1,
  OS = 2,
  FRAMEWORK = 3,
  NON_TECH = 4,
}

type courseModel = {
  id: number;
  name: string;
  department: Departments; // I made it as enum since we treat departments in databases as number.
  price: number;
  discount?: number;
};

export class CourseRepo extends BaseRepository<courseModel> {
  constructor() {
    const staticData: courseModel[] = [
      {
        id: 1,
        name: "Java from Zero to Hero",
        department: Departments.PROGRAMMING,
        price: 250,
        discount: 0.2,
      },
      {
        id: 2,
        name: "Mac Commands Essentials",
        department: Departments.OS,
        price: 150,
      },
      {
        id: 3,
        name: "NodeJS from Zero to Hero",
        department: Departments.FRAMEWORK,
        price: 200,
      },
    ];
    super(staticData);
  }

  getCheapestCourses() {
    return [...this.getItems().sort((c1, c2) => c1.price - c2.price)];
  }

  getCoursesWithDiscounts() {
    return this.getItems().filter((item) => item.discount); // I didn't use undefined since the discount value may be 0 which's without meaning.
  }
}

// enum BookingStatus {
//   PENDING = "pending", // No payment yet!
//   DONE = "done", // After payment.
//   CANCELLED = "cancelled",
// }

type bookingModel = {
  id: number;
  userID: number;
  courseID: number;
  BookedAt: Date;
  status: "pending" | "done" | "cancelled";
  cancelledAt?: Date;
};

export class BookingRepo extends BaseRepository<bookingModel> {
  constructor() {
    const staticData: bookingModel[] = [
      {
        id: 1,
        userID: 1,
        courseID: 1,
        BookedAt: new Date(),
        status: "cancelled",
      },
      {
        id: 2,
        userID: 2,
        courseID: 3,
        BookedAt: new Date(),
        status: "pending",
      },
      {
        id: 3,
        userID: 3,
        courseID: 2,
        BookedAt: new Date(),
        status: "done",
        cancelledAt: new Date(),
      },
    ];
    super(staticData);
  }

  coursesBookedByUser(userID: number) {
    return this.getItems()
      .filter((item) => item.userID === userID)
      .map((item) => item.courseID);
  }

  usersBookedSpecificCourse(courseID: number) {
    return this.getItems()
      .filter((item) => item.courseID === courseID)
      .map((item) => item.userID);
  }

  getDoneBookings() {
    return this.getItems().filter((item) => item.status === "done");
  }

  getCancelledBookings() {
    return this.getItems().filter((item) => item.status === "cancelled");
  }
}
