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

function userStart() {
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
    console.log(table.toString());
  });
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
      for (var i = 0; i < res.length; i++) {
        if (stockItemID === userItemID) {
          var purchasedItem = res[i];
          console.log(
            "There are " +
              purchasedItem.stock_quantity +
              " of " +
              purchasedItem.product_name +
              "left in stock!"
          );
          userInput();
        } else {
          console.log("Sorry! We cannot find the item you entered.");
          restart();
        }
      }
    });
}
function userInput() {
  inquirer.prompt([
    {
      name: "quantity",
      type: "input",
      message: "How many units of the product would you like to purphase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("\nPlease enter a valid number!");
        return false;
      }
    }
  ]);
  var userQuantity = parseInt(user.quantity);
  var stock = res.stock_quantity;
  if (userQuantity > stock) {
    console.log("Insufficient quantity in stock! Sorry!");
    restart();
  } else {
    connection.query("UPDATE Products SET ? WHERE ?", [
      { StockQuantity: stock - userQuantity },
      { ItemID: userItemID }
    ]),
      console.log("Your order has been placed!");
    restart();
  }
}

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

userStart();
