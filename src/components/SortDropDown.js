export default function SortDropDown(props){

    const handleOptionSelect = (key, order) => {
        console.log("Selected Option:", key);
        props.sortByKey(key, order);
    };

    return(
        <div>      
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-500 dark:hover:bg-gray-600" type="button">Sort <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>
            <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a href="#" 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" 
                    onClick={() => handleOptionSelect("date", "ascending")}>Date: Ascending</a>
                  </li>
                  <li>
                    <a href="#" 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleOptionSelect("date", "descending")}
                    >Date: Descending</a>
                  </li>
                  <li>
                    <a href="#" 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleOptionSelect("revenue", "ascending")}
                    >Revenue: Ascending</a>
                  </li>
                  <li>
                    <a href="#" 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleOptionSelect("revenue", "descending")}
                    >Revenue: Descending</a>
                  </li>
                  <li>
                    <a href="#" 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleOptionSelect("netIncome", "ascending")}
                    >Net Income: Ascending</a>
                  </li>
                  <li>
                    <a href="#" 
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleOptionSelect("netIncome", "descending")}
                    >Net Income: Descending</a>
                  </li>
                </ul>
            </div>
        </div>
    );
}