const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}
var myChart

async function main() {
    //


    let city = document.querySelector('.city').textContent

    // chopper les infos meteo grace a la ville;

    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22ff7c1bde5f7c481e359eb3c079809c&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(json => json)

    console.log(meteo)

    // affichage info page
    displayWeatherInfos(meteo)

}

function displayWeatherInfos(data) {
    const name = data.name
    const temperature = data.main.temp
    const conditions = data.weather[0].main
    const description = data.weather[0].description

    document.querySelector('#ville').textContent = name
    document.querySelector('#temperature').textContent = Math.round(temperature)
    document.querySelector('#conditions').textContent = description

    document.querySelector('i.wi').className = weatherIcons[conditions]

    document.body.className = conditions.toLowerCase()
}

const ville = document.querySelector('#ville')

ville.addEventListener('click', () => {
    ville.contentEditable = true
})

ville.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault()
        ville.contentEditable = false
        main()
        myChart.destroy()
        graph()
    }
})

main()



async function graph() {

    let villes = document.querySelector('#ville').textContent

    const prevision = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${villes}&appid=22ff7c1bde5f7c481e359eb3c079809c&lang=fr&units=metric`)
        .then(resultat => resultat.json())
        .then(prevision => {


            console.log(prevision)

            let temp = []
            let time = []

            for (var i = 0; i < prevision.list.length; i++) {
                temp.push(prevision.list[i].dt_txt)
                time.push(prevision.list[i].main.temp)
            }

            console.log(temp)
            console.log(time)

            var ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: temp,
                    datasets: [{
                        label: 'Températures sur les 5 prochains jours',
                        data: time,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        maintainAspectRatio: true,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
}

graph()
