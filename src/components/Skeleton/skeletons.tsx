import { SkeletonArticleCard } from '@/components/Skeleton/Article/Card'
import { SkeletonWorkCard } from '@/components/Skeleton/Work/Card'

export function ArticleCardSkeletons() {
  return (
    <>
      <SkeletonArticleCard />
      <SkeletonArticleCard />
      <SkeletonArticleCard />
    </>
  )
}

export function WorkCardSkeletons() {
  return (
    <>
      <SkeletonWorkCard />
      <SkeletonWorkCard />
      <SkeletonWorkCard />
    </>
  )
}
