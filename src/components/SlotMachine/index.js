import React, {useEffect, useState} from "react";

const SlotMachine = () => {

    const [mounted, setMounted] = useState(true); // for api call
    const [data, setData] = useState([]);

    async function fetchAPI() {
        // const response = await fetch('https://cors-anywhere.herokuapp.com/https://mdpcasinoapi.azurewebsites.net/api/banks');
        const response = await fetch('https://mdpcasinoapi.azurewebsites.net/api/banks');
        const fetchedData = await response.json();
        if(!response.ok){
            return response.statusText; 
        }
        return fetchedData;
    }

    useEffect(() =>{
        console.log("fetching data..."); 
        fetchAPI()
            .then((fetchedData) => {
                setData(fetchedData); 
                console.log(data);  
                setMounted(true); 
            })
            .catch((error => {
                console.log(error); 
            }));
    },[]); 


    return (
        <div>
            {mounted ? 
                (data.map((d, index) => (
                    <span key={index} className="slotMachine marker"
                        style={{ left: `${d.x}px`, top: `${d.y}px`, color: '#F7A072' }}
                    > 
                        <i class="fa-solid fa-location-dot"></i> 
                    </span>
                )))
                : 'Data not fetched'
            }
        </div>
    )

}

export default SlotMachine
