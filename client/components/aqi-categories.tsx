interface AQICategoriesProps {
  currentAQI: number
}

export default function AQICategories({ currentAQI }: AQICategoriesProps) {
  const categories = [
    {
      range: "0-50",
      label: "Good",
      color: "#00e400",
      description: "Air quality is satisfactory, and air pollution poses little or no risk.",
    },
    {
      range: "51-100",
      label: "Moderate",
      // color: "#ffff00",
      color: "#ffde33",
      description: "Air quality is acceptable. However, there may be a risk for some people.",
    },
    {
      range: "101-150",
      label: "Unhealthy for Sensitive Groups",
      color: "#ff7e00",
      description: "Members of sensitive groups may experience health effects.",
    },
    {
      range: "151-200",
      label: "Unhealthy",
      color: "#ff0000",
      description: "Everyone may begin to experience health effects.",
    },
    {
      range: "201-300",
      label: "Very Unhealthy",
      // color: "#99004c",
      color: "#660099",
      description: "Health alert: everyone may experience more serious health effects.",
    },
    {
      range: "301-500",
      label: "Hazardous",
      color: "#7e0023",
      description: "Health warning of emergency conditions. The entire population is likely to be affected.",
    },
  ]

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
      {categories.map((category, index) => {
        const [min, max] = category.range.split("-").map(Number)
        const isCurrentCategory = currentAQI >= min && currentAQI <= max

        return (
          <div
            key={index}
            className={`p-3 rounded-lg border ${isCurrentCategory ? "border-2" : "border"}`}
            style={{
              borderColor: isCurrentCategory ? category.color : "transparent",
              backgroundColor: `${category.color}40`, // 20 is hex for 12% opacity
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{category.label}</div>
              <div className="text-sm">{category.range}</div>
            </div>
            <div className="text-xs text-muted-foreground">{category.description}</div>
            {/* <div className="text-xs ">{category.description}</div> */}
          </div>
        )
      })}
    </div>
  )
}
