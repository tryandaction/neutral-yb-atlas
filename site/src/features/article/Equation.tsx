import katex from 'katex'
import 'katex/dist/katex.min.css'

interface EquationProps {
  source: string
}

export default function Equation({ source }: EquationProps) {
  let html: string | null
  try {
    html = katex.renderToString(source, {
      displayMode: true,
      throwOnError: true,
      strict: 'warn',
    })
  } catch {
    html = null
  }

  return html ? (
    <div className="equation" aria-label={`Equation: ${source}`} dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <pre className="equation equation--error">{source}</pre>
  )
}
