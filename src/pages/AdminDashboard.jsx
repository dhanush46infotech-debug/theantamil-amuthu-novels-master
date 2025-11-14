import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/adminDashboard.module.scss';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('novels');
  const [novels, setNovels] = useState([
    { id: 1, title: 'Sample Novel 1', author: 'Swetha', language: 'Tamil', status: 'Published' },
    { id: 2, title: 'Sample Novel 2', author: 'Thenmozhi', language: 'Telugu', status: 'Draft' },
  ]);
  const [fontSettings, setFontSettings] = useState({
    primaryFont: 'Noto Sans Tamil',
    secondaryFont: 'Segoe UI',
    fontSize: '16px',
    lineHeight: '1.6',
  });
  const [editingNovel, setEditingNovel] = useState(null);
  const [newNovel, setNewNovel] = useState({
    title: '',
    author: '',
    language: 'Tamil',
    status: 'Draft',
  });

  // CRUD Operations for Novels
  const handleCreateNovel = () => {
    if (newNovel.title && newNovel.author) {
      setNovels([...novels, { ...newNovel, id: Date.now() }]);
      setNewNovel({ title: '', author: '', language: 'Tamil', status: 'Draft' });
    }
  };

  const handleUpdateNovel = (id, updatedData) => {
    setNovels(novels.map(novel => novel.id === id ? { ...novel, ...updatedData } : novel));
    setEditingNovel(null);
  };

  const handleDeleteNovel = (id) => {
    if (confirm('Are you sure you want to delete this novel?')) {
      setNovels(novels.filter(novel => novel.id !== id));
    }
  };

  // Font Settings Update
  const handleFontSettingsUpdate = (key, value) => {
    setFontSettings({ ...fontSettings, [key]: value });
    // Apply font settings to the document root
    document.documentElement.style.setProperty(`--font-${key}`, value);
  };

  return (
    <div className={styles.adminDashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className={styles.icon}>🔒</span>
            Admin Dashboard
          </h1>
          <button onClick={onLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            <button
              className={`${styles.navItem} ${activeTab === 'novels' ? styles.active : ''}`}
              onClick={() => setActiveTab('novels')}
            >
              📚 Manage Novels
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'authors' ? styles.active : ''}`}
              onClick={() => setActiveTab('authors')}
            >
              ✍️ Manage Authors
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'fonts' ? styles.active : ''}`}
              onClick={() => setActiveTab('fonts')}
            >
              🎨 Font Settings
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'themes' ? styles.active : ''}`}
              onClick={() => setActiveTab('themes')}
            >
              🌈 Theme Settings
            </button>
            <button
              className={`${styles.navItem} ${activeTab === 'users' ? styles.active : ''}`}
              onClick={() => setActiveTab('users')}
            >
              👥 Manage Users
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className={styles.content}>
          {/* Novels Management */}
          {activeTab === 'novels' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.sectionTitle}>Manage Novels</h2>

              {/* Create New Novel */}
              <div className={styles.createForm}>
                <h3>Add New Novel</h3>
                <div className={styles.formGrid}>
                  <input
                    type="text"
                    placeholder="Novel Title"
                    value={newNovel.title}
                    onChange={(e) => setNewNovel({ ...newNovel, title: e.target.value })}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Author Name"
                    value={newNovel.author}
                    onChange={(e) => setNewNovel({ ...newNovel, author: e.target.value })}
                    className={styles.input}
                  />
                  <select
                    value={newNovel.language}
                    onChange={(e) => setNewNovel({ ...newNovel, language: e.target.value })}
                    className={styles.select}
                  >
                    <option value="Tamil">Tamil</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                  <select
                    value={newNovel.status}
                    onChange={(e) => setNewNovel({ ...newNovel, status: e.target.value })}
                    className={styles.select}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <button onClick={handleCreateNovel} className={styles.createButton}>
                  Create Novel
                </button>
              </div>

              {/* Novels List */}
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Language</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {novels.map((novel) => (
                      <tr key={novel.id}>
                        <td>{novel.title}</td>
                        <td>{novel.author}</td>
                        <td>{novel.language}</td>
                        <td>
                          <span className={`${styles.badge} ${styles[novel.status.toLowerCase()]}`}>
                            {novel.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              onClick={() => setEditingNovel(novel)}
                              className={styles.editButton}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNovel(novel.id)}
                              className={styles.deleteButton}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Font Settings */}
          {activeTab === 'fonts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.sectionTitle}>Font Settings</h2>
              <div className={styles.settingsGrid}>
                <div className={styles.settingItem}>
                  <label>Primary Font</label>
                  <select
                    value={fontSettings.primaryFont}
                    onChange={(e) => handleFontSettingsUpdate('primaryFont', e.target.value)}
                    className={styles.select}
                  >
                    <option value="Noto Sans Tamil">Noto Sans Tamil</option>
                    <option value="Noto Sans Telugu">Noto Sans Telugu</option>
                    <option value="Noto Sans Devanagari">Noto Sans Devanagari</option>
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                  </select>
                </div>

                <div className={styles.settingItem}>
                  <label>Secondary Font</label>
                  <select
                    value={fontSettings.secondaryFont}
                    onChange={(e) => handleFontSettingsUpdate('secondaryFont', e.target.value)}
                    className={styles.select}
                  >
                    <option value="Segoe UI">Segoe UI</option>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                  </select>
                </div>

                <div className={styles.settingItem}>
                  <label>Font Size: {fontSettings.fontSize}</label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={parseInt(fontSettings.fontSize)}
                    onChange={(e) => handleFontSettingsUpdate('fontSize', `${e.target.value}px`)}
                    className={styles.slider}
                  />
                </div>

                <div className={styles.settingItem}>
                  <label>Line Height: {fontSettings.lineHeight}</label>
                  <input
                    type="range"
                    min="1.2"
                    max="2.0"
                    step="0.1"
                    value={fontSettings.lineHeight}
                    onChange={(e) => handleFontSettingsUpdate('lineHeight', e.target.value)}
                    className={styles.slider}
                  />
                </div>
              </div>

              <div className={styles.preview}>
                <h3>Preview</h3>
                <p style={{
                  fontFamily: fontSettings.primaryFont,
                  fontSize: fontSettings.fontSize,
                  lineHeight: fontSettings.lineHeight,
                }}>
                  This is a preview of your selected font settings. தமிழ் టెలుగు हिन्दी English
                </p>
              </div>
            </motion.div>
          )}

          {/* Authors Management */}
          {activeTab === 'authors' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.sectionTitle}>Manage Authors</h2>
              <p className={styles.comingSoon}>Coming soon...</p>
            </motion.div>
          )}

          {/* Theme Settings */}
          {activeTab === 'themes' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.sectionTitle}>Theme Settings</h2>
              <p className={styles.comingSoon}>Coming soon...</p>
            </motion.div>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.sectionTitle}>Manage Users</h2>
              <p className={styles.comingSoon}>Coming soon...</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
