import { useThemeStore } from '@/store/themeStore'
import translations from './translations'

export function useTranslation() {
  const { language } = useThemeStore()
  const t = translations[language] || translations.en
  return { t, language }
}
