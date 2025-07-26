import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [productName, setProductName] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [customPrompt, setCustomPrompt] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            alert("Logged out successfully!");
            navigate('/login');
        }).catch((error) => {
            alert("Error logging out: " + error.message);
        });
    };

    const handleGenerate = async (type) => {
        const endpointMap = {
            "Basic Info": "basic-info",
            "Social Media Strategy": "social-media-strategy",
            "Logo Design": "logo",
            "Poster Design": "poster",
            "Brochure": "brochure",
            "Brand Kit(PDF)": "brand-kit"
        };

        const endpoint = endpointMap[type];

        if (!endpoint) {
            alert(`No handler implemented for "${type}" yet.`);
            return;
        }

        const payload = {
            product_name: productName,
            target_audience: targetAudience
        };

        if (type === "Logo Design") {
            try {
                const response = await fetch(`http://127.0.0.1:8000/generate/${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: `Design a logo for '${productName}' targeted at '${targetAudience}'` })
                });

                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);

                navigate("/results", { state: { result: { logo_url: imageUrl } } });
            } catch (err) {
                alert("Error generating logo: " + err.message);
            }
            return;
        }

        fetch(`http://127.0.0.1:8000/generate/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                console.log(`Response from backend [${type}]:`, data);
                navigate('/results', { state: { result: data } });
            })
            .catch(err => {
                alert("Error: " + err.message);
            });
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
            <h2>🎨 BrandGPT Dashboard</h2>
            <p>Welcome! Let’s create content for your product.</p>

            <input
                type="text"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
            />
            <input
                type="text"
                placeholder="Enter Target Audience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
            />
            <textarea
                placeholder="Enter specific requirements (optional)"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                style={{ width: '100%', marginBottom: '20px', padding: '10px', height: '100px' }}
            />

            <div style={{ display: 'grid', gap: '10px' }}>
                <button onClick={() => handleGenerate("Basic Info")}>📝 Generate Basic Info</button>
                <button onClick={() => handleGenerate("Social Media Strategy")}>📱 Social Media Strategy</button>
                <button onClick={() => handleGenerate("Logo Design")}>🎨 Logo Design</button>
                <button onClick={() => handleGenerate("Poster Design")}>🖼️ Poster Design</button>
                <button onClick={() => handleGenerate("Brochure")}>📘 Brochure</button>
                <button onClick={() => handleGenerate("Brand Kit(PDF)")}>📂 Brand Kit (PDF)</button>
            </div>

            <hr style={{ margin: '20px 0' }} />
            <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white' }}>Logout</button>
        </div>
    );
}

export default Dashboard;
