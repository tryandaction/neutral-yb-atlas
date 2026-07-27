import Equation from '../article/Equation'

interface MapEquationProps {
  source: string
  label?: string
}

export default function MapEquation({ source, label }: MapEquationProps) {
  return (
    <div className="map-equation" aria-label={label}>
      <Equation source={source} />
    </div>
  )
}
