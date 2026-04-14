'use client'

import { useState } from 'react'
import MarkdownPreview from './MarkdownPreview'

type Props = {
  defaultValue?: string
  name: string
}

export default function MarkdownEditor({ defaultValue = '', name }: Props) {
  const [content, setContent] = useState(defaultValue)
  const [tab, setTab] = useState<'write' | 'preview'>('write')

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex border-b border-gray-300 bg-gray-50">
        <button
          type="button"
          onClick={() => setTab('write')}
          className={`px-4 py-2 text-sm font-medium ${
            tab === 'write'
              ? 'bg-white border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          編集
        </button>
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`px-4 py-2 text-sm font-medium ${
            tab === 'preview'
              ? 'bg-white border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          プレビュー
        </button>
      </div>
      {tab === 'write' ? (
        <textarea
          name={name}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 text-sm font-mono resize-none focus:outline-none"
          placeholder="Markdownで記事を書いてください..."
        />
      ) : (
        <div className="min-h-96 p-4">
          {content ? (
            <MarkdownPreview content={content} />
          ) : (
            <p className="text-gray-400 text-sm">プレビューする内容がありません</p>
          )}
        </div>
      )}
    </div>
  )
}
