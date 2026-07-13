interface SectionRailProps {
  number: number
  total?: number
  label: string
}

export default function SectionRail({ number, total = 7, label }: SectionRailProps) {
  return (
    <aside className="section-rail" aria-label={label}>
      <strong>{String(number).padStart(2, '0')}</strong>
      <span>{label}</span>
      <small>{String(number).padStart(2, '0')} / {String(total).padStart(2, '0')}</small>
    </aside>
  )
}
