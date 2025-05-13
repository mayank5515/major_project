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
import { ThemeToggle } from "@/components/theme-toggle"
import AQIComparison from "@/components/aqi-comparison"
import { getSocket } from "@/utils/socket"
import axios from "axios"
import useGeolocation from "@/utils/useGeolocation"
const myURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:7000";

const fetchCurrentData = async () => {
  try {
    const res = await axios.get(`${myURL}/api/v1/data/latest`);
    const result = res.data;
    // console.log("Data fetched from server:", res.data);
    // setData(result); //OVERALL DATA
    return result;
  }
  catch (err) {
    console.error("Error fetching current data:", err);
    return null;
  }
}
const fetchCurrentForecast = async () => {
  try {
    const res = await axios.get(`${myURL}/api/v1/forecast/lasthour`);
    const result = res.data;
    // console.log("Forecast Current fetched from server:", result);
    // setData(result); //OVERALL DATA
    return result;

  }
  catch (err) {
    console.error("Error fetching current forecast data:", err);
  }
}
const fetchForecastData = async () => {
  try {
    const res = await axios.get(`${myURL}/api/v1/forecast`);
    const result = res.data.data;
    console.log("Forecast fetched from server:", result);
    // setData(result); //OVERALL DATA
    return result;
  }
  catch (err) {
    console.error("Error fetching forecast data:", err);
  }
}
const fetchLast24hourData = async () => {
  try {
    const res = await axios.get(`${myURL}/api/v1/data/last24hours`);
    const result = res.data;
    console.log("Last 24 hour data fetched from server:", result);
    return result;
  }
  catch (err) {
    console.error("Error fetching last 24 hour data:", err);
  }
}
const fetchAllRealTimeData = async () => {
  try {
    const res = await axios.get(`${myURL}/api/v1/data`);
    const result = res.data;
    console.log("All Real Time data fetched from server:", result);
    return result;
  }
  catch (err) {
    console.error("Error fetching all real time data:", err);
  }

}
const fetchHistoricalData = async () => {
  try {
    const res = await axios.get(`${myURL}/api/v1/forecast/dailyMedianAQI`);
    const result = res.data;
    console.log("Historical data fetched from server:", result);
    return result;
  }
  catch (err) {
    console.error("Error fetching historical data:", err);
  }
};
export default function Dashboard() {
  const [data, setData] = useState(() => [])
  const [currentData, setCurrentData] = useState([])
  const [forecastedData, setForecastedData] = useState(() => [])
  const [currentForecast, setCurrentForecast] = useState(() => { });
  const [last24hourData, setLast24hourData] = useState(() => []);
  const [medianData, setMedianData] = useState(() => []);
  const location = useGeolocation();

  console.log("Forecasted Data : ", forecastedData)




  useEffect(() => {
    if (location) {
      console.log("Latitude:", location.lat);
      console.log("Longitude:", location.lng);
    }
    const socket = getSocket();
    console.log("Socket initialized:", socket);
    console.log("Socket URL:", myURL);
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });


    //////////////////////////
    // Fetch historical data

    fetchHistoricalData().then((result) => {
      //THIS IS MEDIAN DATA
      console.log("Historical MEDIAN Data: ", result);
      // Convert daily data into HistoricalData-compatible format
      const dailyFormatted = result.map((item) => ({
        timestamp: new Date(item.date).toISOString(),
        aqi: item.medianAQI,
      }))
      setMedianData(dailyFormatted); // HISTORICAL DATA
    }).catch((err) => {
      console.error("Error fetching historical data:", err);
    })

    ///////////////////////

    ////////////////////
    fetchAllRealTimeData().then((result) => {
      console.log("All Real Time Data: ", result);
      setData(result); // OVERALL DATA
    }).catch((err) => {
      console.error("Error fetching all real time data:", err);
    })
    ////////////////////

    ////////////////////
    fetchCurrentData().then((result) => {
      // console.log("Temp Result: ", result);
      const { aqi, timestamp, temperature, humidity } = result;
      const tempNewData = {
        aqi,
        timestamp,
        temperature,
        humidity,
        location: "Delhi (North-West)",
        coordinates: location ? { latitude: location.lat, longitude: location.lng } : undefined,
      }
      setCurrentData(tempNewData); // CURRENT DATA

    }).catch((err) => {
      console.error("Error fetching tempdata:", err);
    });
    //////////////////////

    //////////////////////
    fetchCurrentForecast().then((result) => {
      console.log("Forecast Result: ", result);
      setCurrentForecast(result); // FORECASTED DATA
    }).catch((err) => {
      console.error("Error fetching forecast data:", err);
    })
    //////////////////////

    fetchForecastData().then((result) => {
      console.log("Forecast Result: ", result);
      setForecastedData(result); // FORECASTED DATA --> ye us Next Hour Forecast vaale card m jaaega
    }).catch((err) => {
      console.error("Error fetching forecast data:", err);
    })

    //////////////////////

    //////////////////////
    fetchLast24hourData().then((result) => {
      console.log("Last 24 hour data Result: ", result);
      setLast24hourData(result); // LAST 24 HOUR DATA

    }).catch((err) => {
      console.error("Error fetching last 24 hour data:", err);
    })
    //////////////////////

    //////////////////////
    socket.on("sensorReading", async () => {
      console.log("Received sensor reading from server");
      try {
        const result = await fetchCurrentData();
        const { aqi, timestamp, temperature, humidity } = result;
        const newData = {
          aqi,
          timestamp,
          temperature,
          humidity,
          location: "Delhi (North-West)",
          coordinates: location ? { latitude: location.lat, longitude: location.lng } : undefined,
        }
        setCurrentData(newData); // CURRENT DATA

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    });

    return () => {
      socket.off("sensorReading");
    };
  }, [location]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newData = [...data.slice(1), generateMockData(1)[0]]
  //     setData(newData)
  //     // setCurrentData(newData[newData.length - 1])
  //     setForecastedData(generateForecastedData())
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [data])

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
          {/* CURRENT AQI  */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Current AQI</CardTitle>
              <CardDescription>Real-time air quality index</CardDescription>
            </CardHeader>
            <CardContent>
              <CurrentAQI data={currentData} /> {/* Pass the current data to the CurrentAQI component */}
            </CardContent>
          </Card>
          {/* CURRENT AQI  */}
          {/* TEMP & HUMIDITY */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Temperature & Humidity</CardTitle>
              <CardDescription>Current environmental conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <TempHumidity data={currentData} />
            </CardContent>
          </Card>
          {/* TEMP & HUMIDITY */}
          {/* FORECASTED AQI FOR NEXT HOUR */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>Forecasted AQI</CardTitle>
              <CardDescription>ML model prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastedAQI data={forecastedData} />
            </CardContent>
          </Card>
          {/* FORECASTED AQI FOR NEXT HOUR */}
          {/*  REAL TIME AND FORECASTED AQI Comparison*/}
          <Card className="col-span-full lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>AQI Comparison</CardTitle>
              <CardDescription>Real-time vs Forecasted AQI</CardDescription>
            </CardHeader>
            <CardContent>
              <AQIComparison realTimeData={currentData} forecastedData={currentForecast} />
            </CardContent>
          </Card>
          {/*  REAL TIME AND FORECASTED AQI Comparison*/}
          {/* REAL TIME AQI GRAPH */}
          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <CardTitle>Real-time AQI Graph</CardTitle>
              <CardDescription>Last 24 hours of data</CardDescription>
            </CardHeader>
            <CardContent>
              <RealTimeGraph data={last24hourData} />
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
                  <HistoricalData data={medianData} interval="daily" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          {/* HISTORICAL DATA GRAPH  */}
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
          {/* <Card className="col-span-full">
            <CardHeader className="pb-2">
            <CardTitle>Sensor Data</CardTitle>
              <CardDescription>Individual pollutant readings</CardDescription>
            </CardHeader>
            <CardContent>
              <SensorDataCards data={currentData} />
            </CardContent>
            </Card> */}
          {/*  */}
        </div>
      </main>
    </div>
  )
}

import { generateMockData, generateForecastedData } from "@/lib/mock-data"