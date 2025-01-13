# FinFilter - Finance Filters

FinFilter is a React application that allows users to filter and sort financial data for Apple Inc. (AAPL). The app provides an interactive interface to explore annual income statements, including revenue, net income, and other key financial metrics.

# Link to Deployed App
You can access the deployed version of the app at the following link: [Deployed App Link](https://fin-filter.vercel.app/)

## Features
  - Filter financial data by date range, revenue, and net income
  - Sort data by date, revenue, and net income in ascending or descending order
  - Included validations to check the values on given filter ranges
  - Responsive design for optimal viewing on various devices

## Instructions to Run Locally

### Prerequisites
- Ensure that you have the latest version of **Node.js** and **npm** installed on your local machine.
  You can check if you have Node.js and npm installed by running the following commands:
  ```bash
  node -v
  npm -v

### Steps to Run the Project

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/ruchipotamsetti/FinFilter.git
    ```
2. Navigate to the project folder and install the necessary dependencies:
    ```bash
    cd fin-filter
    npm install
    ```
3. Create a .env file in the root directory of the project and add your API key for Financial Modeling Prep:
     ```bash
     REACT_APP_API_KEY=your_api_key_here
     ```
   You can obtain a free API key from [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements) 
4. Start the development server:
    ```bash
    npm run start
    ```
