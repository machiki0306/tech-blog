import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions'

export default async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-gray-900 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white tracking-wide">
          tech-blog
        </Link>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/articles/new"
                className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-400 transition-colors font-medium"
              >
                記事を書く
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ログアウト
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
