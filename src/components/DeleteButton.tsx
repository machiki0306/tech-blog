'use client'

import { deleteArticle } from '@/app/actions'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={deleteArticle}
      onSubmit={(e) => {
        if (!confirm('この記事を削除しますか？')) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red-600 hover:text-red-700 border border-red-300 px-3 py-1.5 rounded"
      >
        削除
      </button>
    </form>
  )
}
