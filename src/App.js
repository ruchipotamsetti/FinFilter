// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [finInfo, setFinInfo] = useState([]);

  useEffect(() => {
    fetch("https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=iTNKjhgjW7Byv4023weEz5wt6zxX4t8S")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setFinInfo(data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  },[]);

  return (
    <hi className="text-3xl font-bold underline flex items-center justify-center h-full">
      Hello World!
    </hi>
  );
}

export default App;
