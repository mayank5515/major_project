"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { getAQIColor, getAQICategory } from "@/lib/aqi-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ForecastedAQIProps {
  data: Array<{
    aqi: number
    timestamp: string
    location: string
  }>
}

export default function ForecastedAQI({ data }: ForecastedAQIProps) {
  // console.log('forecasted AQI data', data)

  // { aqi: 105, forecasted: true, formattedTime: "09:04 PM", location: "Delhi (Central)", timestamp: "2025-04-15T15:34:18.084Z" }
  const [selectedLocation, setSelectedLocation] = useState("Delhi (Central)")

  // Filter data for the selected location
  const locationData = data.filter((item) => item.location === selectedLocation)

  // Get unique locations from the data
  const locations = Array.from(new Set(data.map((item) => item.location)))

  // Get the forecasted AQI for the next hour
  const nextHourAQI = locationData[0]?.aqi || 0
  const aqiColor = getAQIColor(nextHourAQI)
  const category = getAQICategory(nextHourAQI)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Select Location</div>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Next Hour</div>
          <div className="text-3xl font-bold" style={{ color: aqiColor }}>
            {nextHourAQI}
          </div>
          <div className="text-sm font-medium" style={{ color: aqiColor }}>
            {category}
          </div>
        </div>
      </div>

      <div className="h-[150px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={locationData}>
            <XAxis dataKey="formattedTime" tick={{ fontSize: 12 }} tickMargin={5} />
            <YAxis domain={[0, 500]} hide />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const aqi = payload[0].value as number
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="font-medium">AQI:</div>
                        <div className="font-bold" style={{ color: getAQIColor(aqi) }}>
                          {aqi}
                        </div>
                        <div className="font-medium">Time:</div>
                        <div>{payload[0].payload.formattedTime}</div>
                        <div className="font-medium">Location:</div>
                        <div>{payload[0].payload.location}</div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              // stroke="var(--primary)"
              stroke="#4f46e5"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-center text-muted-foreground">
        Forecasted values based on ML model prediction for Delhi region
      </div>
    </div>
  )
}
