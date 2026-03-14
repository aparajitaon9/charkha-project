type Props = {
  title: string
  category: string
  duration: string
  gradientClass: string
}

export default function YTCard({ title, category, duration, gradientClass }: Props) {
  return (
    <div className="yt-card">
      <div className="yt-thumb">
        <div className={`yt-thumb-inner ${gradientClass}`} />
        <div className="yt-play" />
        <div className="yt-duration">{duration}</div>
        <div className="yt-title-overlay">{category}</div>
      </div>
      <div className="yt-body">
        <div className="yt-card-title">{title}</div>
        <div className="yt-card-meta">The Charkha Project · {category}</div>
      </div>
    </div>
  )
}
