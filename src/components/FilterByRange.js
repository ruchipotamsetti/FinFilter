
export default function FilterByRange({ fromPlaceholder, toPlaceholder, fromValue, toValue, onFilter, handleClick, handleRestore }){
    return(
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <input 
                className="border rounded p-2 w-full sm:w-auto" 
                type="text" 
                placeholder={fromPlaceholder} 
                value={fromValue}
                onChange={(e) => onFilter('from', e.target.value)}
            />
            <input 
                className="border rounded p-2 w-full sm:w-auto" 
                type="text" 
                placeholder={toPlaceholder} 
                value={toValue}
                onChange={(e) => onFilter('to', e.target.value)}
            />
            <button 
                className="border rounded p-2 bg-[#162055] text-white hover:bg-[#202b65] w-full sm:w-auto bold"
                onClick={() => handleClick()}
            >
                Filter
            </button>
            <button 
                className="border rounded p-2 bg-gray-500 text-white hover:bg-gray-600 w-full sm:w-auto"
                onClick={() => handleRestore()}
            >
                Restore
            </button>
        </div>
    );
}