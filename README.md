# E-Commerce website

Welcome to my E-Commerce project! This repository contains the back-end component of my online store built using React, JavaScript, Bootstrap, CSS, HTML, and Express.js.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Overview

This project provides a comprehensive solution for e-commerce websites. The front-end is developed using React, while the back-end is built with Express.js. The combination of these frameworks allows a seamless and responsive user experience for both customers and admins.
Express.js back-end is connected to a SQL database using the Sequelize Object-Relational Mapping (ORM) MySQL.

## Features

- **User Authentication**: Secure user authentication and authorization to ensure a personalized shopping experience.
- **Product Catalog**: Display a variety of products with a short describtion, price and image.
- **Product Page**: Display product features with detailed information and images.
- **Shopping Cart**: Allow users to add and remove items from their shopping cart.
- **Wishlist**: Allow users to add and remove items from their wishlist.
- **Checkout Process**: Smooth and intuitive checkout process with order summary and delivery details.
- **Admin Dashboard**: Admin panel to manage products, reviews, messages and user accounts.

## Installation

### Back-end (Express.js)

1. Clone the repository:

   ```bash
   git clone https://github.com/KatieCod/e-commerce-website_BE.git

2. Navigate to the front-end directory:

   cd e-commerce-website_FE

3. Set up the database and configure environment variables:

For the purpose of checking, you could create a 'products' table:

  'CREATE TABLE `products` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(60) NOT NULL,
    `stock` int NOT NULL,
    `unit_price` int NOT NULL,
    `volume` int NOT NULL,
    `expiration_date` date NOT NULL,
    `origin_country` varchar(45) NOT NULL,
    `ingredients` varchar(2083) NOT NULL,
    `ranking` smallint DEFAULT NULL,
    `brand` varchar(45) NOT NULL,
    `description` varchar(2083) NOT NULL,
    `main_photo` varchar(2083) NOT NULL,
    `featured` tinyint NOT NULL DEFAULT ''0'',
    `category` varchar(60) DEFAULT NULL,
    PRIMARY KEY (`id`)
  )

4. Install dependencies:

   npm install

5. Start the server:

   npm start

## Usage

1. Open your web browser and go to http://localhost:3000 to access the front-end.

2. The back-end API is available at http://localhost:3100.

## Folder Structure

### e-commerce-website_FE/

|-- bin/  
|-- data_manager/  
|-- node_modules/  
|-- public/  
|-- routs/  
|-- views/  
|-- gitignor  
|-- app.js  
|-- package-lock.json  
|-- package.json  
|-- README.md  
