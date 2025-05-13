import { Thermometer, Droplets } from "lucide-react"

interface TempHumidityProps {
  data: {
    temperature: number
    humidity: number
  }
}

export default function TempHumidity({ data }: TempHumidityProps) {
  const { temperature, humidity } = data
  // console.log("Temp & Humidity Card Data:", data)

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-muted/50">
        <Thermometer className="h-8 w-8 text-red-500" />
        <div className="text-3xl font-bold">{temperature}°C</div>
        <div className="text-sm text-muted-foreground">Temperature</div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-muted/50">
        <Droplets className="h-8 w-8 text-blue-500" />
        <div className="text-3xl font-bold">{humidity}%</div>
        <div className="text-sm text-muted-foreground">Humidity</div>
      </div>
    </div>
  )
}
