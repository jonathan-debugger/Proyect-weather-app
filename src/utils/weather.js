/*variables*/
const search = document.getElementById('search');
      search.addEventListener('keypress', searchImages);


/*funciones*/

async function fetchData(query){
    try {
        const response = await fetch(`https://spott.p.rapidapi.com/places?type=CITY&limit=10&q=${query}`,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '589963e22fmshf3dc928c0101ed9p1e182ejsne4bfa54016f9',
                'X-RapidAPI-Host': 'spott.p.rapidapi.com'
            }
        });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

