const container = document.querySelector(".container")
const coffees = [
  { 
    name: "Cafe1", 
    image: "images/coffee1.jpg" 
  },
  { 
    name: "Cafe2", 
    image: "images/coffee2.jpg" 
  },
  { 
    name: "Cafe3", 
    image: "images/coffee3.jpg" 
  },
  { 
    name: "Cafe4", 
    image: "images/coffee4.jpg" 
  },
  { 
    name: " Cafe5", 
    image: "images/coffee5.jpg" 
  },
  { 
    name: " Cafe6", 
    image: "images/coffee6.jpg" 
  },
  { 
    name: "Cafe7", 
    image: "images/coffee7.jpg" 
  },
  { 
    name: "Cafe8", 
    image: "images/coffee8.jpg" 
  },
  { 
    name: "Cafe9", 
    image: "images/coffee9.jpg" 
  }
];

const showCoffees = () => {
  let output = ""
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href="">Taste</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker Registrado"))
      .catch(err => console.log("service worker No Registrado", err));
  });
}
