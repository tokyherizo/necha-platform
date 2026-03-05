import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Send, Paperclip, Phone, Video, MoreHorizontal, Check, CheckCheck, Plus, ArrowLeft, Smile, MessageSquare } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const mockConversations = [
  { id: 1, name: 'DataBridge Labs',      country: '🇪🇪', lastMessage: "Sure! We can join your supply chain project.", time: '2m ago',    unread: 2, online: true,  pinned: true,  color: 'from-cyan-600 to-blue-600' },
  { id: 2, name: 'GreenFuture Energy',   country: '🇩🇪', lastMessage: 'Please review the contract draft when ready.',  time: '4h ago',    unread: 0, online: false, pinned: false, color: 'from-green-600 to-teal-600' },
  { id: 3, name: 'FinTechBridge',        country: '🇸🇬', lastMessage: "Let's schedule a call to discuss the API.",     time: 'Yesterday', unread: 1, online: true,  pinned: false, color: 'from-yellow-600 to-orange-600' },
  { id: 4, name: 'AfriTech Innovations', country: '🇬🇭', lastMessage: 'Thank you for the partnership proposal!',      time: '2d ago',    unread: 0, online: false, pinned: false, color: 'from-orange-500 to-amber-600' },
  { id: 5, name: 'BioSynth Corp',        country: '🇨🇭', lastMessage: 'The ML model results look very promising.',    time: '3d ago',    unread: 0, online: true,  pinned: false, color: 'from-violet-600 to-indigo-600' },
]

const mockMessages = {
  1: [
    { id: 1, from: 'them', text: "Hi! I saw your supply chain optimization project. Very interesting initiative!", time: '09:30', status: 'read' },
    { id: 2, from: 'me',   text: "Thanks! We're looking for data engineering expertise. Is that something your team could help with?", time: '09:35', status: 'read' },
    { id: 3, from: 'them', text: "Absolutely. We have 5 senior data engineers with experience in ML pipelines and distributed systems.", time: '09:37', status: 'read' },
    { id: 4, from: 'me',   text: "Great! Could you share a quick overview of your tech stack and past similar projects?", time: '09:40', status: 'read' },
    { id: 5, from: 'them', text: "Sure! We can join your supply chain project. Here's our portfolio: databridge.io/portfolio", time: '10:15', status: 'read' },
    { id: 6, from: 'me',   text: "Excellent. Let's schedule a call this week to discuss scope and timelines.", time: '10:18', status: 'delivered' },
  ],
  2: [
    { id: 1, from: 'them', text: "Hello! We reviewed your AI project listing.", time: '14:00', status: 'read' },
    { id: 2, from: 'me',   text: "Thanks for reaching out! What aspects interest you most?", time: '14:05', status: 'read' },
    { id: 3, from: 'them', text: 'Please review the contract draft when ready.', time: '14:20', status: 'read' },
  ],
}

const EMOJI_QUICK = ['👍', '🎉', '🚀', '💯', '❤️', '😊']

export default function MessagesPage() {
  const { id: chatId } = useParams()
  const [selectedConv, setSelectedConv] = useState(chatId ? parseInt(chatId) : 1)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages[1] || [])
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [mobileView, setMobileView] = useState('list')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { user } = useAuthStore()

  const conversation = mockConversations.find(c => c.id === selectedConv)
  const totalUnread = mockConversations.reduce((s, c) => s + c.unread, 0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    setMessages(mockMessages[selectedConv] || [
      { id: 1, from: 'them', text: 'Hello! How can I help you today?', time: '10:00', status: 'read' }
    ])
  }, [selectedConv])

  const selectConv = (id) => { setSelectedConv(id); setMobileView('chat') }

  const sendMessage = () => {
    if (!message.trim()) return
    const newMsg = { id: Date.now(), from: 'me', text: message, time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }), status: 'sent' }
    setMessages(prev => [...prev, newMsg])
    setMessage('')
    inputRef.current?.focus()
    setTimeout(() => setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)), 800)
  }

  const filteredConvs = mockConversations
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  const StatusIcon = ({ status }) => {
    if (status === 'sent')      return <Check size={11} className="text-slate-500" />
    if (status === 'delivered') return <CheckCheck size={11} className="text-slate-400" />
    if (status === 'read')      return <CheckCheck size={11} className="text-primary-400" />
    return null
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-0 glass-card rounded-2xl overflow-hidden animate-fade-in">

      {/* Conversation list */}
      <div className={`w-72 flex-shrink-0 border-r border-white/5 flex flex-col ${mobileView === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-base">Messages</h2>
              {totalUnread > 0 && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{totalUnread}</span>
              )}
            </div>
            <button className="w-7 h-7 rounded-lg bg-primary-600/20 text-primary-400 hover:bg-primary-600/40 transition flex items-center justify-center">
              <Plus size={14} />
            </button>
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search conversations..."
              className="w-full bg-dark-700/60 border border-white/5 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 transition" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map(conv => (
            <button key={conv.id} onClick={() => selectConv(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/3 transition text-left border-b border-white/3 ${selectedConv === conv.id ? 'bg-primary-600/10 border-l-2 border-l-primary-500' : ''}`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${conv.color} flex items-center justify-center text-sm`}>{conv.country}</div>
                {conv.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-dark-800 rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-sm font-semibold truncate ${conv.unread ? 'text-white' : 'text-slate-300'}`}>{conv.name}</p>
                  <span className="text-slate-500 text-[10px] flex-shrink-0 ml-1">{conv.time}</span>
                </div>
                <p className={`text-xs truncate ${conv.unread ? 'text-slate-300' : 'text-slate-500'}`}>{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">{conv.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {conversation ? (
        <div className={`flex-1 flex flex-col min-w-0 ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-dark-800/40">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileView('list')} className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 mr-1">
                <ArrowLeft size={18} />
              </button>
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${conversation.color} flex items-center justify-center text-sm`}>{conversation.country}</div>
                {conversation.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-dark-800 rounded-full" />}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{conversation.name}</p>
                <p className={`text-xs font-medium flex items-center gap-1 ${conversation.online ? 'text-green-400' : 'text-slate-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${conversation.online ? 'bg-green-400' : 'bg-slate-600'}`} />
                  {conversation.online ? 'Online now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"><Phone size={17} /></button>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"><Video size={17} /></button>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"><MoreHorizontal size={17} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
            {messages.map((msg, i) => {
              const isMe = msg.from === 'me'
              const showAvatar = !isMe && (i === 0 || messages[i - 1]?.from === 'me')
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${conversation.color} flex items-center justify-center text-xs flex-shrink-0 ${showAvatar ? 'visible' : 'invisible'}`}>
                      {conversation.country}
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-xs lg:max-w-md ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe ? 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-br-sm'
                           : 'bg-dark-600/80 text-slate-100 rounded-bl-sm border border-white/5'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] text-slate-500 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <span>{msg.time}</span>
                      {isMe && <StatusIcon status={msg.status} />}
                    </div>
                  </div>
                </motion.div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-5 pb-5 pt-2">
            <div className="flex items-center gap-2 bg-dark-700/60 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-primary-500/40 transition">
              <button className="text-slate-500 hover:text-slate-300 transition flex-shrink-0"><Paperclip size={17} /></button>
              <input ref={inputRef} value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none" />
              {/* Emoji */}
              <div className="relative flex-shrink-0">
                <button onClick={() => setShowEmoji(!showEmoji)} className="text-slate-500 hover:text-slate-300 transition">
                  <Smile size={17} />
                </button>
                <AnimatePresence>
                  {showEmoji && (
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 8 }}
                      className="absolute bottom-9 right-0 bg-dark-700 border border-white/10 rounded-xl p-2 flex gap-1.5 shadow-xl z-10"
                    >
                      {EMOJI_QUICK.map(e => (
                        <button key={e} onClick={() => { setMessage(prev => prev + e); setShowEmoji(false) }}
                          className="text-lg hover:scale-125 transition-transform">{e}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button onClick={sendMessage} disabled={!message.trim()}
                className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 rounded-lg flex items-center justify-center text-white transition disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center">
            <MessageSquare size={28} className="text-slate-600" />
          </div>
          <p className="text-slate-400 text-sm">Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  )
}
