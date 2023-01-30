let API_KEY = "a532be6579fad34b6ef731237484aaaa";
const form = document.querySelector("form");
const input = document.querySelector("form input");
const dateNow = document.querySelector(".date");
const body = document.querySelector("body");

console.log(form);

form.addEventListener("submit", (e) => {
  console.log(e.target);
  e.preventDefault();
  weatherApp(input.value);

  form.reset();
});

const weatherApp = (val) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${API_KEY}&units=metric&lang=tr`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const {
        main: { temp },
        weather: [{ description, icon, main }],
        name,
        sys: { country },
      } = data;

      console.log(name);
      // const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;
      const divCard = document.querySelector("#card-div");
      console.log(icon);
      body.style.backgroundImage = `url(./img/${icon}.jpg)`;
      divCard.innerHTML = `
            <div class="card col-4 text-center">
                     <h3 class="card-text"><span>${name.toUpperCase()}</span></h3>
                 
                     <p class="temp d-flex aling-item-center justify-content-center">${Math.floor(
                       temp
                     )}
                     <span>°C</span>
                     </p>
                     
                     <p class="desc">${description.toUpperCase()}</p>
                     <p clas="url"><img src=${iconUrl} class="img" width="45px" alt="..."></p>
              
            </div>`;
    })
    .catch((err) => console.log(err));
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const dates = time.getDate();
  const day = time.getDay();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  dateNow.innerHTML =
    days[day] +
    ", " +
    dates +
    " " +
    months[month] +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
}, 1000);
