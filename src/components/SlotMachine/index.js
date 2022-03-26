import React, {useEffect, useState} from "react";

const SlotMachine = () => {

    const [mounted, setMounted] = useState(false); // for api call
    const [data, setData] = useState();

    async function fetchAPI() {
        // const response = await fetch('https://cors-anywhere.herokuapp.com/https://mdpcasinoapi.azurewebsites.net/api/banks');
        const response = await fetch('https://mdpcasinoapi.azurewebsites.net/api/banks');
        const text = await response.text();

        if(!response.ok){
            return response.statusText; 
        }

        return text;
    }

    useEffect(() =>{
        console.log("fetching data..."); 
        fetchAPI()
            .then((data) => {
                setData(data); 
                setMounted(true); 
            })
            .catch((error => {
                console.log(error); 
            }));
        console.log(data);  
    },[]); 


    return (
        <div>
            {mounted ? 
                (data.map( (d) => (
                    <span key={d.bankId} className="slotMachine marker"
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
