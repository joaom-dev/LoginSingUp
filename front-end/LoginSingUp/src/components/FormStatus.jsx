import { InfoIcon } from './Icons'

// A região "status" fica sempre no DOM para que leitores de tela anunciem as mudanças.
export default function FormStatus({ message }) {
  return (
    <div role="status" aria-live="polite">
      {message && (
        <p className="form-status">
          <InfoIcon size={18} />
          <span>{message}</span>
        </p>
      )}
    </div>
  )
}
