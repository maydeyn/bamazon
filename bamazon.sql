CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT (30) NOT NULL
    auto_increment,
product_name varchar
    (50) NOT NULL,
department_name varchar
    (50) NOT NULL,
price decimal
    (11, 2) NOT NULL,
stock_quantity integer
    (25) NOT NULL,
primary key
    (item_id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Super Smash Bros. Ultimate ", "Nintendo Switch Video Games", 59.99, 12000),
        ("Mario Kart 8 Deluxe", "Nintendo Switch Video Games", 59.00, 12000),
        ("Minecraft", "Nintendo Switch Video Games", 29.49, 12000),
        ("The Legend of Zelda: Breath of the Wild", "Nintendo Switch Video Games", 45.00, 12000),
        ("Super Mario Odyssey", "Nintendo Switch Video Games", 59.99, 12000),
        ("Super Mario Party", "Nintendo Switch Video Games", 59.99, 12000),
        ("Pokemon: Let's Go, Pikachu!", "Nintendo Switch Video Games", 59.99, 12000),
        ("Pokemon: Let's Go, Eevee!", "Nintendo Switch Video Games", 59.99, 12000),
        ("Marvel's Spider-Man", "PS4 Video Games", 39.99, 20000),
        ("Witcher 3", "PS4 Video Games", 19.99, 20000);