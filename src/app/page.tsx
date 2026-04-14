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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-700 mb-4">新着記事</h1>
      {articles && articles.length > 0 ? (
        <div className="flex flex-col gap-3">
          {articles.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg px-6 py-10 text-center text-gray-400">
          まだ記事がありません。最初の記事を投稿してみましょう！
        </div>
      )}
    </div>
  )
}
