import { useEffect, useState } from "react";
import FilterByRange from "./FilterByRange";
import SortDropDown from "./SortDropDown";

export default function DataTable(){
    const [finInfo, setFinInfo] = useState([]);
    const [filters, setFilters] = useState({
        date: { from: '', to: '' },
        revenue: { from: '', to: '' },
        netIncome: { from: '', to: '' },
    });
    const [filteredData, setFilteredData] = useState([]);
    const [restoreFlag, setRestoreFlag] = useState(false);

    useEffect(() => {
      fetch("https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=iTNKjhgjW7Byv4023weEz5wt6zxX4t8S")
      .then((response) => response.json())
      .then((data) => {
        setFinInfo(data);
        setFilteredData(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
    },[]);

    useEffect(() => {
        if(restoreFlag === true){
            if (filters.date.from === "" && filters.date.to === "") {
                filterByNetIncome();
                filterByRevenue();
            }
            if (filters.netIncome.from === "" && filters.netIncome.to === "") {
                filterByDate();
                filterByRevenue();
            }
            if (filters.revenue.from === "" && filters.revenue.to === "") {
                filterByDate();
                filterByNetIncome();
            }
        }
        setRestoreFlag(false);
    }, [restoreFlag])

    const handleFilterChange = (type, key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: { ...prevFilters[type], [key]: value },
        }));
    };

    const filterByDate = () => {
        if (filters.date.from && filters.date.to) {
            const fromYear = parseInt(filters.date.from, 10);
            const toYear = parseInt(filters.date.to, 10);
            const result = filteredData.filter((item) => {
                const itemYear = new Date(item.date).getFullYear();
                return itemYear >= fromYear && itemYear <= toYear;
            });
            setFilteredData(result);
        } else {
            setFilteredData(finInfo); // Show all data if no filter is applied
        }
    };

    const filterByNetIncome = () => {
        if(filters.netIncome.from && filters.netIncome.to){
            const fromNetIncome = parseInt(filters.netIncome.from, 10);
            const toNetIncome = parseInt(filters.netIncome.to, 10);

            const result = filteredData.filter((item) => {
                const itemNetIncome = item.netIncome;
                return itemNetIncome >= fromNetIncome && itemNetIncome <= toNetIncome;
            })
            setFilteredData(result);
        }
        else{
            setFilteredData(finInfo); // Show all data if no filter is applied
        }

    }

    const filterByRevenue = () => {
        if(filters.revenue.from && filters.revenue.to){
            const fromRevenue = filters.revenue.from;
            const toRevenue = filters.revenue.to;

            const result = filteredData.filter((item) => {
                const itemRevenue = item.revenue;
                return itemRevenue >= fromRevenue && itemRevenue <= toRevenue;
            });
            setFilteredData(result); 
        }
        else{
            setFilteredData(finInfo);
        }
        
    }

    const handleRestore = (type) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: { from: "", to:"" },
        }));
        setFilteredData(finInfo);
        setRestoreFlag(true);
    }

    const sortByKey = (key, order) => {
    
        const compareFunction = (object1, object2) => {
            let value1 = object1[key];
            let value2 = object2[key];

            // If the key is "date", parse the values into Date objects
            if (key === "date") {
                value1 = new Date(value1);
                value2 = new Date(value2);
            }
    
            if (order === "ascending") {
                if (value1 < value2) return -1;
                if (value1 > value2) return 1;
            } else if (order === "descending") {
                if (value1 < value2) return 1;
                if (value1 > value2) return -1;
            }
            return 0;
        };
    
        const sortedRecords = [...filteredData.sort(compareFunction)];
        setFilteredData(sortedRecords);
    };


    return(
    <div className="flex flex-col space-y-6 mb-5">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
            <div className="flex-1">
              <p className="font-semibold">Filter by Date Range:</p>
              <FilterByRange
                label="Date Range"
                fromPlaceholder="From (e.g., 2021)"
                toPlaceholder="To (e.g., 2023)"
                fromValue={filters.date.from}
                toValue={filters.date.to}
                onFilter={(key, value) => handleFilterChange('date', key, value)}
                handleClick={filterByDate}
                handleRestore={() => handleRestore("date")}
              />
            </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <p className="font-semibold">Filter by Revenue:</p>
            <FilterByRange
              label="Revenue Range"
              fromPlaceholder="From Revenue"
              toPlaceholder="To Revenue"
              fromValue={filters.revenue.from}
              toValue={filters.revenue.to}
              onFilter={(key, value) => handleFilterChange('revenue', key, value)}
              handleClick={filterByRevenue}
              handleRestore={() => handleRestore("revenue")}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <p className="font-semibold">Filter by Net Income:</p>
            <FilterByRange
              label="Net Income Range"
              fromPlaceholder="From Net Income"
              toPlaceholder="To Net Income"
              fromValue={filters.netIncome.from}
              toValue={filters.netIncome.to}
              onFilter={(key, value) => handleFilterChange('netIncome', key, value)}
              handleClick={filterByNetIncome}
              handleRestore={() => handleRestore("netIncome")}
            />
          </div>
        </div>
        <SortDropDown sortByKey={(key, order) => sortByKey(key, order)} />
        <div className="flex items-center sm:justify-center ml-2 sm:ml-0 mt-4">
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-sm shadow-lg rounded-lg">
                <thead className="bg-[#162055] text-white">
                    <tr>
                      <th className="border border-slate-400 p-3 text-left whitespace-normal">Date</th>
                      <th className="border border-slate-400 p-3 text-left whitespace-normal">Revenue</th>
                      <th className="border border-slate-400 p-3 text-left whitespace-normal">Net Income</th>
                      <th className="border border-slate-400 p-3 text-left whitespace-normal">Gross Profit</th>
                      <th className="border border-slate-400 p-3 text-left whitespace-normal">EPS</th>
                      <th className="border border-slate-400 p-3 text-left whitespace-normal">Operating Income</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData &&
                        filteredData.map((row, index) => (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                              } hover:bg-blue-100 transition duration-150`}
                            >
                                <td className="border border-slate-300 p-3 whitespace-normal">{row.date}</td>
                                <td className="border border-slate-300 p-3 whitespace-normal">{row.revenue}</td>
                                <td className="border border-slate-300 p-3 whitespace-normal">{row.netIncome}</td>
                                <td className="border border-slate-300 p-3 whitespace-normal">{row.grossProfit}</td>
                                <td className="border border-slate-300 p-3 whitespace-normal">{row.eps}</td>
                                <td className="border border-slate-300 p-3 whitespace-normal">{row.operatingIncome}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>

    </div>
    );
}