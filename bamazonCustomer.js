// Pseudo Code
// 1. Set up modules, mySQL connections. Install all NPM packages required for this app.
// 2. Set up table display using cli-table module
// 3. Display all products info as a table as soon as user run this app
// 4. After the data being displayed, ask first for user input to pick a product that they would like to purchase
// 5. If the user entered a valid ID, proceed to step 6
//    - If you user enter invalid ID, console log error and restart the app
// 6. Confirm the users' item ID, then use another user prompt asking for the quantity of product they would like to purchase
// 7. Compare the user input quantity with the inventory quantity, if the demand can be fulfilled, proceed to step 8
//    - If there's insufficient stock for the user, then console log "Insufficient inventory!" and restart the app.
// 8. Tell the user the order has been placed: item ordered + quantity + total price.
// 9. Update the MySQL database:
//    a) matching the item ID first
//    b) substract the user quantity from stock quantity

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

// initiate connection with database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

// set up table format to display information
var table = new Table({
  head: ["ID", "Product", "Department", "Price"],
  colWidths: [5, 45, 30, 8]
});

function dataDisplay() {
  var query = "SELECT * FROM products;";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price
      ]);
    }
    var res = res;
    console.log(table.toString());
    userStart();
  });
}
// generate table for all products
// acquire user first input: product ID
function userStart(res) {
  inquirer
    .prompt([
      {
        name: "purchase",
        type: "input",
        message:
          "Please enter the ID of the product you woud like to purchase: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("\nPlease enter a valid number!");
          return false;
        }
      }
    ])
    .then(function(user) {
      var userItemID = parseInt(user.purchase);
      var stockItemID = res[i].item_id;

      if (stockItemID === userItemID) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "There are " +
              res[i].stock_quantity +
              " of " +
              res[i].product_name +
              "left in stock!"
          );
        }
        inquirer
          .prompt([
            {
              name: "quantity",
              type: "input",
              message:
                "How many units of the product would you like to purphase?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("\nPlease enter a valid number!");
                return false;
              }
            }
          ])
          .then(function(user) {
            var userQuantity = parseInt(user.quantity);
            var stock = res[i].stock_quantity;
            if (userQuantity > stock) {
              console.log("Insufficient quantity in stock! Sorry!");
              restart();
            } else {
              connection.query("UPDATE Products SET ? WHERE ?", [
                { stock_quantity: stock - userQuantity },
                { item_id: userItemID }
              ]),
                console.log("Your order has been placed!");
              restart();
            }
          });
      } else {
        console.log("Sorry! We cannot find the item you entered.");
        restart();
      }
    });

  // acquire second user input: quantity

  // restart the app from beginning
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
dataDisplay();
