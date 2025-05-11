"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CurrentAQI from "@/components/current-aqi"
import RealTimeGraph from "@/components/real-time-graph"
import HistoricalData from "@/components/historical-data"
import TempHumidity from "@/components/temp-humidity"
import ForecastedAQI from "@/components/forecasted-aqi"
import AQICategories from "@/components/aqi-categories"
import SensorDataCards from "@/components/sensor-data-cards"
import { generateMockData, generateForecastedData } from "@/lib/mock-data"
import { ThemeToggle } from "@/components/theme-toggle"
import AQIComparison from "@/components/aqi-comparison"

export default function Dashboard() {
  const [data, setData] = useState(() => generateMockData(24))
  const [currentData, setCurrentData] = useState(data[data.length - 1])
  const [forecastedData, setForecastedData] = useState(() => generateForecastedData())

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data.slice(1), generateMockData(1)[0]]
      setData(newData)
      setCurrentData(newData[newData.length - 1])
      setForecastedData(generateForecastedData())
    }, 5000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-primary">Air Quality Monitoring System</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Current AQI</CardTitle>
              <CardDescription>Real-time air quality index</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrentAQI data={currentData} />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Temperature & Humidity</CardTitle>
              <CardDescription>Current environmental conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <TempHumidity data={currentData} />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Forecasted AQI</CardTitle>
              <CardDescription>ML model prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastedAQI data={forecastedData} />
            </CardContent>
          </Card>
          {/*  */}
          <Card className="col-span-full lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>AQI Comparison</CardTitle>
              <CardDescription>Real-time vs Forecasted AQI</CardDescription>
            </CardHeader>
            <CardContent>
              <AQIComparison realTimeData={data} forecastedData={forecastedData} />
            </CardContent>
          </Card>
          {/* REAL TIME AQI GRAPH */}
          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <CardTitle>Real-time AQI Graph</CardTitle>
              <CardDescription>Last 24 hours of data</CardDescription>
            </CardHeader>
            <CardContent>
              <RealTimeGraph data={data} />
            </CardContent>
          </Card>
          {/* HISTORICAL DATA GRAPH  */}
          <Card className="col-span-full lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>View past air quality trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="hourly">
                <TabsList className="mb-4">
                  <TabsTrigger value="hourly">Hourly</TabsTrigger>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                </TabsList>
                <TabsContent value="hourly">
                  <HistoricalData data={data} interval="hourly" />
                </TabsContent>
                <TabsContent value="daily">
                  <HistoricalData data={data} interval="daily" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {/* AQI CATEGORIES */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>AQI Categories</CardTitle>
              <CardDescription>Health implications</CardDescription>
            </CardHeader>
            <CardContent>
              <AQICategories currentAQI={currentData.aqi} />
            </CardContent>
          </Card>
          {/* SENSOR DATA CARD -> THIS WILL SHOW REAL TIME SENSOR DATA */}
          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <CardTitle>Sensor Data</CardTitle>
              <CardDescription>Individual pollutant readings</CardDescription>
            </CardHeader>
            <CardContent>
              <SensorDataCards data={currentData} />
            </CardContent>
          </Card>
          {/*  */}
        </div>
      </main>
    </div>
  )
}
