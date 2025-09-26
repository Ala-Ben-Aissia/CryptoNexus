import { Link } from 'react-router'

type StyleKey = 'container' | 'title' | 'message' | 'link'

const styles: Record<StyleKey, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: '80px 20px',
    backgroundColor: '#161b22',
  },
  title: {
    fontSize: '72px',
    marginBottom: '20px',
    color: '#e5e5e5',
  },
  message: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#e5e5e5',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
}

export default function Notfound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <p style={styles.message}>Oops, Page Not Found!</p>
      </h1>
      <Link to="/" style={styles.link}>
        ← Go Back Home
      </Link>
    </div>
  )
}
