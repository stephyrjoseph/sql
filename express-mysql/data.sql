use starproduct;

INSERT INTO Users(name,email,address,contact_no) VALUES 
("Arun","arun.com","Malekunnil","56686976"),
("Akshay","akshay.com","Thottathil","68977890"),
("Stephy","stephy.com","Thadathil","3468678");

INSERT INTO Products(name,price,description) VALUES
("eyeliner","900","rush free"),
("parachute oil","200","dandruff free"),
("lakme nailpolish","100","smooth");

INSERT INTO Orders(quantity,order_date,product_id,user_id)VALUES
(2, '2024-03-27', 1, 1),
(1, '2024-03-12', 2, 2),
(3, '2024-03-10', 3, 3);