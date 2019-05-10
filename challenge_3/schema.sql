DROP DATABASE IF EXISTS Checkout;
CREATE DATABASE Checkout;
USE Checkout;

CREATE TABLE info(
id smallint key auto_increment not null,
name varchar(255) not null,
email varchar(255) not null,
pass varchar(255), 
SA1 varchar(255),
SA2 varchar(255),
City varchar(255),
State varchar(255),
Zip int, 
Phone varchar(255),
cc int,
exp int,
CCV int,
BillingZip int);
