import { createClient } from '@/lib/supabase/server'
import { updateArticle } from '@/app/actions'
import MarkdownEditor from '@/components/MarkdownEditor'
import { notFound, redirect } from 'next/navigation'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事を編集</h1>
      <form action={updateArticle} className="space-y-4">
        <input type="hidden" name="id" value={id} />
        <div>
          <input
            type="text"
            name="title"
            required
            defaultValue={article.title}
            placeholder="タイトル"
            className="w-full text-2xl font-bold border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2 bg-transparent"
          />
        </div>
        <MarkdownEditor name="content" defaultValue={article.content} />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="draft"
                defaultChecked={article.status === 'draft'}
              />
              下書き
            </label>
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                defaultChecked={article.status === 'published'}
              />
              公開
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            更新する
          </button>
        </div>
      </form>
    </div>
  )
}
