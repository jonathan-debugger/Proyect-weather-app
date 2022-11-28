async function fetchData(query){
    try {
        const response = await fetch(`http://localhost/api%20cities%20world/api_cities.php?city=${query}&limit=15`);
        const data = await response.json();
        return  data;

    } catch (error) {
        console.error(error);

    }
}

async function getCities(name){
    if(name === '' || name == undefined) return "No se han encontrado resultados";    
    // Guardo los datos y filtro los que no son repetidos 
    const cities = await fetchData(name);

    return cities;   
}



export { getCities };