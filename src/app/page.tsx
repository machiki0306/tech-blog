import { createClient } from '@/lib/supabase/server'
import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*, profiles(id, username, avatar_url)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新着記事</h1>
      {articles && articles.length > 0 ? (
        <div>
          {articles.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">まだ記事がありません。最初の記事を投稿してみましょう！</p>
      )}
    </div>
  )
}
