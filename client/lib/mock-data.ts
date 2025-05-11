export function generateMockData(count: number) {
  const data = []
  const now = new Date()

  // Delhi coordinates
  const delhiCoordinates = {
    latitude: 28.6139,
    longitude: 77.209,
  }

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now)
    timestamp.setHours(timestamp.getHours() - (count - i - 1))

    // Generate a somewhat realistic AQI that fluctuates
    const baseAQI = 80 // Moderate level as base
    const fluctuation = Math.sin(i / 3) * 30 // Sine wave fluctuation
    const randomness = Math.random() * 20 - 10 // Random component
    const aqi = Math.max(0, Math.min(500, Math.round(baseAQI + fluctuation + randomness)))

    // Generate sensor data
    const pm25 = Math.round(aqi * 0.4 + Math.random() * 10)
    const pm10 = Math.round(aqi * 0.6 + Math.random() * 15)
    const o3 = Math.round(20 + Math.random() * 40)
    const no2 = Math.round(10 + Math.random() * 30)
    const so2 = Math.round(5 + Math.random() * 15)
    const co = (0.5 + Math.random() * 1.5).toFixed(1)

    // Generate temperature and humidity
    const temperature = Math.round(22 + Math.sin(i / 6) * 5 + Math.random() * 2)
    const humidity = Math.round(50 + Math.sin(i / 8) * 15 + Math.random() * 5)

    // Add small random variation to coordinates
    const coordinates = {
      latitude: delhiCoordinates.latitude + (Math.random() * 0.02 - 0.01),
      longitude: delhiCoordinates.longitude + (Math.random() * 0.02 - 0.01),
    }

    data.push({
      timestamp: timestamp.toISOString(),
      aqi,
      pm25,
      pm10,
      o3,
      no2,
      so2,
      co: Number.parseFloat(co),
      temperature,
      humidity,
      location: "Delhi (Central)",
      coordinates,
    })
  }

  return data
}

export function generateForecastedData() {
  const now = new Date()
  const delhiLocations = ["Delhi (Central)", "Connaught Place", "Nehru Place", "Dwarka", "Rohini", "Noida", "Gurgaon"]

  const data = []

  // Generate forecasted data for each location
  for (const location of delhiLocations) {
    // Base AQI varies by location
    let baseAQI
    switch (location) {
      case "Connaught Place":
        baseAQI = 95
        break
      case "Nehru Place":
        baseAQI = 110
        break
      case "Dwarka":
        baseAQI = 85
        break
      case "Rohini":
        baseAQI = 120
        break
      case "Noida":
        baseAQI = 130
        break
      case "Gurgaon":
        baseAQI = 105
        break
      default:
        baseAQI = 100
    }

    // Generate 6 hours of forecasted data
    for (let i = 0; i < 6; i++) {
      const timestamp = new Date(now)
      timestamp.setHours(timestamp.getHours() + i + 1)

      // Add some variation to the AQI
      const variation = Math.sin(i / 2) * 15 + (Math.random() * 20 - 10)
      const aqi = Math.max(0, Math.min(500, Math.round(baseAQI + variation)))

      data.push({
        aqi,
        timestamp: timestamp.toISOString(),
        formattedTime: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        location,
        forecasted: true,
      })
    }
  }

  return data
}
