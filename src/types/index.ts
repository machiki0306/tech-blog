export type Profile = {
  id: string
  username: string | null
  avatar_url: string | null
  created_at: string
}

export type Article = {
  id: string
  user_id: string
  title: string
  content: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
  profiles?: Profile
}
