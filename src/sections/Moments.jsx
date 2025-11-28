import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Moments.css';

const Moments = () => {
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
        <section id="gallery" className="moments" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 className="moments-title">{t.moments.title}</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem', color: '#555' }}>
                Explore our journey and the impact we've created together.
            </p>
            <a href="/gallery" className="donate-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                View Full Gallery
            </a>
        </section>
    );
};

export default Moments;
