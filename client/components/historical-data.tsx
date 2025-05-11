"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { getAQIColor } from "@/lib/aqi-utils"

interface HistoricalDataProps {
  data: Array<{
    aqi: number
    timestamp: string
  }>
  interval: "hourly" | "daily"
}

export default function HistoricalData({ data, interval }: HistoricalDataProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const currentTime = new Date()

  // Filter data based on interval
  const filteredData = data.filter((item) => {
    const itemTime = new Date(item.timestamp)
    if (interval === "hourly") {
      const hoursDifference = (currentTime.getTime() - itemTime.getTime()) / (1000 * 60 * 60) // Time difference in hours
      return hoursDifference <= 8 // Filter data for the last 8 hours
    } else if (interval === "daily") {
      const daysDifference = (currentTime.getTime() - itemTime.getTime()) / (1000 * 60 * 60 * 24) // Time difference in days
      return daysDifference <= 12 // Filter data for the last 12 days
    }
    return false
  })

  const chartData = filteredData.map((item) => ({
    ...item,
    formattedTime:
      interval === "hourly"
        ? new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : new Date(item.timestamp).toLocaleDateString([], { month: "short", day: "numeric" }),
  }))

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button variant={chartType === "line" ? "default" : "outline"} size="sm" onClick={() => setChartType("line")}>
          Line
        </Button>
        <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
          Bar
        </Button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="formattedTime" />
              <YAxis domain={[0, 500]} />
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
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="formattedTime" />
              <YAxis domain={[0, 500]} />
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
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="aqi" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
// import { Button } from "@/components/ui/button"
// import { getAQIColor } from "@/lib/aqi-utils"

// interface HistoricalDataProps {
//   data: Array<{
//     aqi: number
//     timestamp: string
//   }>
//   interval: "hourly" | "daily"
// }

// export default function HistoricalData({ data, interval }: HistoricalDataProps) {
//   const [chartType, setChartType] = useState<"line" | "bar">("line")

//   // In a real app, you would fetch different data based on the interval
//   // For this demo, we'll just use the same data
//   const chartData = data.map((item) => ({
//     ...item,
//     formattedTime:
//       interval === "hourly"
//         ? new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//         : new Date(item.timestamp).toLocaleDateString([], { month: "short", day: "numeric" }),
//   }))

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-end space-x-2">
//         <Button variant={chartType === "line" ? "default" : "outline"} size="sm" onClick={() => setChartType("line")}>
//           Line
//         </Button>
//         <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
//           Bar
//         </Button>
//       </div>

//       <div className="h-[300px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           {chartType === "line" ? (
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="formattedTime" />
//               <YAxis domain={[0, 500]} />
//               <Tooltip
//                 content={({ active, payload }) => {
//                   if (active && payload && payload.length) {
//                     const aqi = payload[0].value as number
//                     return (
//                       <div className="rounded-lg border bg-background p-2 shadow-sm">
//                         <div className="grid grid-cols-2 gap-2">
//                           <div className="font-medium">AQI:</div>
//                           <div className="font-bold" style={{ color: getAQIColor(aqi) }}>
//                             {aqi}
//                           </div>
//                           <div className="font-medium">Time:</div>
//                           <div>{payload[0].payload.formattedTime}</div>
//                         </div>
//                       </div>
//                     )
//                   }
//                   return null
//                 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="aqi"
//                 // stroke="var(--primary)"
//                 stroke="#4f46e5"
//                 strokeWidth={2}
//                 dot={{ r: 3 }}
//                 activeDot={{ r: 5 }}
//               />
//             </LineChart>
//           ) : (
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="formattedTime" />
//               <YAxis domain={[0, 500]} />
//               <Tooltip
//                 content={({ active, payload }) => {
//                   if (active && payload && payload.length) {
//                     const aqi = payload[0].value as number
//                     return (
//                       <div className="rounded-lg border bg-background p-2 shadow-sm">
//                         <div className="grid grid-cols-2 gap-2">
//                           <div className="font-medium">AQI:</div>
//                           <div className="font-bold" style={{ color: getAQIColor(aqi) }}>
//                             {aqi}
//                           </div>
//                           <div className="font-medium">Time:</div>
//                           <div>{payload[0].payload.formattedTime}</div>
//                         </div>
//                       </div>
//                     )
//                   }
//                   return null
//                 }}
//               />
//               <Bar dataKey="aqi" fill="#4f46e5" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           )}
//         </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }
