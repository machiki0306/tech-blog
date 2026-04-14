import { createClient } from '@/lib/supabase/server'
import MarkdownPreview from '@/components/MarkdownPreview'
import DeleteButton from '@/components/DeleteButton'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*, profiles(id, username, avatar_url)')
    .eq('id', id)
    .single()

  if (!article) notFound()

  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === article.user_id

  const date = new Date(article.created_at).toLocaleDateString('ja-JP')

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        {article.status === 'draft' && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mb-2 inline-block">
            下書き
          </span>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{article.title}</h1>
        <p className="text-sm text-gray-500">
          {article.profiles?.username ?? 'Anonymous'} · {date}
        </p>
      </div>

      {isOwner && (
        <div className="flex gap-3 mb-6">
          <Link
            href={`/articles/${id}/edit`}
            className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-1.5 rounded"
          >
            編集
          </Link>
          <DeleteButton id={id} />
        </div>
      )}

      <div className="bg-white rounded-lg p-8 border border-gray-200">
        <MarkdownPreview content={article.content} />
      </div>
    </div>
  )
}
