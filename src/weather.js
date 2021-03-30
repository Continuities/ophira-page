const fail = () => Math.random() < 0.5;

export const isStormy = async () => {
  const locationResponse = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=15dda296355d4d5c9020dc12b3ea715c')
  if (!locationResponse.ok) {
    return fail();
  }
  const locationData = await locationResponse.json();
  const weatherResponse = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${locationData.city},${locationData.country_code}`, {
    headers: {
      "x-rapidapi-key": "0542d5cc63msh7b6715125f029a9p1e58a8jsnbeb607358c24",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "useQueryString": true
    }
  });
  if (!weatherResponse.ok) {
    return fail();
  }

  const weatherData = await weatherResponse.json();
  const clouds = weatherData?.clouds?.all;
  return clouds == null ? fail() : clouds >= 80;
};