import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Vitals from './pages/Vitals';
import Medications from './pages/Medications';
import Appointments from './pages/Appointments';
import Activities from './pages/Activities';
import Goals from './pages/Goals';
import Login from './pages/Login';
import AddDataModal from './components/AddDataModal';
import Settings from './components/Settings';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialHealthData } from './utils/initialData';
import { isAuthenticated, logout, getCurrentUser } from './data/admindata';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [modalType, setModalType] = useState('');
  const [healthData, setHealthData] = useLocalStorage('healthManagementData', initialHealthData);
  const [theme, setTheme] = useLocalStorage('appTheme', {
    mode: 'dark',
    color: 'orange',
  });
  const [profileData, setProfileData] = useLocalStorage('userProfile', {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bloodType: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    allergies: '',
    conditions: '',
    height: '',
    weight: '',
  });

  // Check authentication on mount
  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsLoggedIn(authenticated);
    if (authenticated) {
      setCurrentUser(getCurrentUser());
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setCurrentUser(getCurrentUser());
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };


  const openAddModal = (type) => {
    setModalType(type);
    setShowAddModal(true);
  };

  const handleAddData = (type, newData) => {
    setHealthData(prev => ({
      ...prev,
      [type]: [...prev[type], { ...newData, id: Date.now() }]
    }));
    setShowAddModal(false);
  };

  const handleDeleteData = (type, id) => {
    setHealthData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const handleClearAllData = () => {
    setHealthData(initialHealthData);
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(healthData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthtrack-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveProfile = (newProfileData) => {
    setProfileData(newProfileData);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const getBackgroundColor = () => {
    return theme.mode === 'dark' ? '#0c0a09' : '#f5f5f4';
  };

  // Initialize notification count
  useEffect(() => {
    if (isLoggedIn) {
      const saved = localStorage.getItem('healthtrack-notifications');
      if (saved) {
        try {
          const notifications = JSON.parse(saved);
          const unreadCount = notifications.filter(n => !n.read).length;
          setNotificationCount(unreadCount);
        } catch (e) {
          setNotificationCount(3);
        }
      } else {
        setNotificationCount(3);
      }
    }
  }, [isLoggedIn]);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard healthData={healthData} openAddModal={openAddModal} />;
      case 'vitals':
        return <Vitals vitals={healthData.vitals} openAddModal={openAddModal} />;
      case 'medications':
        return <Medications medications={healthData.medications} onDelete={handleDeleteData} openAddModal={openAddModal} />;
      case 'appointments':
        return <Appointments appointments={healthData.appointments} onDelete={handleDeleteData} openAddModal={openAddModal} />;
      case 'activities':
        return <Activities activities={healthData.activities} onDelete={handleDeleteData} openAddModal={openAddModal} />;
      case 'goals':
        return <Goals goals={healthData.goals} onDelete={handleDeleteData} openAddModal={openAddModal} />;
      default:
        return <Dashboard healthData={healthData} openAddModal={openAddModal} />;
    }
  };

  // Show login page if not authenticated
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen" style={{ backgroundColor: getBackgroundColor() }}>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenSettings={() => setShowSettings(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenProfile={() => setShowProfile(true)}
        onLogout={handleLogout}
        notificationCount={notificationCount}
        theme={theme}
        currentUser={currentUser}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {showAddModal && (
        <AddDataModal 
          type={modalType} 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddData}
        />
      )}

      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
          healthData={healthData}
          profileData={profileData}
          onSaveProfile={handleSaveProfile}
          onClearData={handleClearAllData}
          onExportData={handleExportData}
          currentTheme={theme}
          onThemeChange={handleThemeChange}
        />
      )}

      {showNotifications && (
        <Notifications
          onClose={() => setShowNotifications(false)}
          healthData={healthData}
          onOpenSettings={() => {
            setShowNotifications(false);
            setShowSettings(true);
          }}
          getUnreadCount={setNotificationCount}
        />
      )}

      {showProfile && (
        <Profile
          onClose={() => setShowProfile(false)}
          profileData={profileData}
          onSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
}

export default App;
