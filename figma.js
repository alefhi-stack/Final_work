document.addEventListener("DOMContentLoaded", () => {

  // ---------- Adafruit IO Setup ----------
  const username = "sach69130"; 
  const activeKey = "aio_YRrZ11xBshdRqHS2IxRMIBR54znC"; 
  const IO = new AdafruitIO(username, activeKey);

  // ---------- Rafraîchir la température ----------
  const delayBetweenRequest = 5000; // toutes les 5 secondes

  setInterval(() => {
    IO.getData("temperature", data => {

      // On récupère la dernière valeur du feed "temperature"
      const temp = parseFloat(data.json[0].value);

      console.log(` Température actuelle : ${temp}°C`);

      // Met à jour le texte de ton h2
      const tempDisplay = document.getElementById("temperature");
      tempDisplay.textContent = `${temp}°`;

      // Change la couleur selon la température
      //const circle = document.querySelector(".circle");
      //if (temp < 15) circle.style.backgroundColor = "#0072ff";  // froid
      //else if (temp < 25) circle.style.backgroundColor = "#00c853"; // normal
      //else circle.style.backgroundColor = "#ff5252"; // chaud
    });
  }, delayBetweenRequest);

  // ---------- Contrôle manuel (facultatif) ----------
  let tempValue = 21;

  const tempDisplay = document.getElementById("temperature");
  const increaseBtn = document.getElementById("increaseTemp");
  const decreaseBtn = document.getElementById("decreaseTemp");

  increaseBtn.addEventListener("click", () => {
    tempValue++;
    tempDisplay.textContent = `${tempValue}°`;
    IO.postData("temperature", tempValue); // envoie sur Adafruit
  });

  decreaseBtn.addEventListener("click", () => {
    tempValue--;
    tempDisplay.textContent = `${tempValue}°`;
    IO.postData("temperature", tempValue); // envoie sur Adafruit
  });
});
