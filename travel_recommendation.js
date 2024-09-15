const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');


function clearSearch() {
    document.getElementById("searchInput").value = "";
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Please, enter a valid search query';
  }


  function searchInput() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                if(input=='temples' || input=='temple'){
                  data.temples.forEach(temple => {
                  resultDiv.innerHTML +=`
                  <div class=card><p><img src=${temple.imageUrl}></p><p class=title>${temple.name}<span class='link_more'><button class=more>More</button></p><p class=text>${temple.description}</p></div>`
            })
          }

                else if (input == "beaches" || input == "beach"){
                  data.beaches.forEach(beach => {
                  resultDiv.innerHTML +=`
                  <div class=card><p><img src=${beach.imageUrl}></p><p class=title>${beach.name}<span class='link_more'><button class=more>More</button></p><p class=text>${beach.description}</p></div>`
            })
          }


                else if(input == `countries` || input == `country`){
                    data.countries.forEach(country =>{
                    country.cities.forEach(city =>{
                        resultDiv.innerHTML +=`
                        <div class=card><img src=${city.imageUrl}><p class=title>${city.name}<span class='link_more'><button class=more>More</button></p><p class=text>${city.description}</p></div>`
                    })
            })
          }


                else if(input == `japan` || input == `brazil` || input == `australia`){

                  data.countries.forEach(country =>{
                    if(country.name.toLowerCase().includes(input)){
                      country.cities.forEach(city =>{
                        resultDiv.innerHTML +=`
                        <div class=card><p><img src=${city.imageUrl}></p><p class=title>${city.name}<span class='link_more'><button class=more>More</button></p><p class=text>${city.description}</p></div>`
                    })
                  }
                })
              }
                else {
                  resultDiv.innerHTML = 'Keyword or destination not found.';
              }
            })

      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

btnSearch.addEventListener('click', searchInput);
btnClear.addEventListener('click', clearSearch);

