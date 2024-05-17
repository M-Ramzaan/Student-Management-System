import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// Define a student class

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = []; // Initialize an empty array of courses
    this.balance = 100;
  }

  // Enroll student in a course via Method

  enrollCourse(course: string) {
    this.courses.push(course);
  }

  // Method to view student balance

  viewBalance() {
    console.log(chalk.green(`Balance for ${this.name} is $${this.balance}`));
  }

  // Method to pay student fees

  payFees(fees: number) {
    if (fees <= 0) {
      console.log(
        chalk.red(`Invalid fee amount: ${fees}. Please enter a positive value.`)
      );
    } else if (this.balance < fees) {
      console.log(
        chalk.red(
          `Insufficient balance to pay $${fees} fees for ${this.name}. Current balance: $${this.balance}`
        )
      );
    } else {
      this.balance -= fees;
      console.log(
        `${fees} fees paid successfully for ${this.name}.Current balance: $${this.balance}`
      );
    }
  }

  // Method to display student status.

  showStatus() {
    console.log(chalk.green(`ID = ${this.id}`));
    console.log(chalk.green(`Name = ${this.name}`));
    console.log(chalk.green(`Courses = ${this.courses}`));
    console.log(chalk.green(`Balance = ${this.balance}`));
  }
}

// Creating a student manager to manage students

class studentManager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  // Now we are creating a method to add new student
  // Below we use Inheritance means we use above declared class knows as "Super Class" or "Parent Class" properties and methods.

  addStudent(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      `Student ${name} is added successfully. This student ID: ${student.id}`
    );
  }

  // Method to enroll a student in a course

  enrollStudent(studentId: number, studentCourse: string) {
    let student = this.findStudent(studentId);
    if (student) {
      student.enrollCourse(studentCourse);
      console.log(
        `${student.name} is enrolled in ${studentCourse} successfully.`
      );
    }
  }

  // Method to find a student via student id

  findStudent(studentId: number) {
    return this.students.find((std) => std.id === studentId);
  }

  // Method to find a student balance

  viewStudentBalance(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log(
        chalk.red(
          "Sorry student not found. Please check and reenter a correct student id."
        )
      );
    }
  }

  // Method to find a student fees

  payStudentFees(studentId: number, feeAmount: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.payFees(feeAmount);
    } else {
      console.log(
        chalk.red(
          "Sorry student not found. Please check and reenter a correct student id."
        )
      );
    }
  }

  // Method to show student status

  studentStatus(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.showStatus();
    } else {
      console.log(
        chalk.red(
          "Sorry student not found. Please check and reenter a correct student id."
        )
      );
    }
  }
}

//Creating an welcome function

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

async function welcome() {
  let rainbowTitle = chalkAnimation.rainbow(
    `Welcome to Muhammad Ramzan Akram's "Student Management System".`
  );
  await sleep();
  rainbowTitle.stop();
}

await welcome();

// Main function that run our program

async function main() {
  let mainStudent = new studentManager();

  // Creating while loop to make the program running

  while (true) {
    let userInput = await inquirer.prompt([
      {
        name: "input",
        type: "list",
        message: chalk.yellow("Select your desired option from below options."),
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Student Status",
          "Exit",
        ],
      },
    ]);

    // Using if else statement or Switch Case for user choice. Here we use Switch Case for its practice.

    switch (userInput.input) {
      case "Add Student":
        let userInputName = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: chalk.yellow("Enter a Student name."),
          },
        ]);
        mainStudent.addStudent(userInputName.name);
        break;

      case "Enroll Student":
        let userInputEnroll = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: chalk.yellow("Enter a Student ID."),
          },
          {
            name: "course",
            type: "input",
            message: chalk.yellow("Enter a Student Course."),
          },
        ]);
        mainStudent.enrollStudent(
          Number(userInputEnroll.id),
          userInputEnroll.course
        );
        break;

      case "View Student Balance":
        let userInputBalance = await inquirer.prompt([
          {
            name: "studentId",
            type: "input",
            message: chalk.yellow("Enter a Student ID."),
          },
        ]);
        mainStudent.viewStudentBalance(Number(userInputBalance.studentId));
        break;

      case "Pay Fees":
        let userInputFees = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: chalk.yellow("Enter a Student ID."),
          },
          {
            name: "fees",
            type: "input",
            message: chalk.yellow("Enter Fee Amount."),
          },
        ]);
        mainStudent.payStudentFees(
          Number(userInputFees.id),
          Number(userInputFees.fees)
        );
        break;

      case "Show Student Status":
        let userInputStatus = await inquirer.prompt([
          {
            name: "id",
            type: "input",
            message: chalk.yellow("Enter a Student ID."),
          },
        ]);
        mainStudent.studentStatus(Number(userInputStatus.id));
        break;

      case "Exit":
        console.log(chalk.yellow`Exiting....`);
        process.exit();
    }
  }
}

// Calling our main function

main();
