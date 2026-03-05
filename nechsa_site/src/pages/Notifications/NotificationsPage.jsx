import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, CheckCircle, FileText, Users, Sparkles, MessageSquare,
  AlertCircle, ShoppingBag, Handshake, Trash2, CheckCheck, Filter,
} from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'

const allNotifications = [
  { id: 1,  type: 'partnership', icon: Handshake,     title: 'Partnership request accepted',       body: 'TechBridge Inc. has accepted your partnership request.',         time: '2 min ago',  read: false, category: 'partnerships' },
  { id: 2,  type: 'contract',    icon: FileText,       title: 'Contract ready to sign',             body: 'Contract #CTR-006 with GreenFuture Energy is ready for your signature.', time: '18 min ago', read: false, category: 'contracts' },
  { id: 3,  type: 'message',     icon: MessageSquare,  title: 'New message from DataBridge Labs',   body: '"We reviewed your proposal and are very interested in moving forward."',   time: '1h ago',     read: false, category: 'messages' },
  { id: 4,  type: 'ai',          icon: Sparkles,       title: 'AI found 5 new matches',             body: 'Your AI matching score increased. 5 new high-compatibility partners found.',time: '2h ago',     read: false, category: 'ai' },
  { id: 5,  type: 'project',     icon: Users,          title: 'New collaborator joined',            body: 'Yuki Tanaka joined your "AI Supply Chain" project as a contributor.',       time: '3h ago',     read: true,  category: 'projects' },
  { id: 6,  type: 'contract',    icon: CheckCircle,    title: 'Contract #CTR-045 signed',           body: 'All parties have signed the API Usage & Integration MOU.',                time: '5h ago',     read: true,  category: 'contracts' },
  { id: 7,  type: 'marketplace', icon: ShoppingBag,    title: 'New review on your listing',         body: 'FinTechBridge left a 5-star review on your "Analytics Suite" offering.',   time: '1d ago',     read: true,  category: 'marketplace' },
  { id: 8,  type: 'alert',       icon: AlertCircle,    title: 'Milestone deadline approaching',     body: '"Green Energy Dashboard" has a milestone due in 3 days.',                  time: '1d ago',     read: true,  category: 'projects' },
  { id: 9,  type: 'partnership', icon: Handshake,      title: 'New partnership proposal',           body: 'Pacific Finserv has sent you a partnership proposal. Review now.',          time: '2d ago',     read: true,  category: 'partnerships' },
  { id: 10, type: 'ai',          icon: Sparkles,       title: 'Weekly AI insights ready',           body: 'Your weekly partner intelligence report is now available.',                 time: '3d ago',     read: true,  category: 'ai' },
]

const categories = ['all', 'partnerships', 'contracts', 'messages', 'projects', 'ai', 'marketplace']

const typeColors = {
  partnership: 'bg-primary-500/15 text-primary-400',
  contract:    'bg-blue-500/15 text-blue-400',
  message:     'bg-green-500/15 text-green-400',
  ai:          'bg-secondary-500/15 text-secondary-400',
  project:     'bg-cyan-500/15 text-cyan-400',
  marketplace: 'bg-yellow-500/15 text-yellow-400',
  alert:       'bg-red-500/15 text-red-400',
}

export default function NotificationsPage() {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState(allNotifications)
  const [category, setCategory] = useState('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filtered = notifications.filter(n => {
    if (showUnreadOnly && n.read) return false
    if (category !== 'all' && n.category !== category) return false
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const deleteNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id))

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Bell size={22} className="text-primary-400" />
            Notifications
            {unreadCount > 0 && (
              <span className="text-sm font-bold bg-primary-600 text-white px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </h1>
          <p className="text-slate-400 text-sm mt-1">Stay up to date with your partnerships and activity</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 border border-primary-500/30 hover:border-primary-400/50 px-4 py-2 rounded-lg transition"
          >
            <CheckCheck size={15} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition capitalize ${
                category === cat
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                  : 'text-slate-400 hover:text-white border border-transparent hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
            showUnreadOnly
              ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
              : 'text-slate-400 border-transparent hover:border-white/10 hover:text-white'
          }`}
        >
          <Filter size={12} />
          Unread only
        </button>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-2xl p-16 text-center">
              <Bell size={40} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No notifications</p>
            </motion.div>
          ) : (
            filtered.map((notif, i) => {
              const Icon = notif.icon
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => markRead(notif.id)}
                  className={`glass-card rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:border-primary-500/30 transition group ${
                    !notif.read ? 'border-l-2 border-l-primary-500' : ''
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[notif.type]}`}>
                    <Icon size={18} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${notif.read ? 'text-slate-300' : 'text-white'}`}>
                        {notif.title}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-slate-500">{notif.time}</span>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{notif.body}</p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={e => { e.stopPropagation(); deleteNotif(notif.id) }}
                    className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition p-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
