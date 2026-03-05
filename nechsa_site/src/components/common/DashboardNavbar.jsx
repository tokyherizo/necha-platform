import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, Menu, Plus, MessageSquare, Sun, Moon, Handshake, FileText, Sparkles, CheckCheck } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { useTranslation } from '@/i18n/useTranslation'
import { getInitials } from '@/utils/helpers'

const notifPreview = [
  { id: 1, icon: Handshake,    title: 'Partnership request accepted',     time: '2 min ago',  read: false, color: 'text-primary-400 bg-primary-500/15' },
  { id: 2, icon: FileText,     title: 'Contract #CTR-006 ready to sign',  time: '18 min ago', read: false, color: 'text-blue-400 bg-blue-500/15' },
  { id: 3, icon: Sparkles,     title: 'AI found 5 new matches',           time: '2h ago',     read: false, color: 'text-secondary-400 bg-secondary-500/15' },
  { id: 4, icon: MessageSquare,title: 'New message from DataBridge Labs',  time: '3h ago',     read: true,  color: 'text-green-400 bg-green-500/15' },
]

export default function DashboardNavbar({ onMenuClick }) {
  const { user } = useAuthStore()
  const { theme, toggleTheme, toggleLanguage, language } = useThemeStore()
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState(notifPreview)
  const navigate = useNavigate()
  const notifRef = useRef(null)

  const unread = notifs.filter(n => !n.read).length

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate(`/companies?search=${encodeURIComponent(searchQuery)}`)
  }

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <header className="h-16 bg-dark-800/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-20">
      {/* Mobile menu */}
      <button onClick={onMenuClick} className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg">
        <Menu size={20} />
      </button>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.common.search}
            className="w-full bg-dark-700/60 border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 transition"
          />
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <Link to="/projects/create"
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={16} />
          {t.common.newProject}
        </Link>

        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="text-slate-400 hover:text-white text-xs font-bold px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
        >
          {language === 'en' ? 'FR' : 'EN'}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <Bell size={20} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 glass-card rounded-2xl shadow-xl border border-white/10 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className="text-white font-bold text-sm">Notifications</span>
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition">
                    <CheckCheck size={12} /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifs.map(n => {
                  const Icon = n.icon
                  return (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-white/3 transition cursor-pointer border-b border-white/3 ${!n.read ? 'bg-primary-600/5' : ''}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.color}`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-snug ${n.read ? 'text-slate-400' : 'text-white'}`}>{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0 mt-1.5" />}
                    </div>
                  )
                })}
              </div>
              <div className="px-4 py-2.5 border-t border-white/5">
                <Link to="/notifications" onClick={() => setShowNotifs(false)} className="text-xs text-primary-400 hover:text-primary-300 font-medium transition">
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <Link to="/messages" className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition">
          <MessageSquare size={20} />
        </Link>

        {/* Avatar */}
        <Link to="/settings" className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center cursor-pointer flex-shrink-0 hover:opacity-90 transition">
          <span className="text-white text-sm font-bold">
            {getInitials(user?.company_name || user?.name || 'U')}
          </span>
        </Link>
      </div>
    </header>
  )
}

