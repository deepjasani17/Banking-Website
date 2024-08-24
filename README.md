# Banking Website

## Overview

This is a banking website built with Node.js and MongoDB. It allows users to register, log in, transfer money, see their user credentials and transaction history.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Handlebars.js, CSS, JavaScript
- **Database**: MongoDB

## Features

- **User Registration**: Users can register with their personal details and bank account information.
- **User Login**: Registered users can log in using their username and password.
- **Money Transfer**: Users can transfer money to other users within the same bank.
- **Transaction History**: Users can view their transaction history and credentials.

## Dependencies

- `dotenv`: "^16.4.5"
- `ejs`: "^3.1.9"
- `express`: "^4.18.2"
- `express-session`: "^1.18.0"
- `hbs`: "^4.2.0"
- `intl-tel-input`: "^20.1.0"
- `libphonenumber-js`: "^1.10.58"
- `mongoose`: "^7.6.3"
- `nodemon`: "^3.0.1"

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/banking-website.git
2. Navigate to the project directory:
   ```bash
   cd banking-website
3. Install dependencies:
   ```bash
   npm install
4. Create a `.env` file in the root directory with the following variables:
   ```makefile
   PORT=your_port_number
   DBCONNECT=your_database_connection_URL
5. Start the application:
   ```bash
   npm start
6. Open your browser and visit `http://localhost:PORT_NUM`.

## Usage

1. **Register**: Navigate to the registration page and fill out the form with your personal and bank details.
2. **Log In**: Use your username and password to log in.
3. **Transfer Money**: After logging in, navigate to the transfer page to send money to another user.
4. **View credentials**: Check your registerd user credentials.
5. **View Transactions**: Check your transaction history to view past transactions.
