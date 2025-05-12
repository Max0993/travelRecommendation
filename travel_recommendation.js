const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', searchCondition);

function searchCondition() {
  const input = document.getElementById('conditionInput').value.trim().toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Clear previous results

  fetch('travel_recommendation_api.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json();
    })
    .then(data => {
      let resultsFound = false;

      // Search countries
      const matchedCountries = data.countries.filter(country =>
        country.name.toLowerCase().includes(input)
      );
      if (matchedCountries.length > 0) {
        resultsFound = true;
        resultDiv.innerHTML += ``;
        matchedCountries.forEach(country => {
          
          country.cities.forEach(city => {
            resultDiv.innerHTML += `
              <div class="card">
                <img src="${city.imageUrl}" alt="${city.name}" style="max-width:400px;">
                <div class="cardd">
                    <h4>${city.name}</h4>
                    <p>${city.description}</p>
                    <button>Visit</button>
                </div>
              </div>
            `;
          });
        });
      }

      // Search temples
      const matchedTemples = data.temples.filter(temple =>
        temple.name.toLowerCase().includes(input)
      );
      if (matchedTemples.length > 0) {
        resultsFound = true;
        resultDiv.innerHTML += `<h2>Matching Temples</h2>`;
        matchedTemples.forEach(temple => {
          resultDiv.innerHTML += `
            <div class="card">
              <h4>${temple.name}</h4>
              <img src="${temple.imageUrl}" alt="${temple.name}" style="max-width:200px;">
              <p>${temple.description}</p>
            </div>
          `;
        });
      }

      // Search beaches
      const matchedBeaches = data.beaches.filter(beach =>
        beach.name.toLowerCase().includes(input)
      );
      if (matchedBeaches.length > 0) {
        resultsFound = true;
        resultDiv.innerHTML += ``;
        matchedBeaches.forEach(beach => {
          resultDiv.innerHTML += `
            <div class="card">
              <h4>${beach.name}</h4>
              <img src="${beach.imageUrl}" alt="${beach.name}" style="max-width:200px;">
              <p>${beach.description}</p>
            </div>
          `;
        });
      }

      if (!resultsFound) {
        resultDiv.innerHTML = 'No matches found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}
