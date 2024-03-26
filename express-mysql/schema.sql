CREATE DATABASE starproduct ;

USE starproduct;

CREATE TABLE Users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_no VARCHAR(45) NOT NULL
);

CREATE TABLE Products (
    product_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    description TEXT
);

create table Orders(
order_id int unsigned auto_increment primary key,
quantity int,
order_date date, 
product_id int unsigned ,
user_id int unsigned,
foreign key (product_id) references Products (product_id),
foreign key (user_id) references Users (user_id)
)


-- CREATE TABLE Orders (
--     order_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--     product_id INT,
--     user_id INT ,
--     quantity INT,
--     order_date DATE,
--     FOREIGN KEY (product_id) REFERENCES Products (product_id),
--     FOREIGN KEY (user_id) REFERENCES Users (user_id)
-- );