import { getCities } from './utils/cities.js';

/*Event listernes*/

const search = document.getElementById('search');
	  search.addEventListener('keyup',showCities);	
	  search.addEventListener('focus',showCities);	
	  search.addEventListener('blur',hiddeListCities);

const iconClean = document.querySelector('.fa-circle-xmark');
	  iconClean.addEventListener('click',cleanSearch);	  

const listCities = document.getElementById('list_cities');
	  listCities.addEventListener('mousedown',showCardWeather);

	  //Mostramos los datos si hay guardados
document.addEventListener('DOMContentLoaded',startLocalStorage);	  


/*Funciones*/

/*======================
	 Sección Buscador
========================*/

async function showCities(e){
	const container = document.querySelector('#list_cities ul');
	if(e.target.value==='' 
		|| e.target.value===null && !!container) return; 

	let cities = await getCities(e.target.value);

		cities = cities["data"].map((city)=>{
			const li = document.createElement('li');
					li.textContent = `${city.name} / ${city.country}`;
					li.setAttribute('lat-lng',`${city.lat},${city.lng}`);				  
			
				return li;	
		});	

			container.innerHTML='';
			container.parentElement.style.display='block';	
			container.append(...cities);
}


function hiddeListCities(e){
	const container = e.target.closest('.search_engine')
		.querySelector('#list_cities');
	
	container.style.display = 'none';	
}


/*Card weather*/
async function showCardWeather(e){
	if (e.target.tagName==='LI') {

		const [lat, lng] = e.target.getAttribute('lat-lng').split(',');// Latitud , longitud
	    const data = await fetchData(`${lat},${lng}`);

		//Tomamos el nombre ya que la api weather no devuelve el nombre exacto de la ciudad si no de alguna localidad (barrio) de la misma.	
		const city = e.target.textContent.split('/')[0];
		const card = createCardNode(data,city);

		const card_container = document.querySelector('#container_card .card');
			  card_container.classList.add('card--show');	
			  card_container.outerHTML = card;
			
		//agregamos la data al localstorage
		setLocalStorage(data,city);	
	}

}

/*
	Devuelve la probabilidad de lluvia de milimetros a porcentaje
	valores sacados de:
	https://www.eltiempo.es/noticias/precipitacion-cuando-es-poco-y-cuando-es-mucho
*/

function getProbability(probability){
	switch (true) {
		case probability >= 0.1 && probability <= 2:
			//Débil
			return '20 %';

		case probability >= 2.1 && probability <= 15:
			// Moderado
			return '40 %';
		break;
		case probability >= 15.1 && probability <= 30:
			// Fuerte
			return '60 %';
		break;
		case probability >= 30.1 && probability<=60:
			// Muy fuerte
			return '80 %';
		break;
		case probability >=60:
			// Torrencial
			return '100 %';
		break;

		default:
			return '0 %';
			break;
	}
}

const createCardNode=(data, city)=>{
	const time = new Date();
	let minutes = time.getMinutes().toString().split('');
		minutes = (minutes.length>1)? parseInt(minutes.join('')) : '0'+parseInt(minutes[0]) ;

	const days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

	const card = `
		<div class="card card--show">
			<div class="row">
				<div class="date">
						<data class="city"> 
							<i class="fa-solid fa-location-dot"></i>
							<strong>
								${city} 
								${data.location.region}
							</strong>
						</data>
					<p>	
						${days[time.getDay()]}
						<time date-time="${data.location.localtime.replace(' ','T')}" >
							${((time.getHours() + 11) % 12 + 1)}:${minutes} 
							${time.getHours()>= 12 ? "p.m":"a.m"}
						</time>
					</p>
				</div>
				<div class="degrees">
					<p>
						${data.current.temp_c}
						<span>º</span>
						<span>c</span>
					</p>
				</div>
			</div>
			<div class="row">
				<div class="variables">
					<ul>
						<li class="wind">
							<!--viento-->
							<span>Viento: </span>
							<span>	
								${data.current.wind_kph} km/h
							</span>
						</li>
						<li class="strom">
							<!--Humedad-->
							<span>Humedad: </span>
							<span>
								${data.current.humidity} %
								
							</span>
						</li>
						<li class="rainfall">
							<!-- lluvia probabilidad-->
							<span>Precipitación: </span>
							<span>
								${getProbability(data.current.precip_mm)}
							</span>
						</li>

					</ul>
				</div>

				<div class="weather_img">
					<figure>
						<img src="${data.current.condition.icon}" alt="Clima 2:30 pm cielo despejado">

						<figcaption>
						${data.current.condition.text}
						</figcaption>
					</figure>

				</div>
			</div>
		</div>
	`;

	return card;
}
function cleanSearch(e){

	if(e.target.classList.contains('fa-circle-xmark')){
		document.getElementById('search')
		.value='';
	}
}

async function fetchData(latLng){
	let response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latLng}&days=3&lang=es`,{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '589963e22fmshf3dc928c0101ed9p1e182ejsne4bfa54016f9',
				'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
			}
					
	});

	const data = response.json();
	return data;	

} 

function getLocalStorage(){
	const dataLS = localStorage.getItem('lastWeather');
	return JSON.parse(dataLS);
}

function setLocalStorage(data, city){
		localStorage.setItem('lastWeather',JSON.stringify([data, city.trim()]));
}

function startLocalStorage(){
	const dataLS = getLocalStorage();
	const container = document.querySelector('#container_card .card');
	const p = document.createElement('p');
		  p.textContent = 'Ultima ubicación..';
		  
	if(dataLS!==null){
		
		document.getElementById('container_card')
			.insertBefore(p,container);

		const [data, city] = dataLS;
		const card = createCardNode(data,city);
		
		const card_container = document.querySelector('#container_card .card');	
			  card_container.outerHTML = card;

	}	

}
