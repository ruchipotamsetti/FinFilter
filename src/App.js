// import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';

function App() {

  return (
    <div class="px-2 md:px-20 lg:px-20  flex flex-col">
      <hi className="text-3xl font-bold underline flex items-center justify-center h-full">
        Fin Filter  
      </hi>
      <DataTable/>
    </div>
    
  );
}

export default App;
