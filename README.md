# React Native Authentication
### Overview
This repository contains a simple React Native app created using Expo that serves as a learning resource for implementing user authentication and securely storing authentication tokens on the device using AsyncStorage.

# Features
1. User registration and login functionality.
2. Secure storage of authentication tokens on the device using AsyncStorage.
3. Navigational components for seamless user experience.
4. Easy-to-follow codebase with comments for learning purposes.

# Technologies Used
1. React Native
2. Expo
3. AsyncStorage
4. React Navigation
5. Firebase

# Getting Started
To run this app on your local machine, follow these steps:

1. Clone this repository to your local machine:
```
git clone git@github.com:suveshmoza/RN-Auth.git
```
2. Change your working directory to the project folder:
```
cd RN-Auth
```
3. Install the dependencies:
```
npm install
```
3. Create a .env file and paste your api key for authentication
```
API_KEY=YourApiKey
```
4.Start the Expo development server:
```
npm run start
```
Use the Expo client on your mobile device or an emulator to scan the QR code displayed in the terminal to open the app.

Implementation Details
1. User authentication is implemented using a simple username and password combination.
2. The authentication token is securely stored on the device using AsyncStorage.
3. React Navigation is used for navigation between screens.
