// controlling states in react for all the components 
// to easily access any data regarless of the hierarchy 
import { atom } from 'recoil';

// to store where the user clicks and 
// to be used by all the componenets 
export const whichDestination = atom({
    key: 'whichDestination', 
    default: 0, 
});


// if the user selects any slot machines 
export const isDesSelected = atom({
    key: 'isDesSelected', 
    default: false, 
});
