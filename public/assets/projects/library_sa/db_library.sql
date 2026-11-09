CREATE TABLE `AUTHOR`  (
  `author_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `biography` longtext NULL,
  PRIMARY KEY (`author_id`)
);

CREATE TABLE `BOOK`  (
  `book_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(20) NULL,
  `author_id` int NULL,
  `publisher_id` int NULL,
  `category_id` int NULL,
  `supplier_id` int NULL,
  `published_year` int NULL,
  `total_copies` int NULL,
  `available_copies` int NULL,
  PRIMARY KEY (`book_id`)
);

CREATE TABLE `CATEGORY`  (
  `category_id` int NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` varchar(255) NULL,
  PRIMARY KEY (`category_id`)
);

CREATE TABLE `FINE`  (
  `fine_id` int NOT NULL,
  `transaction_id` int NULL,
  `amount` decimal(10, 2) NOT NULL,
  `fine_reason` varchar(255) NULL,
  `is_paid` tinyint NULL,
  `paid_date` date NULL,
  PRIMARY KEY (`fine_id`)
);

CREATE TABLE `MEMBER`  (
  `member_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NULL,
  `registration_date` date NULL,
  `member_status` varchar(20) NULL,
  PRIMARY KEY (`member_id`)
);

CREATE TABLE `PUBLISHER`  (
  `publisher_id` int NOT NULL,
  `publisher_name` varchar(150) NOT NULL,
  `contact_email` varchar(100) NULL,
  `contact_phone` varchar(20) NULL,
  PRIMARY KEY (`publisher_id`)
);

CREATE TABLE `RESERVATION`  (
  `reservation_id` int NOT NULL,
  `book_id` int NULL,
  `member_id` int NULL,
  `reservation_date` date NULL,
  `reservation_status` varchar(20) NULL,
  PRIMARY KEY (`reservation_id`)
);

CREATE TABLE `STAFF`  (
  `staff_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `role` varchar(50) NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`staff_id`)
);

CREATE TABLE `SUPPLIER`  (
  `supplier_id` int NOT NULL,
  `supplier_name` varchar(150) NOT NULL,
  `contact_person` varchar(100) NULL,
  `phone` varchar(20) NULL,
  `email` varchar(100) NULL,
  `address` varchar(255) NULL,
  PRIMARY KEY (`supplier_id`)
);

CREATE TABLE `TRANSACTION`  (
  `transaction_id` int NOT NULL,
  `book_id` int NULL,
  `member_id` int NULL,
  `staff_id` int NULL,
  `issue_date` date NULL,
  `due_date` date NOT NULL,
  `return_date` date NULL,
  `transaction_status` varchar(20) NULL,
  PRIMARY KEY (`transaction_id`)
);

ALTER TABLE `BOOK` ADD CONSTRAINT `FK__BOOK__author_id__4AB81AF0` FOREIGN KEY (`author_id`) REFERENCES `AUTHOR` (`author_id`);
ALTER TABLE `BOOK` ADD CONSTRAINT `FK__BOOK__publisher___4BAC3F29` FOREIGN KEY (`publisher_id`) REFERENCES `PUBLISHER` (`publisher_id`);
ALTER TABLE `BOOK` ADD CONSTRAINT `FK__BOOK__category_i__4CA06362` FOREIGN KEY (`category_id`) REFERENCES `CATEGORY` (`category_id`);
ALTER TABLE `BOOK` ADD CONSTRAINT `FK__BOOK__supplier_i__4D94879B` FOREIGN KEY (`supplier_id`) REFERENCES `SUPPLIER` (`supplier_id`);
ALTER TABLE `FINE` ADD CONSTRAINT `FK__FINE__transactio__5DCAEF64` FOREIGN KEY (`transaction_id`) REFERENCES `TRANSACTION` (`transaction_id`);
ALTER TABLE `RESERVATION` ADD CONSTRAINT `FK__RESERVATI__book___59063A47` FOREIGN KEY (`book_id`) REFERENCES `BOOK` (`book_id`);
ALTER TABLE `RESERVATION` ADD CONSTRAINT `FK__RESERVATI__membe__59FA5E80` FOREIGN KEY (`member_id`) REFERENCES `MEMBER` (`member_id`);
ALTER TABLE `TRANSACTION` ADD CONSTRAINT `FK__TRANSACTI__book___52593CB8` FOREIGN KEY (`book_id`) REFERENCES `BOOK` (`book_id`);
ALTER TABLE `TRANSACTION` ADD CONSTRAINT `FK__TRANSACTI__membe__534D60F1` FOREIGN KEY (`member_id`) REFERENCES `MEMBER` (`member_id`);
ALTER TABLE `TRANSACTION` ADD CONSTRAINT `FK__TRANSACTI__staff__5441852A` FOREIGN KEY (`staff_id`) REFERENCES `STAFF` (`staff_id`);

