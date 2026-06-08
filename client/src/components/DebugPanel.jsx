export default function DebugPanel({ visible, title = 'Debug de Carregamento', error, lines = [] }) {
  if (!visible || (!error && (!lines || lines.length === 0))) return null;

  return (
    <section
      className="perfil-debug"
      style={{ margin: '16px 0', padding: '14px', borderRadius: '12px', backgroundColor: '#fff4e5', border: '1px solid #ffd8a8' }}
    >
      {error && <p style={{ margin: 0, color: '#9a3412', fontWeight: 'bold' }}>{error}</p>}
      {lines.length > 0 && (
        <div style={{ marginTop: error ? '12px' : 0 }}>
          <strong>{title}</strong>
          <ul style={{ margin: '8px 0 0 16px', padding: 0, listStyleType: 'disc', color: '#6b4226' }}>
            {lines.map((line, index) => (
              <li key={index} style={{ marginBottom: '4px' }}><code>{line}</code></li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

