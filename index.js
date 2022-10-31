//Main
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Addicted93!",
    database: "employee_db1"
})

function askAction () {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "exit"
            ],
            name: "Action"
        }
    ])
        .then((answer) => {
    
            if (answer.Action == "view all departments") {
                // console.log("view all departments")
                viewAllDepartments()
            }
            else if (answer.Action == "view all roles") {
                console.log("view all roles")
            }
            else if (answer.Action == "view all employees") {
                console.log("view all employees")
            }
            else if (answer.Action == "add a department") {
                // console.log("add  department")
                addDepartment()
            }
            else if (answer.Action == "add a role") {
                console.log("add a role")
            }
            else if (answer.Action == "add an employee") {
                console.log("add an employee")
            }
            else if (answer.Action == "update an employee role") {
                console.log("update an employee role")
            } else {
                process.exit(1);
            }
    
        })
}


function viewAllDepartments() {
    // console.log("Get all departments from database and show it as a table!");
    db.query("SELECT * FROM departments;", (err, data) => {

        if (err) {
            console.log(err)
        }

        console.table(data);
        askAction();
    })
}

// function for viewAllRoles


// function for viewAllEmployees



// functions for adding
function addDepartment () {
    inquirer.prompt([
        // {
        //     type: "input",
        //     message: "What is the id of this new department?",
        //     name: "dept_id"
        // },
        {
            type: "input",
            message: "What is the name of this new department?",
            name: "dept_name"
        }
    ])
    .then((answer) => {
        console.log(answer);

        db.query("INSERT INTO departments (name) VALUES (?)", [answer.dept_name], (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully added new department!");
                askAction()
            }
        })

    })
}

// function for addRole



//function for addEmployee





askAction()