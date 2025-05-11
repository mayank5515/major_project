interface SensorDataCardsProps {
  data: {
    pm25: number
    pm10: number
    o3: number
    no2: number
    so2: number
    co: number
  }
}

export default function SensorDataCards({ data }: SensorDataCardsProps) {
  const sensors = [
    { label: "PM2.5", value: data.pm25, unit: "μg/m³", description: "Fine particulate matter" },
    { label: "PM10", value: data.pm10, unit: "μg/m³", description: "Coarse particulate matter" },
    // { label: "O₃", value: data.o3, unit: "ppb", description: "Ozone" },
    { label: "NO₂", value: data.no2, unit: "ppb", description: "Nitrogen dioxide" },
    { label: "SO₂", value: data.so2, unit: "ppb", description: "Sulfur dioxide" },
    { label: "CO", value: data.co, unit: "ppm", description: "Carbon monoxide" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {sensors.map((sensor, index) => (
        <div key={index} className="p-4 rounded-lg border bg-card">
          <div className="text-sm text-muted-foreground">{sensor.description}</div>
          <div className="text-2xl font-bold mt-1">{sensor.value}</div>
          <div className="flex items-baseline gap-1">
            <div className="text-lg font-medium">{sensor.label}</div>
            <div className="text-sm text-muted-foreground">{sensor.unit}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
