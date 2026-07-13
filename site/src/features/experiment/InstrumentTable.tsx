import type { InstrumentEntry, Language } from '../../types/content'
import WikiText from '../wiki/WikiText'

interface InstrumentTableProps {
  language: Language
  instruments: InstrumentEntry[]
}

export default function InstrumentTable({ language, instruments }: InstrumentTableProps) {
  return (
    <div className="instrument-table" role="table" aria-label={language === 'zh' ? '仪器与选型' : 'Instruments and selection'}>
      <div className="instrument-table__head" role="row">
        <span role="columnheader">{language === 'zh' ? '工具 / 仪器' : 'Tool / instrument'}</span>
        <span role="columnheader">{language === 'zh' ? '作用' : 'Role'}</span>
        <span role="columnheader">{language === 'zh' ? '关键选型维度' : 'Selection dimensions'}</span>
      </div>
      {instruments.map((instrument) => (
        <div className="instrument-table__row" role="row" key={instrument.id}>
          <strong role="cell"><WikiText text={instrument.name[language]} language={language} /></strong>
          <span role="cell"><WikiText text={instrument.role[language]} language={language} /></span>
          <span role="cell"><WikiText text={instrument.selection[language]} language={language} /></span>
        </div>
      ))}
    </div>
  )
}
