import React, {useEffect, useState} from "react";
import { useRecoilState } from 'recoil';
import { whichDestination, isDesSelected } from "../../recoil/atoms";


const SlotMachine = () => {

    const [mounted, setMounted] = useState(true); // for api call
    const [data, setData] = useState([]);

    // getting the global state to set it to the one the user clicks 
    const [whichDes, setWhichDes] = useRecoilState(whichDestination);
    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);

    const handleClick = (event, id) => {
        setWhichDes(id); 
        console.log(id); 
        setIsSelected(true); 
    }; 

    async function fetchAPI() {
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
                    <span key={index} className={`${d.bankId} slotMachine marker`}
                        style={{ 
                                fontSize: '1.4rem', color: '#F7A072', 
                                left: `${d.x}px`, top: `${d.y}px` 
                            }}
                        onClick={event => handleClick(event, d.bankId)}
                    > 
                        <i class="fa-solid fa-location-pin"></i> 
                    </span>
                )))
                : 'Data not fetched'
            }
        </div>
    )

}

export default SlotMachine
