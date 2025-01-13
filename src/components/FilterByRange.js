
export default function FilterByRange({ fromPlaceholder, toPlaceholder, fromValue, toValue, onFilter, handleClick, handleRestore, isDate }){
    let isInvalidRange = parseInt(fromValue) > parseInt(toValue);
    
    return(
        <div>
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
                className={
                    `border rounded p-2 w-full sm:w-auto bold ${isInvalidRange ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-[#162055] text-white hover:bg-[#202b65]'}`
                }
                onClick={() => handleClick()}
                disabled={isInvalidRange}
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
        {isInvalidRange &&
            <p className="text-red-500 text-sm mt-2">The "From" value cannot be greater than the "To" value.</p>
        }
        </div>
    );
}