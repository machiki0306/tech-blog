import Link from 'next/link'
import { Article } from '@/types'

type Props = {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  const date = new Date(article.created_at).toLocaleDateString('ja-JP')
  const authorName = article.profiles?.username ?? 'Anonymous'

  return (
    <article className="bg-white rounded-lg px-6 py-5 hover:shadow-md transition-shadow">
      <Link href={`/articles/${article.id}`} className="group">
        <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-500 transition-colors mb-2 leading-snug">
          {article.title}
        </h2>
      </Link>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="font-medium text-gray-500">{authorName}</span>
        <span>·</span>
        <span>{date}</span>
      </div>
    </article>
  )
}
