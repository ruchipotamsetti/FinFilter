
export default function FilterByRange({ fromPlaceholder, toPlaceholder, fromValue, toValue, onFilter, handleClick, handleRestore }){
    return(
        <div>
            <input 
                class="border rounded ml-2 mr-3" 
                type="text" 
                placeholder={fromPlaceholder} 
                value={fromValue}
                onChange={(e) => onFilter('from', e.target.value)}
            />
            <input 
                class="border rounded ml-2 mr-3" 
                type="text" 
                placeholder={toPlaceholder} 
                value={toValue}
                onChange={(e) => onFilter('to', e.target.value)}
            />
            <button className="border rounded p-1 mr-3" onClick={() => {handleClick();}}>Filter</button>
            <button className="border rounded p-1" onClick={() => {handleRestore();}}>Restore</button>
        </div>
    );
}