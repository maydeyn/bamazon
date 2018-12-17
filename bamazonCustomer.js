var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

var table = new Table({
  head: ["ID", "Product", "Department", "Price"],
  colWidths: [5, 45, 30, 8]
});

var query =
  "SELECT item_id, product_name, department_name, price FROM products;";

connection.connect(function(err) {
  if (err) throw err;
  afterConnection();
});

function afterConnection() {
  var query =
    "SELECT item_id, product_name, department_name, price FROM products;";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price
      ]);
    }
    console.log(table.toString());
    userStart();
  });
}

function userStart() {
  inquirer
    .prompt([
      {
        name: "purchase",
        type: "input",
        message:
          "Please enter the ID of the product you woud like to purchase: "
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units of the product would you like to purphase?"
      }
    ])
    .then(function(user) {
      var query = "SELECT item_id FROM products;";
      connection.query(query, function(err, res) {
        var stock = "SELECT stock_quantity FROM products;";
        if (user.quantity > stock) {
          console.log("Insufficient quantity in stock! Sorry!");
          restart();
        }
      });
    });

  function restart() {
    inquirer
      .prompt([
        {
          name: "restart",
          message: "Would you like to buy something else?",
          type: "list",
          choices: ["Yes", "No, Exit."]
        }
      ])
      .then(function(user) {
        if (user.restart === "Yes") {
          userStart();
        } else {
          console.log("Thank you for shopping with us!");
          process.exit();
        }
      });
  }
}
