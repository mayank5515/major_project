"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getAQIColor } from "@/lib/aqi-utils"

interface RealTimeGraphProps {
  data: Array<{
    aqi: number
    timestamp: string
  }>
}

export default function RealTimeGraph({ data }: RealTimeGraphProps) {
  console.log('DATA FROM REAL TIME GRAPH', data);
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
              {/* <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} /> */}
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              {/* <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} /> */}
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          />
          <YAxis domain={[0, 450]} />
          <CartesianGrid strokeDasharray="3 3" />
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
                      <div>{new Date(payload[0].payload.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="aqi"
            stroke="var(--primary)"
            fillOpacity={1}
            fill="url(#colorAqi)"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
