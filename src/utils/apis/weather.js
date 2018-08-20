
export async function getWeather (latitude, longitude) {
  const res = await fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(${latitude}, ${longitude})%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
  const result = await res.json()
  return result.query.results.channel
}

export async function getLocation () {
  const res = await fetch('http://ip-api.com/json')
  const { lat, lon } = await res.json()
  return { latitude: lat, longitude: lon }
}
