import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'

const faqs = {
  en: [
    {
      q: 'How does the AI matching work?',
      a: 'Our AI analyzes your company profile — sector, size, goals, past partnerships, and capabilities — and cross-references it against our database of 10,000+ companies. It scores compatibility on 12 dimensions including strategic alignment, complementary expertise, and market positioning.',
    },
    {
      q: 'Is my company data secure?',
      a: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II compliant and GDPR-ready. You control exactly what information is visible publicly vs. only to matched partners.',
    },
    {
      q: 'How much does Necha cost?',
      a: 'Necha offers a free plan with up to 5 active partnerships and limited AI matching. Pro plans start at $49/month for unlimited partnerships, full AI matching, and contract management. Enterprise pricing is available for large teams.',
    },
    {
      q: 'Can I manage contracts directly on the platform?',
      a: 'Yes. Necha includes a built-in contract management system where you can create, negotiate, sign, and track contracts entirely online. E-signatures are legally binding in 180+ countries.',
    },
    {
      q: 'What types of partnerships can I form?',
      a: 'Necha supports all B2B partnership types: joint ventures, API integrations, distribution agreements, co-development projects, white-label deals, referral partnerships, and more.',
    },
    {
      q: 'How long does it take to find a partner?',
      a: 'Most companies receive their first AI-matched partner recommendations within minutes of completing their profile. The average time to first partnership conversation is under 24 hours.',
    },
    {
      q: 'Can I list my services in the Marketplace?',
      a: 'Absolutely. Any verified company can list APIs, SaaS tools, consulting services, and other offerings in the Marketplace. Listings are free on the Starter plan and feature-ready on Pro.',
    },
  ],
  fr: [
    {
      q: 'Comment fonctionne le matching par IA ?',
      a: "Notre IA analyse votre profil d'entreprise — secteur, taille, objectifs, partenariats passés et compétences — et le compare à notre base de données de plus de 10 000 entreprises. Elle évalue la compatibilité sur 12 dimensions.",
    },
    {
      q: 'Mes données sont-elles sécurisées ?',
      a: 'Oui. Toutes les données sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Nous sommes conformes SOC 2 Type II et RGPD. Vous contrôlez exactement quelles informations sont visibles publiquement.',
    },
    {
      q: 'Combien coûte Necha ?',
      a: "Necha propose un plan gratuit avec jusqu'à 5 partenariats actifs. Les plans Pro commencent à 49$/mois pour des partenariats illimités, le matching IA complet et la gestion des contrats.",
    },
    {
      q: 'Puis-je gérer les contrats directement sur la plateforme ?',
      a: 'Oui. Necha inclut un système de gestion des contrats intégré où vous pouvez créer, négocier, signer et suivre les contrats entièrement en ligne. Les signatures électroniques sont juridiquement contraignantes.',
    },
    {
      q: "Quels types de partenariats puis-je former ?",
      a: 'Necha supporte tous les types de partenariats B2B : coentreprises, intégrations API, accords de distribution, projets de co-développement, accords marque blanche, partenariats de référence, et plus.',
    },
    {
      q: 'Combien de temps faut-il pour trouver un partenaire ?',
      a: "La plupart des entreprises reçoivent leurs premières recommandations de partenaires IA en quelques minutes après avoir complété leur profil. Le délai moyen pour la première conversation de partenariat est inférieur à 24 heures.",
    },
    {
      q: 'Puis-je lister mes services dans le Marketplace ?',
      a: 'Absolument. Toute entreprise vérifiée peut lister des APIs, outils SaaS, services de conseil dans le Marketplace. Les annonces sont gratuites sur le plan Starter.',
    },
  ],
}

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="border border-white/8 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/3 transition"
      >
        <span className="text-white font-semibold text-sm pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 border-t border-white/5">
              <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const { t } = useTranslation()
  const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en'
  const items = faqs[lang] || faqs.en

  return (
    <section id="faq" className="py-24 bg-dark-900 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/30 rounded-full px-4 py-1.5 mb-4">
            <HelpCircle size={14} className="text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">
              {lang === 'fr' ? 'Questions fréquentes' : 'FAQ'}
            </span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            {lang === 'fr' ? 'Tout ce que vous devez savoir' : 'Everything you need to know'}
          </h2>
          <p className="text-slate-400 text-lg">
            {lang === 'fr'
              ? "Des questions ? Nous avons les réponses."
              : "Have questions? We've got answers."}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 glass-card rounded-2xl"
        >
          <p className="text-white font-semibold mb-2">
            {lang === 'fr' ? 'Vous ne trouvez pas votre réponse ?' : "Still have questions?"}
          </p>
          <p className="text-slate-400 text-sm mb-4">
            {lang === 'fr' ? 'Notre équipe est disponible 24/7.' : 'Our team is available 24/7.'}
          </p>
          <a
            href="mailto:support@necha.io"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition"
          >
            {lang === 'fr' ? 'Contacter le support' : 'Contact Support'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
