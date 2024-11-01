
create database react_db_grocery;

use react_db_grocery;

create table Users(id INT AUTO_INCREMENT, username varchar(40),password varchar(40),
usertype varchar(40),
Primary Key(id)
);

Create table CustomerOrders
(
OrderId integer auto_increment,
userName varchar(40),
orderPrice double,
orderName varchar(40),
deliveryAction varchar(40),
creditCardNo varchar(40),
orderedDate varchar(40),
address varchar(100),
Primary key(OrderId,userName)
);

Create table Productdetails
(
id varchar(20),
name varchar(40),
price double,
image varchar(40),
manufacturer varchar(40),
discount double,
available int(40),
onSale int(20),
manufacturerRebate int(20),
category integer,
Primary key(Id,category)
);





'''Productdetails'''
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('F1','Apple',10,'apple.jpg','Jewel',1,1,1,1,1);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('F2','Cherry',7,'cherry.jpg','Jewel',2,1,1,1,1);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('F3','Orange',10,'orange.jpg','Jewel',1,1,1,1,1);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('F4','Pineapple',20,'pineapple.jpg','Jewel',1,1,1,1,1);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('F5','Strawberry',15,'strawberry.jpg','Jewel',1,1,1,1,1);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('F6','Watermelon',12,'watermelon.jpg','Jewel',1,1,1,1,1);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('V1','Broccoli',3,'broccoli.jpg','Costco',1,1,1,1,2);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('V2','Carrot',8,'carrot.png','Jewel',1,1,1,1,2);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('V3','Cauliflower',26,'cauli.jpg','jewel',1,1,1,1,2);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('V4','Spinach',5,'spinach.jpg','jewel',1,1,1,1,2);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('V5','Tomato',10,'tomato.jpg','Jewel',1,1,1,1,2);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('T1','Bourbon',5,'bourbon.jpg','Jewel',1,1,1,1,4);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('T2','Choci',2,'choci.jpg','Jewel',1,1,1,1,4);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('T3','Lolli',1,'lolli.jpg','Jewel',1,1,1,1,4);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('T4','Rice',3,'rice.jpg','Jewel',1,1,1,1,4);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('D1','Cheese',7,'cheese.jpg','Jewel',1,1,1,1,3);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('D2','CoffeMate',3,'coffemate.jpg','Jewel',1,1,1,1,3);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('D3','Curd',2,'curd.jpg','Jewel',1,1,1,1,3);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('D4','Icecream',17,'icecream.jpg','Jewel',1,1,1,1,3);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('D5','Milk',3,'milk.jpg','Jewel',1,1,1,1,3);
INSERT INTO  `react_db_grocery`.`Productdetails` (`id`,`name`,`price`,`image`,`manufacturer`,`discount`,`available`,`onSale`,`manufacturerRebate`,`category`) VALUES ('D6','Yogurt',2,'yogurt.jpg','Jewel',1,1,1,1,3);

```