// import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';

function App() {

  return (
    <div className="px-10 md:px-20 lg:px-20 flex flex-col">
      <h1 className="flex justify-center text-4xl md:text-6xl font-extrabold text-gradient bg-gradient-to-r from-blue-500 via-#162055 to-black bg-clip-text text-transparent drop-shadow-lg my-8">
        Fin Filter
      </h1>
      <DataTable />
    </div>
  );
}

export default App;
