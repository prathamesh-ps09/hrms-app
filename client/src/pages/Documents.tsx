import React, { useState } from 'react';
import { Folder, FileText, Upload, Download, Eye } from 'lucide-react';
import '../styles/Documents.css';

interface DocFile {
    id: string;
    name: string;
    date: string;
    size: string;
    type: string;
}

interface DocCategory {
    id: string;
    name: string;
    icon: typeof Folder;
    count: number;
}

const initialCategories: DocCategory[] = [
    { id: 'personal', name: 'Personal Documents', icon: Folder, count: 3 },
    { id: 'education', name: 'Educational Certificates', icon: Folder, count: 2 },
    { id: 'employment', name: 'employment Records', icon: Folder, count: 4 },
    { id: 'tax', name: 'Tax Documents', icon: Folder, count: 1 },
    { id: 'policies', name: 'Policy Acknowledgments', icon: Folder, count: 5 },
];

const mockFiles: Record<string, DocFile[]> = {
    'personal': [
        { id: '1', name: 'Passport.pdf', date: '2023-01-10', size: '2.4 MB', type: 'PDF' },
        { id: '2', name: 'Driver License.jpg', date: '2023-01-10', size: '1.2 MB', type: 'IMG' },
        { id: '3', name: 'Address Proof.pdf', date: '2023-02-15', size: '1.8 MB', type: 'PDF' },
    ],
    'education': [
        { id: '4', name: 'Degree Certificate.pdf', date: '2022-05-20', size: '3.5 MB', type: 'PDF' },
    ],
    // ... others
};

const Documents: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [files] = useState(mockFiles);

    const currentFiles = activeCategory ? (files[activeCategory] || []) : [];

    const handleUpload = () => {
        alert('Upload functionality would open file picker here.');
    };

    return (
        <div className="documents-container">
            {activeCategory ? (
                <div className="file-view">
                    <div className="file-header">
                        <button onClick={() => setActiveCategory(null)} className="back-btn">
                            &larr; Back
                        </button>
                        <h3>{initialCategories.find(c => c.id === activeCategory)?.name}</h3>
                        <button className="upload-btn" onClick={handleUpload}>
                            <Upload size={16} /> Upload
                        </button>
                    </div>
                    <div className="file-list">
                        {currentFiles.length === 0 ? (
                            <div className="empty-category">No documents in this category.</div>
                        ) : (
                            currentFiles.map(file => (
                                <div key={file.id} className="file-item">
                                    <div className="file-icon-wrapper">
                                        <FileText size={24} color="var(--color-primary)" />
                                    </div>
                                    <div className="file-details">
                                        <div className="file-name">{file.name}</div>
                                        <div className="file-meta">{file.date} • {file.size}</div>
                                    </div>
                                    <div className="file-actions">
                                        <button className="action-icon"><Eye size={18} /></button>
                                        <button className="action-icon"><Download size={18} /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div className="category-grid">
                    {initialCategories.map(cat => (
                        <div key={cat.id} className="category-card" onClick={() => setActiveCategory(cat.id)}>
                            <div className="category-icon">
                                <cat.icon size={32} color="var(--color-primary)" />
                            </div>
                            <div className="category-info">
                                <div className="category-name">{cat.name}</div>
                                <div className="category-count">{cat.count} files</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Documents;
