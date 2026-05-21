'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        fetchItems(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  const fetchItems = async (user: any) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const response = await fetch(`${API_URL}/items/`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const createItem = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    try {
      const response = await fetch(`${API_URL}/items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ title })
      })
      if (response.ok) {
        setTitle('')
        fetchItems(user)
      }
    } catch (error) {
      console.error('Error creating item:', error)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '8px' }}>Logout</button>
      </div>
      <p>Welcome, {user?.email}</p>

      <div style={{ marginTop: '20px' }}>
        <h2>Create Item</h2>
        <form onSubmit={createItem} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Item Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px' }}>Add</button>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Your Items</h2>
        <ul>
          {items.map((item: any) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
