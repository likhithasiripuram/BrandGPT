import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>No results to display.</h2>
                <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
            <h2>🎯 BrandGPT Results</h2>

            {result.brand_name && (
                <ResultCard title="🏷️ Brand Name" content={result.brand_name} />
            )}

            {result.mission && (
                <ResultCard title="🎯 Mission" content={result.mission} />
            )}

            {result.tagline && (
                <ResultCard title="💬 Tagline" content={result.tagline} />
            )}

            {result.platforms && (
                <ResultCard title="📱 Social Media Strategy">
                    <strong>Platforms:</strong>
                    <ul>
                        {result.platforms.map((platform, idx) => (
                            <li key={idx}>{platform}</li>
                        ))}
                    </ul>

                    <strong>Content Ideas:</strong>
                    {result.content_ideas && result.content_ideas.length > 0 ? (
                        <ul>
                            {result.content_ideas.map((idea, idx) => (
                                idea?.type && idea?.title ? (
                                    <li key={idx}>
                                        <strong>{idea.type}</strong>: {idea.title}
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    ) : (
                        <p>No content ideas available.</p>
                    )}

                    <p><strong>Posting Frequency:</strong> {result.posting_frequency}</p>

                    {result.tone_and_branding && (
                        <>
                            <p><strong>Tone:</strong> {result.tone_and_branding.tone}</p>
                            <p><strong>Branding Style:</strong> {result.tone_and_branding.branding}</p>
                        </>
                    )}
                </ResultCard>
            )}

            {result.logo_url && (
                <ResultCard title="🎨 Logo Design">
                    <img src={result.logo_url} alt="Generated Logo" style={{ width: '100%', maxWidth: '400px' }} />
                </ResultCard>
            )}


            {result.raw && (
                <ResultCard title="📄 Raw Output">
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{result.raw}</pre>
                </ResultCard>
            )}

            <button style={{ marginTop: '2rem' }} onClick={() => navigate('/dashboard')}>
                ⬅️ Back to Dashboard
            </button>
        </div>
    );
}

function ResultCard({ title, content, children }) {
    return (
        <div style={cardStyle}>
            <h3>{title}</h3>
            {content ? <p>{content}</p> : children}
        </div>
    );
}

const cardStyle = {
    marginTop: '1.5rem',
    padding: '1rem',
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
};

export default Results;
