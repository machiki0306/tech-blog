import { createArticle } from '@/app/actions'
import MarkdownEditor from '@/components/MarkdownEditor'

export default function NewArticlePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事を書く</h1>
      <form action={createArticle} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            required
            placeholder="タイトル"
            className="w-full text-2xl font-bold border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 pb-2 bg-transparent"
          />
        </div>
        <MarkdownEditor name="content" />
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <input type="radio" name="status" value="draft" defaultChecked />
              下書き
            </label>
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <input type="radio" name="status" value="published" />
              公開
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            投稿する
          </button>
        </div>
      </form>
    </div>
  )
}
