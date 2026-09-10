import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [data, setData] = useState(null)
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [resRoot, resHealth] = await Promise.all([
        fetch(`${API_URL}/`),
        fetch(`${API_URL}/health`),
      ])

      if (!resRoot.ok || !resHealth.ok) {
        throw new Error('Failed to fetch data from backend')
      }

      const rootJson = await resRoot.json()
      const healthJson = await resHealth.json()

      setData(rootJson)
      setHealth(healthJson)
    } catch (err) {
      setError(err.message || 'Cannot connect to backend')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <h1>Robotics API</h1>
        <p>Simple dashboard connecting React frontend to FastAPI backend</p>
      </header>

      {error && (
        <div className="error-box">
          <p>⚠️ {error}</p>
          <small>Make sure FastAPI is running on port 8000</small>
        </div>
      )}

      <div className="grid">
        {/* Route 1 */}
        <div className="card">
          <div className="card-header">
            <h2>Student Details</h2>
            <span className="badge">Route: /</span>
          </div>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : data ? (
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Student ID:</td>
                  <td><strong>{data.student_id}</strong></td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td><strong>{data.name}</strong></td>
                </tr>
                <tr>
                  <td>Message:</td>
                  <td>{data.message}</td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>

        {/* Route 2 */}
        <div className="card">
          <div className="card-header">
            <h2>System Health</h2>
            <span className="badge">Route: /health</span>
          </div>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : health ? (
            <div className="health-status">
              <span className="status-dot"></span>
              <span>Status: <strong>{health.status}</strong></span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="actions">
        <button onClick={loadData} disabled={loading} className="refresh-btn">
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <footer className="footer">
        <a href={`${API_URL}/docs`} target="_blank" rel="noreferrer">
          Swagger API Docs
        </a>
      </footer>
    </div>
  )
}

export default App
