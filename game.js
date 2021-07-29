const rootBody = document.querySelector(".root"),
  btn = document.getElementById("butt");

btn.addEventListener("click", () => {
  rootBody.innerHTML = "";
  runGame();
});

function runGame() {
  // This is in the questions, asked value
  const consumptionPerKm = 2,
    minStep = 0,
    maxStep = 6,
    initialPetrol = 50,
    pumpsCount = 6,
    refillAmount = 30,
    startLocation = 0,
    endLocation = 100,
    petrolPumpLocations = getRandomIntegers(
      pumpsCount,
      startLocation,
      endLocation
    ).sort();

  // These represent the state at any given time
  let position = startLocation,
    petrol = initialPetrol,
    move = 0;
  logStr(`Game started\nPetrol pumps generated at ${petrolPumpLocations}\n`);

  if (isAtPump()) {
    petrol += refillAmount; // If there's a pump at the start
  }

  logState();

  // While we've not reached our destination and still have petrol
  while (position < endLocation && petrol > 0) {
    // Calculate some metrics for this step
    const amountPetrol = petrol / consumptionPerKm,
      remainingDistance = endLocation - position,
      maxDistance = Math.min(amountPetrol, remainingDistance, maxStep),
      stepDistance = getRandomInteger(minStep, maxDistance),
      stepConsumption = stepDistance * consumptionPerKm;

    // Adjust the state accordingly
    position += stepDistance;
    petrol -= stepConsumption;
    move += 1;
    if (isAtPump()) {
      petrol += refillAmount;
    }
    logState();
  }

  if (position === endLocation) {
    logStr("You've reached your destination! 🌋");
  } else {
    logStr("Game Over 🚩");
  }

  function isAtPump() {
    return petrolPumpLocations.includes(position);
  }

  function logState() {
    let str = `Move ${move}\t -  car at ${position}km,  \tpetrol remaining ${petrol}L`;

    logStr(str);
  }
}

// Random integer function Generator
function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomIntegers(n, min, max) {
  const res = [];

  while (res.length !== n) {
    const value = getRandomInteger(min, max);
    if (!res.includes(value)) {
      res.push(value);
    }
  }

  return res;
}

function logStr(str) {
  rootBody.innerHTML += "\n" + str;
}
