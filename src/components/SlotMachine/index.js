import React, { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { gameName, isDesSelected, gameSearched } from "../../recoil/atoms";


const SlotMachine = ({ requestPath, sizeOfImg }) => {

    const [mounted, setMounted] = useState(true); // for api call
    const [data, setData] = useState([]);

    // getting the global state to set it to the one the user clicks 
    const [name, setName] = useRecoilState(gameName);
    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    const [searchKeyword, _] = useRecoilState(gameSearched);

    const handleClick = (event, d) => {
        setName(d);
        setIsSelected(true);
    };

    async function fetchAPI() {
        const response = await fetch('https://mdpcasinoapi.azurewebsites.net/api/banks');
        const fetchedData = await response.json();
        if (!response.ok) {
            return response.statusText;
        }
        return fetchedData;
    }

    useEffect(() => {
        console.log("fetching data...");
        fetchAPI()
            .then((fetchedData) => {
                setData(fetchedData);
                console.log(fetchedData);
                setMounted(true);
            })
            .catch((error => {
                console.log(error);
            }));
    }, []);


    return (
        <div>
            {mounted ?
                (data.map((d, index) => (
                    (d.description.toLowerCase() === searchKeyword.toLowerCase()) || (searchKeyword === 'all') ?
                        <span key={index} className={`${d.bankId} slotMachine marker`}
                            style={{
                                fontSize: '1.4rem', color: '#F7A072',
                                left: `${d.x / 638 * sizeOfImg[0]}px`, top: `${d.y / 668 * sizeOfImg[1]}px`
                            }}
                            onClick={event => { handleClick(event, d.description); requestPath(event, d.x, d.y) }}
                        >
                            <i className="fa-solid fa-location-pin"> </i>
                        </span>
                        : <></>
                )))
                : 'Data not fetched'
            }
        </div>
    )

}

export default SlotMachine
