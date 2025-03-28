// A toi de jouer pour cette partie :-) Happy coding !
const boutonValider = document.querySelector("#btn");
const inputText = document.querySelector("#cityInput");
const affichageVille = document.querySelector("#city");
const coordoneeGps = document.querySelector("#gps");
const temperature = document.querySelector("#temperature");
const maj = document.querySelector("#details");

boutonValider.addEventListener("click", () => {
  getLocalisation(inputText.value);
});

async function getLocalisation(ville) {
  try {
    const promise = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${ville}&format=json&addressdetails=1&limit=1`
    );
    const data = await promise.json();
    // des fois c'est address.country (exemple : Japon is undefined avec '.city')
    if (data[0].address.city === undefined) {
      affichageVille.innerHTML = `${data[0].address.country}`;
    } else {
      affichageVille.innerHTML = `${data[0].address.city}`;
    }
    maj.innerHTML = "";
    coordoneeGps.innerHTML = `Coordonnées GPS : ${data[0].lat} ${data[0].lon}`;
    const longitude = data[0].lon;
    const latitude = data[0].lat;
    getMeteo(longitude, latitude);
  } catch (error) {
    console.log(error);
    affichageVille.innerHTML = "Ville non trouvée";
    temperature.innerHTML = "";
    coordoneeGps.innerHTML = "";
    maj.innerHTML = "Vérifier le nom de la ville";
  }
}
// getLocalisation(inputText.value);

async function getMeteo(longitude, latitude) {
  const promise = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`
  );
  const dataMeteo = await promise.json();
  console.log(dataMeteo.current.temperature_2m);
  temperature.innerHTML = `${dataMeteo.current.temperature_2m} °C`;
}
