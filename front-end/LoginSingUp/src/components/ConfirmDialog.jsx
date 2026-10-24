import { useEffect, useId, useRef } from 'react'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancelar',
  loading = false,
  error = '',
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) {
      dialog.showModal()
      cancelRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  function requestCancel() {
    if (!loading) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        requestCancel()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestCancel()
      }}
    >
      <div className="dialog__body">
        <h2 id={titleId} className="dialog__title">{title}</h2>
        <p id={descriptionId} className="dialog__text">{description}</p>

        {error && (
          <p className="field__error" role="alert">{error}</p>
        )}

        <div className="dialog__actions">
          <button ref={cancelRef} type="button" className="btn btn--secondary" onClick={requestCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={loading}>
            {loading && <span className="spinner" aria-hidden="true" />}
            {loading ? 'Excluindo…' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}