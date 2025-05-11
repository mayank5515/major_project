import { Clock, MapPin } from "lucide-react"
import { getAQIColor, getAQICategory } from "@/lib/aqi-utils"

interface CurrentAQIProps {
  data: {
    aqi: number
    timestamp: string
    location: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
}

export default function CurrentAQI({ data }: CurrentAQIProps) {
  const { aqi, timestamp, location, coordinates } = data
  const aqiColor = getAQIColor(aqi)
  const category = getAQICategory(aqi)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div
        className="flex items-center justify-center w-32 h-32 rounded-full border-4"
        style={{ borderColor: aqiColor }}
      >
        <div className="text-center">
          <div className="text-4xl font-bold">{aqi}</div>
          <div className="text-sm font-medium" style={{ color: aqiColor }}>
            {category}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          <span>{new Date(timestamp).toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{location}</span>
        </div>
        {coordinates && (
          <div className="flex items-center text-xs">
            <span>
              Lat: {coordinates.latitude.toFixed(4)}, Long: {coordinates.longitude.toFixed(4)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
