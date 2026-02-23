import React from 'react';
import { Heart, Bell, Settings, UserCircle, LogOut } from 'lucide-react';
import { NAV_TABS, ACCENT_COLORS } from '../data/HeaderData';

const Header = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  onOpenNotifications,
  onOpenProfile,
  onLogout,
  notificationCount = 0,
  theme = { mode: 'dark', color: 'orange' },
  currentUser = null,
}) => {
  const accentColor = ACCENT_COLORS[theme.color] || ACCENT_COLORS.orange;
  const isDark = theme.mode === 'dark';

  const bgColor      = isDark ? '#1c1917' : '#ffffff';
  const textColor    = isDark ? '#f5f5f4' : '#1c1917';
  const secondaryText = isDark ? '#a8a29e' : '#57534e';
  const borderColor  = isDark ? '#44403c' : '#d6d3d1';

  return (
    <header style={{ backgroundColor: bgColor, borderBottom: `4px solid ${accentColor}` }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: accentColor }} className="p-3 border-2 border-white">
              <Heart size={28} fill="white" stroke="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: textColor }}>
                HEALTH<span style={{ color: accentColor }}>TRACK</span>
              </h1>
              <p className="text-xs uppercase tracking-wider" style={{ color: secondaryText }}>
                Medical Dashboard
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="px-3 py-2 border-2" style={{ borderColor }}>
                <p className="text-xs font-bold" style={{ color: textColor }}>{currentUser.username}</p>
                <p className="text-xs" style={{ color: secondaryText }}>
                  {currentUser.role.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            )}

            {/* Icon buttons mapped from config */}
            {[
              { onClick: onOpenNotifications, Icon: Bell,       ariaLabel: 'Notifications', badge: notificationCount, hoverColor: accentColor },
              { onClick: onOpenSettings,      Icon: Settings,   ariaLabel: 'Settings',      badge: 0,                hoverColor: accentColor },
              { onClick: onOpenProfile,       Icon: UserCircle, ariaLabel: 'User Profile',  badge: 0,                hoverColor: accentColor },
              { onClick: onLogout,            Icon: LogOut,     ariaLabel: 'Logout',        badge: 0,                hoverColor: '#ef4444'   },
            ].map(({ onClick, Icon, ariaLabel, badge, hoverColor }) => (
              <button
                key={ariaLabel}
                onClick={onClick}
                className="p-3 border-2 transition-all relative"
                style={{ borderColor, color: secondaryText }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = hoverColor;
                  e.currentTarget.style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.color = secondaryText;
                }}
                aria-label={ariaLabel}
                title={ariaLabel}
              >
                <Icon size={24} />
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex gap-1 overflow-x-auto">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 font-bold transition-colors whitespace-nowrap"
              style={{
                backgroundColor: activeTab === tab.id ? accentColor : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : secondaryText,
              }}
              onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = textColor; }}
              onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = secondaryText; }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
