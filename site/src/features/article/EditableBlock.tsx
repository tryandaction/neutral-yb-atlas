interface EditableBlockProps {
  value: string
  editing: boolean
  label: string
  onChange: (value: string) => void
}

export default function EditableBlock({ value, editing, label, onChange }: EditableBlockProps) {
  return (
    <p
      className={`editable-block${editing ? ' is-editing' : ''}`}
      contentEditable={editing}
      role={editing ? 'textbox' : undefined}
      aria-label={editing ? label : undefined}
      tabIndex={editing ? 0 : undefined}
      suppressContentEditableWarning
      onBlur={(event) => onChange(event.currentTarget.textContent ?? '')}
    >
      {value}
    </p>
  )
}
