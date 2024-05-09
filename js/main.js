document.querySelector('button').addEventListener('click', getFetch)

let lat = 0
let lon = 0
let cityName = ''
let currentTemp = 0
let myAppId = 'ENTER APP ID'

function getFetch () {
  const choice = document.querySelector('input').value
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${choice}&limit=1&appid=${myAppId}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      lat = data[0].lat
      lon = data[0].lon
      cityName = data[0].name

      url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${myAppId}`

      fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          currentTemp = Math.round(((data.current.temp - 273.15) * 9) / 5 + 32)
          document.querySelector(
            'h2'
          ).innerText = `The temperature in ${cityName} is ${currentTemp} degrees Fahrenheit.`
        })
        .catch(err => {
          console.log(`error ${err}`)
        })
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}
