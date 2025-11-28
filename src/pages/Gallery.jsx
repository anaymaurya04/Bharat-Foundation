import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../sections/Moments.css'; // Reuse existing styles

const Gallery = () => {
    const { t } = useLanguage();
    const [moments, setMoments] = useState([]);

    useEffect(() => {
        const fetchMoments = async () => {
            try {
                const response = await fetch('/api/moments');
                const data = await response.json();
                setMoments(data.data);
            } catch (error) {
                console.error('Error fetching moments:', error);
            }
        };
        fetchMoments();
    }, []);

    return (
        <div style={{ padding: '2rem', minHeight: '80vh', backgroundColor: '#fce7f3', textAlign: 'center' }}>
            <h2 className="moments-title" style={{ marginTop: '2rem' }}>{t.moments.title}</h2>
            <div className="moments-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {moments.map((moment, index) => (
                    <div
                        key={index}
                        className="moment-card"
                        style={{
                            height: 'auto',
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        {moment.image && (
                            <img
                                src={moment.image}
                                alt="Bharat Foundation Moment"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
