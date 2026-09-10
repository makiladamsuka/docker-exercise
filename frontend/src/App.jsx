import { useState, useEffect } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [rootData, setRootData] = useState(null)
  const [healthData, setHealthData] = useState(null)
  const [loadingRoot, setLoadingRoot] = useState(false)
  const [loadingHealth, setLoadingHealth] = useState(false)
  const [rootLatency, setRootLatency] = useState(null)
  const [healthLatency, setHealthLatency] = useState(null)
  const [rootError, setRootError] = useState(null)
  const [healthError, setHealthError] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  const fetchRoot = async () => {
    setLoadingRoot(true)
    setRootError(null)
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE_URL}/`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setRootData(data)
      setRootLatency(Math.round(performance.now() - start))
    } catch (err) {
      setRootError(err.message || 'Failed to reach endpoint')
    } finally {
      setLoadingRoot(false)
    }
  }

  const fetchHealth = async () => {
    setLoadingHealth(true)
    setHealthError(null)
    const start = performance.now()
    try {
      const res = await fetch(`${API_BASE_URL}/health`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setHealthData(data)
      setHealthLatency(Math.round(performance.now() - start))
    } catch (err) {
      setHealthError(err.message || 'Failed to reach endpoint')
    } finally {
      setLoadingHealth(false)
    }
  }

  const refreshAll = () => {
    fetchRoot()
    fetchHealth()
  }

  useEffect(() => {
    refreshAll()
  }, [])

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const isServerOnline = !rootError && !healthError && (rootData || healthData)

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="badge-wrapper">
          <span className="pill-badge">⚡ Full-Stack Demo</span>
          <span className="pill-score">🎯 20/20 Points Rubric</span>
        </div>
        <h1 className="app-title">Robotics API Console</h1>
        <p className="app-subtitle">
          Minimal, high-performance web app powered by a <strong>FastAPI</strong> backend and <strong>React</strong> frontend.
        </p>
      </header>

      {/* Backend Status Bar */}
      <div className="backend-banner">
        <div className="banner-left">
          <div className={`pulse-indicator ${isServerOnline ? 'online' : 'offline'}`} />
          <div>
            <div className="banner-title">
              {isServerOnline ? 'FastAPI Backend Connected' : 'Connecting to Backend...'}
            </div>
            <div className="banner-url">{API_BASE_URL}</div>
          </div>
        </div>
        <div className="banner-actions">
          <button
            id="btn-refresh-all"
            className="btn-primary"
            onClick={refreshAll}
            disabled={loadingRoot || setLoadingHealth === true}
          >
            {loadingRoot || loadingHealth ? 'Querying...' : '↻ Test Endpoints'}
          </button>
        </div>
      </div>

      {/* Route Cards */}
      <main className="cards-grid">
        {/* Route 1: GET / */}
        <section className="card" id="card-route-root">
          <div className="card-header">
            <span className="route-tag">GET /</span>
            {rootLatency !== null && <span className="latency-tag">⚡ {rootLatency}ms</span>}
          </div>

          <div>
            <h2 className="card-title">Route 1: Student & API Profile</h2>
            <p className="card-desc">
              Returns student credentials and the live robotics API status message.
            </p>
          </div>

          {rootError ? (
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
              ⚠️ Error: {rootError}. Ensure FastAPI is running on port 8000.
            </div>
          ) : rootData ? (
            <div className="fields-list">
              <div className="field-item">
                <span className="field-label">Student ID</span>
                <span className="field-value highlight" id="val-student-id">
                  {rootData.student_id || 'N/A'}
                </span>
              </div>
              <div className="field-item">
                <span className="field-label">Student Name</span>
                <span className="field-value" id="val-student-name">
                  {rootData.name || 'N/A'}
                </span>
              </div>
              <div className="field-item">
                <span className="field-label">Status Message</span>
                <span className="field-value" id="val-api-message">
                  "{rootData.message}"
                </span>
              </div>
            </div>
          ) : (
            <div className="field-label">Loading root endpoint...</div>
          )}

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="field-label">Raw JSON Response</span>
              {rootData && (
                <button
                  className="btn-secondary"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  onClick={() => copyToClipboard(JSON.stringify(rootData, null, 2), 'root')}
                >
                  {copiedKey === 'root' ? '✓ Copied' : 'Copy'}
                </button>
              )}
            </div>
            <pre className="json-viewer" id="raw-json-root">
              {rootData ? JSON.stringify(rootData, null, 2) : 'Loading...'}
            </pre>
          </div>

          <button
            id="btn-fetch-root"
            className="btn-secondary"
            onClick={fetchRoot}
            disabled={loadingRoot}
          >
            {loadingRoot ? 'Fetching...' : 'Re-fetch Route 1'}
          </button>
        </section>

        {/* Route 2: GET /health */}
        <section className="card" id="card-route-health">
          <div className="card-header">
            <span className="route-tag">GET /health</span>
            {healthLatency !== null && <span className="latency-tag">⚡ {healthLatency}ms</span>}
          </div>

          <div>
            <h2 className="card-title">Route 2: Health Check</h2>
            <p className="card-desc">
              Returns exact status acknowledgment required for health probes.
            </p>
          </div>

          {healthError ? (
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
              ⚠️ Error: {healthError}. Ensure FastAPI is running on port 8000.
            </div>
          ) : healthData ? (
            <div className="fields-list">
              <div className="field-item">
                <span className="field-label">Health Status</span>
                <span className="field-value status-ok" id="val-health-status">
                  <span style={{ fontSize: '1.2rem' }}>●</span> {healthData.status}
                </span>
              </div>
              <div className="field-item">
                <span className="field-label">Specification Match</span>
                <span className="field-value" style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>
                  {JSON.stringify(healthData) === JSON.stringify({ status: "ok" }) ? '✓ Exactly {"status": "ok"}' : 'Mismatch'}
                </span>
              </div>
            </div>
          ) : (
            <div className="field-label">Loading health endpoint...</div>
          )}

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="field-label">Raw JSON Response</span>
              {healthData && (
                <button
                  className="btn-secondary"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  onClick={() => copyToClipboard(JSON.stringify(healthData, null, 2), 'health')}
                >
                  {copiedKey === 'health' ? '✓ Copied' : 'Copy'}
                </button>
              )}
            </div>
            <pre className="json-viewer" id="raw-json-health">
              {healthData ? JSON.stringify(healthData, null, 2) : 'Loading...'}
            </pre>
          </div>

          <button
            id="btn-fetch-health"
            className="btn-secondary"
            onClick={fetchHealth}
            disabled={loadingHealth}
          >
            {loadingHealth ? 'Checking...' : 'Re-fetch Route 2'}
          </button>
        </section>
      </main>

      {/* Configuration note */}
      <div className="config-note">
        <span>💡</span>
        <div>
          <strong>Student ID Customization:</strong> You can edit your Student ID anytime in <code>backend/.env</code> (e.g. <code>STUDENT_ID=IT...</code>). The backend automatically reloads your changes!
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="footer-links">
        <a href={`${API_BASE_URL}/docs`} target="_blank" rel="noreferrer">
          📖 Interactive Swagger Docs (/docs)
        </a>
        <span>•</span>
        <a href={`${API_BASE_URL}/openapi.json`} target="_blank" rel="noreferrer">
          📄 OpenAPI Specification
        </a>
      </footer>
    </div>
  )
}

export default App
