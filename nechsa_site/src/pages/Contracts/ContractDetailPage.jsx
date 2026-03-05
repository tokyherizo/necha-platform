import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, FileText, CheckCircle, Clock, PenLine, Archive, AlertCircle,
  Download, Users, Calendar, DollarSign, Shield, ExternalLink, Send,
  Building2, Tag,
} from 'lucide-react'
import { CONTRACT_STATUS_COLORS, formatDate } from '@/utils/helpers'

const mockContracts = {
  'CTR-001': {
    id: 'CTR-001', title: 'AI Supply Chain Partnership Agreement', type: 'Partnership',
    parties: [
      { name: 'Your Company', role: 'Party A', signed: true, signedDate: '2025-10-20', color: 'from-primary-600 to-blue-600' },
      { name: 'DataBridge Labs', role: 'Party B', signed: true, signedDate: '2025-10-20', color: 'from-cyan-600 to-blue-600' },
    ],
    status: 'signed', value: '$250,000', created: '2025-10-15', signed: '2025-10-20',
    expires: '2026-10-20', duration: '12 months',
    description: 'This Partnership Agreement establishes a formal collaboration between both parties for the joint development and deployment of AI-driven supply chain optimization solutions. The agreement covers intellectual property rights, revenue sharing, and mutual obligations.',
    keyTerms: [
      'Revenue split: 60/40 in favor of Party A',
      'IP ownership shared equally for joint developments',
      '3-month exclusivity clause in the logistics sector',
      '30-day notice required for termination',
      'Monthly performance review meetings',
    ],
    milestones: [
      { name: 'Project Kickoff', date: '2025-11-01', status: 'done' },
      { name: 'Phase 1 MVP Delivery', date: '2026-01-15', status: 'done' },
      { name: 'Pilot Deployment', date: '2026-03-01', status: 'current' },
      { name: 'Full Rollout', date: '2026-06-01', status: 'upcoming' },
      { name: 'Annual Review', date: '2026-10-15', status: 'upcoming' },
    ],
    amendments: [],
    notes: 'This is a strategic partnership with high priority. Escalate any issues directly to the executive team.',
  },
  'CTR-002': {
    id: 'CTR-002', title: 'Software Development Services Agreement', type: 'Services',
    parties: [
      { name: 'Your Company', role: 'Client', signed: true, signedDate: '2026-01-05', color: 'from-primary-600 to-blue-600' },
      { name: 'CloudScale Inc.', role: 'Provider', signed: true, signedDate: '2026-01-05', color: 'from-indigo-600 to-primary-600' },
    ],
    status: 'active', value: '$85,000', created: '2026-01-01', signed: '2026-01-05',
    expires: '2026-07-05', duration: '6 months',
    description: 'Service agreement for the development of cloud infrastructure automation tools. CloudScale Inc. will deliver a multi-cloud DevOps platform according to agreed specifications.',
    keyTerms: [
      'Fixed-price contract with milestone-based payments',
      'Bug fixes covered for 90 days post-delivery',
      'Weekly status reports required',
      'Source code ownership transfers upon full payment',
    ],
    milestones: [
      { name: 'Requirements & Design', date: '2026-01-20', status: 'done' },
      { name: 'Backend Development', date: '2026-03-01', status: 'current' },
      { name: 'Frontend Integration', date: '2026-04-15', status: 'upcoming' },
      { name: 'Testing & QA', date: '2026-06-01', status: 'upcoming' },
      { name: 'Final Delivery', date: '2026-07-01', status: 'upcoming' },
    ],
    amendments: ['Amendment 1: Scope expanded to include mobile API (Jan 20, 2026)'],
    notes: '',
  },
}

const statusConfig = {
  signed:  { icon: CheckCircle, color: 'text-green-400',  bg: 'bg-green-500/10',  label: 'Signed' },
  active:  { icon: CheckCircle, color: 'text-blue-400',   bg: 'bg-blue-500/10',   label: 'Active' },
  pending: { icon: Clock,       color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Pending Signature' },
  draft:   { icon: PenLine,     color: 'text-slate-400',  bg: 'bg-slate-500/10',  label: 'Draft' },
  expired: { icon: AlertCircle, color: 'text-red-400',    bg: 'bg-red-500/10',    label: 'Expired' },
  archived:{ icon: Archive,     color: 'text-slate-400',  bg: 'bg-slate-500/10',  label: 'Archived' },
}

const milestoneStatus = {
  done:     'bg-green-500/20 text-green-400 border-green-500/30',
  current:  'bg-primary-500/20 text-primary-400 border-primary-500/30',
  upcoming: 'bg-dark-600 text-slate-400 border-white/10',
}

export default function ContractDetailPage() {
  const { id } = useParams()
  const contract = mockContracts[id] || mockContracts['CTR-001']
  const status = statusConfig[contract.status] || statusConfig.draft
  const StatusIcon = status.icon

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Back */}
      <Link to="/contracts" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition">
        <ArrowLeft size={15} /> Back to Contracts
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={22} className="text-primary-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-mono mb-1">{contract.id}</p>
              <h1 className="text-xl font-black text-white">{contract.title}</h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.bg} ${status.color} border-current/30`}>
                  <StatusIcon size={12} />
                  {status.label}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Tag size={12} /> {contract.type}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={12} /> {contract.duration}
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg text-sm transition">
            <Download size={15} /> Download PDF
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          {[
            { icon: DollarSign, label: 'Contract Value', value: contract.value, color: 'text-green-400' },
            { icon: Calendar,   label: 'Signed Date',    value: contract.signed ? formatDate(contract.signed) : 'Not signed', color: 'text-primary-400' },
            { icon: Calendar,   label: 'Expires',        value: contract.expires ? formatDate(contract.expires) : 'N/A', color: 'text-yellow-400' },
            { icon: Users,      label: 'Parties',        value: `${contract.parties.length} parties`, color: 'text-secondary-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="text-center p-3 bg-dark-700/30 rounded-xl">
              <Icon size={16} className={`${color} mx-auto mb-1`} />
              <p className="text-xs text-slate-500 mb-0.5">{label}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-bold mb-3">Description</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{contract.description}</p>
          </motion.div>

          {/* Key Terms */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Shield size={16} className="text-primary-400" />
              Key Terms
            </h2>
            <ul className="space-y-2.5">
              {contract.keyTerms.map((term, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle size={14} className="text-primary-400 flex-shrink-0 mt-0.5" />
                  {term}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Milestones */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Clock size={16} className="text-primary-400" />
              Milestones
            </h2>
            <div className="space-y-3">
              {contract.milestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-700/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      m.status === 'done' ? 'bg-green-400' : m.status === 'current' ? 'bg-primary-400' : 'bg-slate-600'
                    }`} />
                    <span className="text-sm text-white font-medium">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{formatDate(m.date)}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${milestoneStatus[m.status]}`}>
                      {m.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Amendments */}
          {contract.amendments.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl p-6">
              <h2 className="text-white font-bold mb-4">Amendments</h2>
              {contract.amendments.map((a, i) => (
                <div key={i} className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl text-sm text-yellow-300">
                  {a}
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Parties */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Users size={16} className="text-primary-400" />
              Parties
            </h2>
            <div className="space-y-3">
              {contract.parties.map((party, i) => (
                <div key={i} className="p-3 bg-dark-700/30 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${party.color} flex items-center justify-center`}>
                      <Building2 size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{party.name}</p>
                      <p className="text-xs text-slate-500">{party.role}</p>
                    </div>
                  </div>
                  {party.signed ? (
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                      <CheckCircle size={12} />
                      Signed on {formatDate(party.signedDate)}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-yellow-400">
                      <Clock size={12} />
                      Awaiting signature
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card rounded-2xl p-6 space-y-3">
            <h2 className="text-white font-bold mb-4">Actions</h2>
            <button className="w-full btn-primary flex items-center justify-center gap-2 text-sm">
              <Send size={15} /> Send Reminder
            </button>
            <button className="w-full flex items-center justify-center gap-2 text-sm border border-white/10 hover:border-primary-500/30 text-slate-300 hover:text-white px-4 py-2.5 rounded-lg transition">
              <ExternalLink size={15} /> View Full Document
            </button>
            <button className="w-full flex items-center justify-center gap-2 text-sm border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 px-4 py-2.5 rounded-lg transition">
              <Archive size={15} /> Archive Contract
            </button>
          </motion.div>

          {/* Notes */}
          {contract.notes && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6">
              <h2 className="text-white font-bold mb-3">Internal Notes</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{contract.notes}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
