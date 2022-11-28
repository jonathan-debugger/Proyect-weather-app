/*Plugin para incluir contenido html sin la necesidad de 
  usar lenguajes del lado del servidor como php, python, node etc*/
  
document.addEventListener('DOMContentLoaded',(e)=>{

     async function includeHtml(element,URL){
            try {
                let headerHTML = await fetch(URL,{
                    headers:{ 
                        'Content-type':'text/html;charset=utf-8'
                    }
                });  //Obtenemos la respuesta
                    headerHTML = await headerHTML.text();
                    //Reemplazamos el elemento
                    element.outerHTML = headerHTML;
                         
            } catch(error)  {
                    console.error(`Error al cargar el archivo, verifica que estes
                     haciendo la petición por http o https`,error)

            }
    
    }

    /*Selecciona todos las ocurrencias y ejecuta la funcion includeHtml*/
    document
    .querySelectorAll('[data-include]')
    .forEach(
        (element)=>includeHtml(element, element.getAttribute('data-include'))
         );    
});

