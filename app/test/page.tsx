export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#6B4E34' }}>
        Test Page
      </h1>
      <p style={{ color: '#2F2F2F' }}>
        If you can see this page, the basic Next.js setup is working!
      </p>
      <div className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Test Button
      </div>
    </div>
  );
}
