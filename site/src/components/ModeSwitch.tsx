import type { Language, ReadingMode } from '../types/content'

interface ModeSwitchProps {
  language: Language
  mode: ReadingMode
  onChange: (mode: ReadingMode) => void
}

export default function ModeSwitch({ language, mode, onChange }: ModeSwitchProps) {
  return (
    <div className="mode-switch" aria-label={language === 'zh' ? '阅读模式' : 'Reading mode'}>
      <button
        type="button"
        aria-pressed={mode === 'guided'}
        onClick={() => onChange('guided')}
      >
        {language === 'zh' ? '学习路径' : 'Guided'}
      </button>
      <button
        type="button"
        aria-pressed={mode === 'reference'}
        onClick={() => onChange('reference')}
      >
        {language === 'zh' ? '研究索引' : 'Reference'}
      </button>
    </div>
  )
}
