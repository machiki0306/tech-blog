import Link from 'next/link'
import { Article } from '@/types'

type Props = {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  const date = new Date(article.created_at).toLocaleDateString('ja-JP')
  const authorName = article.profiles?.username ?? 'Anonymous'

  return (
    <article className="border-b border-gray-200 py-5">
      <Link href={`/articles/${article.id}`} className="group">
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
          {article.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500">
        {authorName} · {date}
      </p>
    </article>
  )
}
