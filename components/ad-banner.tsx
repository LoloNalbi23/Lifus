interface AdBannerProps {
  type: "horizontal" | "vertical"
}

export default function AdBanner({ type }: AdBannerProps) {
  return (
    <div
      className={`ad-container ${type === "horizontal" ? "ad-horizontal" : "ad-vertical"}`}
      style={{
        backgroundColor: "rgba(30, 30, 30, 0.8)",
        border: "2px dashed rgba(255, 0, 0, 0.3)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="text-center text-sm text-white">
        <p>Espacio publicitario</p>
        <p className="text-xs">{type === "horizontal" ? "728x90" : "160x600"}</p>
      </div>
    </div>
  )
}
