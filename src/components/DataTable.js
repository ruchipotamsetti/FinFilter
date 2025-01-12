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
        console.log("Data: ", data);
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

            console.log("FILTERS: ", filters);
            // console.log("finInfo: ", finInfo);
            const result = filteredData.filter((item) => {
                const itemYear = new Date(item.date).getFullYear();
                console.log("itemYear: ", itemYear);
                console.log("fromYear: ", fromYear);
                console.log("toYear: ", toYear);
                console.log(typeof(fromYear));
                return itemYear >= fromYear && itemYear <= toYear;
            });
            console.log("Result: ", result);
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
            console.log("Result: ", result);
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
                console.log("itemRevenue: ", itemRevenue);
                return itemRevenue >= fromRevenue && itemRevenue <= toRevenue;
            });
            console.log("Result Revenue: ", result);
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
        <div class="flex flex-col">
            <h2 className="text-lg font-bold mb-3">Filters:</h2>
            <div className="flex flex-row">
                <p>Filter by Date Range:</p>
                {/* <FilterByRange/> */}
                <FilterByRange
                    label="Date Range"
                    fromPlaceholder="From (e.g., 2021)"
                    toPlaceholder="To (e.g., 2023)"
                    fromValue = {filters.date.from}
                    toValue = {filters.date.to}
                    onFilter={(key, value) => handleFilterChange('date', key, value)}
                    handleClick={filterByDate}
                    handleRestore={() => handleRestore("date")}
                />
            </div>
            <div className="flex flex-row mt-4">
                <p>Filter by Revenue:</p>
                {/* <FilterByRange/> */}
                <FilterByRange
                label="Revenue Range"
                fromPlaceholder="From Revenue"
                toPlaceholder="To Revenue"
                fromValue = {filters.revenue.from}
                toValue = {filters.revenue.to}
                onFilter={(key, value) => handleFilterChange('revenue', key, value)}
                handleClick={filterByRevenue}
                handleRestore={() => handleRestore("revenue")}
                />
            </div>
            <div className="flex flex-row mt-4">
                <p>Filter by Net Income:</p>
                {/* <FilterByRange/> */}
                <FilterByRange
                label="Net Income Range"
                fromPlaceholder="From Net Income"
                toPlaceholder="To Net Income"
                fromValue = {filters.netIncome.from}
                toValue = {filters.netIncome.to}
                onFilter={(key, value) => handleFilterChange('netIncome', key, value)}
                handleClick={filterByNetIncome}
                handleRestore={() => handleRestore("netIncome")}
                />
            </div>
            {/* <div className="mt-6">
                <h2 className="text-lg font-bold">Applied Filters:</h2>
                <pre>{JSON.stringify(filters, null, 2)}</pre>
            </div> */}
            <SortDropDown
                sortByKey={(key, order) => sortByKey(key, order)}
            />
            <div class="flex items-center sm:justify-center ml-2 sm:ml-0 mt-4">
                <table class="w-1 md:w-32 lg:w-full border-separate border border-slate-500">
                    <thead>
                      <tr>
                        <th class="border border-slate-600">Date</th>
                        <th class="border border-slate-600">Revenue</th>
                        <th class="border border-slate-600">Net Income</th>
                        <th class="border border-slate-600">Gross Profit</th>
                        <th class="border border-slate-600">EPS(Earnings Per Share)</th>
                        <th class="border border-slate-600">Operating Income</th>
                      </tr>
                    </thead>
                    <tbody>
                    {filteredData && filteredData.map((row) => (
                        <tr>
                            <td class="border border-slate-700">{row.date}</td>
                            <td class="border border-slate-700">{row.revenue}</td>
                            <td class="border border-slate-700">{row.netIncome}</td>
                            <td class="border border-slate-700">{row.grossProfit}</td>
                            <td class="border border-slate-700">{row.eps}</td>
                            <td class="border border-slate-700">{row.operatingIncome}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}