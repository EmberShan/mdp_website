// controlling states in react for all the components 
// to easily access any data regarless of the hierarchy 
import { atom } from 'recoil';

// to store where the user clicks and 
// to be used by all the componenets 
export const gameName = atom({
    key: 'gameName', 
    default: "null", 
});

// game name selected by the user
export const gameSearched = atom({
    key: 'gameSearched', 
    default: "null", 
});


// if the user selects any slot machines 
export const isDesSelected = atom({
    key: 'isDesSelected', 
    default: false, 
});
