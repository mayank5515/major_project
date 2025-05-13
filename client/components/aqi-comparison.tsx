"use client"

import { Card, CardContent } from "@/components/ui/card"
import { getAQIColor, getAQICategory } from "@/lib/aqi-utils"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

interface AQIComparisonProps {
  realTimeData: {
    aqi: number
    timestamp: string
    location: string
    coordinates?: {
      latitude: number
      longitude: number
    }
  }
  forecastedData: {
    aqi: number
    timestamp: string
    location: string
  }
}

export default function AQIComparison({ realTimeData, forecastedData }: AQIComparisonProps) {
  // Get the latest real-time AQI
  const currentAQI = realTimeData.aqi

  // Get the forecasted AQI for the current time
  const currentForecastedAQI = forecastedData?.aqi || 0
  console.log("Current Forecasted Data: ", forecastedData)
  // Calculate the difference and accuracy
  const difference = currentAQI - currentForecastedAQI
  const percentageDiff = (Math.abs(difference) / currentAQI) * 100
  const accuracy = 100 - Math.min(percentageDiff, 100)

  // Determine if the forecast was under, over, or accurate
  const forecastStatus = difference > 10 ? "under" : difference < -10 ? "over" : "accurate"

  // Get colors for the AQI values
  const realTimeColor = getAQIColor(currentAQI)
  const forecastedColor = getAQIColor(currentForecastedAQI)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Real-time AQI</div>
              <div className="text-4xl font-bold" style={{ color: realTimeColor }}>
                {currentAQI}
              </div>
              <div className="text-sm" style={{ color: realTimeColor }}>
                {getAQICategory(currentAQI)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Forecasted AQI</div>
              <div className="text-4xl font-bold" style={{ color: forecastedColor }}>
                {currentForecastedAQI}
              </div>
              <div className="text-sm" style={{ color: forecastedColor }}>
                {getAQICategory(currentForecastedAQI)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Forecast Accuracy</div>
          <div className="text-sm font-bold">{accuracy.toFixed(1)}%</div>
        </div>

        <div className="w-full bg-background rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full"
            style={{
              width: `${accuracy}%`,
              backgroundColor:
                accuracy > 80 ? "var(--aqi-good)" : accuracy > 60 ? "var(--aqi-moderate)" : "var(--aqi-unhealthy)",
            }}
          ></div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-full bg-background">
            {forecastStatus === "under" ? (
              <ArrowDown className="h-4 w-4 text-red-500" />
            ) : forecastStatus === "over" ? (
              <ArrowUp className="h-4 w-4 text-orange-500" />
            ) : (
              <Minus className="h-4 w-4 text-green-500" />
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {forecastStatus === "under"
              ? "Forecast was lower than actual AQI"
              : forecastStatus === "over"
                ? "Forecast was higher than actual AQI"
                : "Forecast was accurate"}
          </div>
        </div>
      </div>
    </div>
  )
}
