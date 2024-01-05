export default function TimeAgo({ date }: { date: Date }) {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  let displayDate = ''

  if (diffDays >= 7) {
    if (date.getFullYear() !== now.getFullYear()) {
      displayDate = date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } else {
      displayDate = date.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
      })
    }
  } else if (diffDays > 0) {
    displayDate = `${diffDays}日前`
  } else if (diffHours > 0) {
    displayDate = `${diffHours}時間前`
  } else if (diffMinutes > 0) {
    displayDate = `${diffMinutes}分前`
  } else {
    displayDate = 'たった今'
  }

  return (
    <time dateTime={date.toISOString()} className="text-xs text-gray-800 dark:text-gray-50">
      {displayDate}
    </time>
  )
}
