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
                // console.log("view all roles")
                viewAllRoles()
            }
            else if (answer.Action == "view all employees") {
                // console.log("view all employees")
                viewAllEmployees()
            }
            else if (answer.Action == "add a department") {
                // console.log("add  department")
                addDepartment()
            }
            else if (answer.Action == "add a role") {
                // console.log("add a role")
                addRole()
            }
            else if (answer.Action == "add an employee") {
                // console.log("add an employee")
                addEmployee()

            }
            else if (answer.Action == "update an employee role") {
                // console.log("update an employee role")
                updateEmployeeRole()
                

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
function viewAllRoles() {
    db.query("SELECT * FROM roles;", (err, data) => {
        if (err) {
            console.log(err)
        }

        console.table(data);
        askAction();
    }) 
}


// function for viewAllEmployees
function viewAllEmployees() {
    db.query("SELECT * FROM employees;", (err, data) => {
        if (err) {
            console.log(err)
        }

        console.table(data);
        askAction();
    })
}



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
function addRole () {
    inquirer.prompt([
    //   {  
    //     type: "input",
    //     message: "What is the id of this role?",
    //     name: "role_id"
    //   },
      
      {
        type: "input",
        message: "What is the title of this role?",
        name: "role_title",
      
      },

      {
        type: "input",
        message: "What is the salary of this role?",
        name: "role_salary",
     
      },

      {
        type: "input",
        message: "Which department does the role belong to?",
        name: "role_id",
  
      }

     
    ])
    .then((answer) => {
        console.log(answer);

        db.query("INSERT INTO roles (title, salary, id) VALUES (?, ?, ?)", [answer.role_title, answer.role_salary, answer.role_Id], (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully added new role!");
                askAction()
            }
        })

    })
}





//function for addEmployee
function addEmployee () {
    inquirer.prompt([
        // {
        //     type: "input",
        //     message: "What is the id of this employee?",
        //     name: "employee_id"
        // },

        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employee_firstname"
        },

        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employee_lastname"
        },

        {
            type: "list",
            message: "What is the employee's role?",
            name: "employee_role",
            choices: 
            [{value:1, name:'Sales lead'},
            {value:2, name:'Salesperson'},
            {value:3, name:'Lead Engineer'},
            {value:4, name:'Software Engineer'},
            {value:5, name: 'Accountant'},
            {value:6, name: 'Legal Team Lead'},
            {value:7, name: 'Lawyer'}
        ],
        },
        
        {
            type: "list",
            message: "What is the employee's manager?",
            name: "employee_manager",
            choices: [
                {value:1, name:'Jane Doe'},
                {value:3, name:'Michelle Gonzalez'},
                {value:5, name:'Mike Curly'},
                {value:7, name: 'Jose Alvarez'}
            ]
        }
    ])
    .then((answer) => {
        console.log(answer);

        db.query("INSERT INTO employees (firstname, lastname, roleId, managerId) VALUES (?, ?, ?, ?)", [answer.employee_firstname, answer.employee_lastname, answer.employee_role, answer.employee_manager], (err, data) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully added new employee!");
                askAction()
            }
        })

    })
}


// function update employee role
function updateEmployeeRole () {
    db.promise().query("SELECT * from roles").then(([rows]) => {
        const roles = rows.map(({ id, title }) => ({ name: title, value: id }))

        db.promise().query("SELECT * from employees").then(([rows]) => {
            const empNameList = rows.map(({ id, firstName, lastName }) => ({ name: firstName + " " + lastName, value: id }));
    
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "EmpNameRoleUpdate",
            choices: empNameList 
        },

        {
            type: "list",
            message: "Choose the role ID to assign to employer",
            name: "roleUpdate",
            choices: roles
        }

       
    ])
    .then((res) => {
        db.promise().query("UPDATE employees SET roleId = ? WHERE id = ?", [res.roleUpdate, res.EmpNameRoleUpdate])
            .then(() => {
                console.log("New role successfully added!")
                askAction()

            })

            })

            });

        })

    }

    
            
askAction()