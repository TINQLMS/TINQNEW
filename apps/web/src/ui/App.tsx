import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type User = {
  id: string
  email?: string
}

export function App() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return
      setUser(data.user ? { id: data.user.id, email: data.user.email ?? undefined } : null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email ?? undefined } : null)
    })
    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  async function signInWithMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    if (error) setStatus(error.message)
    else setStatus('Check your email for the magic link')
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b1020',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"'
    }}>
      <div style={{ width: 420, maxWidth: '90vw', background: '#121938', border: '1px solid #1e2a5a', borderRadius: 12, padding: 24 }}>
        <h1 style={{ margin: '0 0 12px', fontSize: 22 }}>TINQLMS</h1>
        {user ? (
          <div>
            <p style={{ marginTop: 0 }}>Signed in as {user.email ?? user.id}</p>
            <div style={{ display: 'grid', gap: 8 }}>
              <button onClick={signOut} style={buttonStyle}>Sign out</button>
              <div style={cardStyle}>
                <strong>Role-based areas</strong>
                <ul>
                  <li>Admin Dashboard (placeholder)</li>
                  <li>Instructor Dashboard (placeholder)</li>
                  <li>Student Dashboard (placeholder)</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={signInWithMagicLink} style={{ display: 'grid', gap: 12 }}>
            <label>
              <div style={{ marginBottom: 4 }}>Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </label>
            <button type="submit" style={buttonStyle}>Send magic link</button>
            {status && <div style={{ color: '#93c5fd' }}>{status}</div>}
          </form>
        )}
        <div style={{ marginTop: 16, opacity: 0.7, fontSize: 12 }}>Powered by Supabase</div>
      </div>
    </div>
  )
}

const buttonStyle: React.CSSProperties = {
  background: '#0ea5e9',
  color: 'white',
  border: 'none',
  padding: '10px 14px',
  borderRadius: 8,
  cursor: 'pointer'
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #233064',
  background: '#0b1020',
  color: 'white'
}

const cardStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 8,
  border: '1px solid #233064',
  background: '#0b1020'
}
