import React from "react";

export default function SearchBar({value, changeInput}){
    return(
        <div>
            <input type="text" placeholder="Search" value={value} onChange={(e) => changeInput(e.target.value)} />
        </div>
    );
}