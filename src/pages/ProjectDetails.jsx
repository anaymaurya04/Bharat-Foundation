import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../sections/Projects.css'; // Reuse existing styles

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`/api/projects/${id}`);
                if (!response.ok) throw new Error('Project not found');
                const data = await response.json();
                setProject(data.data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;
    if (!project) return <div style={{ padding: '4rem', textAlign: 'center' }}>Project not found</div>;

    return (
        <div style={{ padding: '4rem 2rem', minHeight: '80vh', backgroundColor: '#f8f9fa' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'white', padding: '3rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <button onClick={() => navigate(-1)} style={{ marginBottom: '2rem', padding: '0.6rem 1.2rem', cursor: 'pointer', background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: '#555', transition: 'all 0.2s' }}>
                    &larr; Back to Projects
                </button>

                <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
                </div>

                <h1 style={{ color: '#1a1a1a', marginBottom: '1.5rem', fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2' }}>{project.title}</h1>

                <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#4a4a4a', marginBottom: '3rem', whiteSpace: 'pre-line' }}>
                    {project.description}
                </div>

                <button
                    className="project-btn"
                    style={{ width: '100%', padding: '1.2rem', fontSize: '1.3rem', fontWeight: '600', borderRadius: '10px', backgroundColor: '#d32f2f', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }}
                    onClick={() => navigate('/donate')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b71c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#d32f2f'}
                >
                    Donate to this Cause
                </button>
            </div>
        </div>
    );
};

export default ProjectDetails;
