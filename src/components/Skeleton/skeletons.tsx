import { SkeletonArticleCard } from '@/components/Skeleton/Article/Card'
import { SkeletonWorkCard } from '@/components/Skeleton/Work/Card'

export function ArticleCardSkeletons({ amount }: { amount?: number }) {
  let i = amount || 0
  return (
    <>
      {Array.from({ length: i }).map((_, i) => (
        <SkeletonArticleCard key={i} />
      ))}
    </>
  )
}

export function WorkCardSkeletons({ amount }: { amount?: number }) {
  let i = amount || 0
  return (
    <>
      {Array.from({ length: i }).map((_, i) => (
        <SkeletonWorkCard key={i} />
      ))}
    </>
  )
}
