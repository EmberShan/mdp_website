export const APIcall = () => {

    //  fetching api using async/await
    const fetchData = async() => {

        const response = await fetch('https://api.api-ninjas.com/v1/cats?name=abyssinian');
        const data = await response.json();

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        console.log(data); 
        return data;
    }

    fetchData(); 

    // error handling 
    fetchData()
        .then(data => {return data;})
        .catch(error => {
            return error.message; 
        });

}; 