import GoogleLoginButton from '@/components/GoogleLoginButton'

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto mt-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">ログイン</h1>
      <p className="text-gray-500 text-sm mb-8">
        tech-blogへようこそ。Googleアカウントでログインしてください。
      </p>
      <GoogleLoginButton />
    </div>
  )
}
