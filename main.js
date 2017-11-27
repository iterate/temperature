var request = new XMLHttpRequest()
request.addEventListener('load', onLoad)
request.open('GET', 'https://temp-5c997.firebaseio.com/temps.json')
request.send()

function onLoad() {
  const data = Object.values(JSON.parse(this.responseText))
    .map(m => ({
      temp: m.temp,
      time: new Date(m.timestamp * 1000),
    }))
    .filter(m => dateFns.getMinutes(m.time) % 10 === 0)
    .filter(m => dateFns.isAfter(m.time, dateFns.subDays(new Date(), 2)))

  chart({
    labels: data.map(m => dateFns.format(m.time, 'HH:mm')),
    data: data.map(m => Number(m.temp)),
  })
}

function chart({ labels, data }) {
  new Chart(document.getElementById('myChart').getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'temp',
          data,
        },
      ],
    },
    options: {},
  })
}
