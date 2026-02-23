import React, { useState, useEffect } from 'react';
import { X, Bell, Calendar, Activity, Heart, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import {
  NOTIFICATION_FILTERS,
  STATIC_NOTIFICATIONS,
  NOTIFICATION_PRIORITY_BORDER,
  NOTIFICATION_TYPE_COLOR,
} from '../data/HeaderData';

// Map icon name strings (stored in Data.js) to actual Lucide components
const ICON_MAP = { Heart, Calendar, Activity, CheckCircle2, Info, AlertCircle };
const getIconComponent = (iconType) => ICON_MAP[iconType] || Info;

const Notifications = ({ onClose, healthData, onOpenSettings, getUnreadCount }) => {
  const [filter, setFilter] = useState('all');

  const generateNotifications = () => {
    const notifications = [...STATIC_NOTIFICATIONS];
    const now = new Date();

    // Medication reminders – one per active medication
    if (healthData.medications) {
      healthData.medications.forEach((med) => {
        notifications.push({
          id:       `med-${med.id}`,
          type:     'medication',
          iconType: 'Heart',
          title:    'Medication Reminder',
          message:  `Time to take ${med.name} - ${med.dosage}`,
          time:     '2 hours ago',
          priority: 'high',
          read:     false,
        });
      });
    }

    // Appointment reminders – only within next 7 days
    if (healthData.appointments) {
      healthData.appointments.forEach((apt) => {
        const aptDate  = new Date(apt.date);
        const daysUntil = Math.ceil((aptDate - now) / (1000 * 60 * 60 * 24));
        if (daysUntil >= 0 && daysUntil <= 7) {
          notifications.push({
            id:       `apt-${apt.id}`,
            type:     'appointment',
            iconType: 'Calendar',
            title:    'Upcoming Appointment',
            message:  `${apt.type} appointment with ${apt.doctor} in ${daysUntil} days`,
            time:     '5 hours ago',
            priority: daysUntil <= 1 ? 'high' : 'medium',
            read:     false,
          });
        }
      });
    }

    return notifications;
  };

  const loadNotifications = () => {
    const saved = localStorage.getItem('healthtrack-notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fall through */ }
    }
    return generateNotifications();
  };

  const [notifications, setNotifications] = useState(loadNotifications);

  useEffect(() => {
    localStorage.setItem('healthtrack-notifications', JSON.stringify(notifications));
    if (getUnreadCount) {
      getUnreadCount(notifications.filter((n) => !n.read).length);
    }
  }, [notifications, getUnreadCount]);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all')    return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const markAsRead    = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllAsRead = ()   => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const deleteNotif   = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 border-4 border-stone-700 w-full max-w-3xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-stone-700">
          <div className="flex items-center gap-3">
            <Bell size={28} className="text-orange-500" />
            <h1 className="text-2xl font-bold text-white">NOTIFICATIONS</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        {/* Filters — rendered via map() from NOTIFICATION_FILTERS */}
        <div className="flex items-center justify-between p-4 border-b-2 border-stone-700 bg-stone-900">
          <div className="flex gap-2 flex-wrap">
            {NOTIFICATION_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 font-bold transition-colors ${
                  filter === f.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-sm text-orange-500 hover:text-orange-400 font-bold">
              Mark all as read
            </button>
          )}
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-500">
              <Bell size={64} className="mb-4" />
              <p className="text-lg font-bold">No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notif) => {
                const Icon         = getIconComponent(notif.iconType);
                const borderClass  = NOTIFICATION_PRIORITY_BORDER[notif.priority] || NOTIFICATION_PRIORITY_BORDER.default;
                const iconClass    = NOTIFICATION_TYPE_COLOR[notif.type]           || NOTIFICATION_TYPE_COLOR.default;
                return (
                  <div
                    key={notif.id}
                    className={`bg-stone-900 border-l-4 ${borderClass} p-4 ${notif.read ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${iconClass} mt-1`}><Icon size={24} /></div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-white">{notif.title}</h3>
                          <span className="text-xs text-stone-500">{notif.time}</span>
                        </div>
                        <p className="text-sm text-stone-300">{notif.message}</p>
                        <div className="flex gap-3 mt-3">
                          {!notif.read && (
                            <button onClick={() => markAsRead(notif.id)} className="text-xs text-orange-500 hover:text-orange-400 font-bold">
                              Mark as read
                            </button>
                          )}
                          <button onClick={() => deleteNotif(notif.id)} className="text-xs text-red-500 hover:text-red-400 font-bold">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-4 border-stone-700 bg-stone-900">
          <div className="flex items-center justify-between text-sm text-stone-400">
            <span>{filteredNotifications.length} notifications</span>
            <button
              onClick={() => { onClose(); onOpenSettings(); }}
              className="text-orange-500 hover:text-orange-400 font-bold"
            >
              Notification Settings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
