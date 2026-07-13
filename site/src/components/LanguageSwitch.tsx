import type { Language } from '../types/content'

interface LanguageSwitchProps {
  language: Language
  onChange: (language: Language) => void
}

export default function LanguageSwitch({ language, onChange }: LanguageSwitchProps) {
  return (
    <div className="language-switch" aria-label="Language">
      <button
        type="button"
        aria-label="中文"
        aria-pressed={language === 'zh'}
        onClick={() => onChange('zh')}
      >
        中
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        aria-label="English"
        aria-pressed={language === 'en'}
        onClick={() => onChange('en')}
      >
        EN
      </button>
    </div>
  )
}
