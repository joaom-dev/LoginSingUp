import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { deleteAccount, ApiError } from '../services/authApi'

export default function DeleteAccount({ onDeleted }) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  function closeDialog() {
    setOpen(false)
    setError('')
  }

  async function handleConfirm() {
    setDeleting(true)
    setError('')
    try {
      await deleteAccount() 
      onDeleted?.()
    } catch (err) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        setError('Sua sessão expirou. Saia da conta, entre novamente e tente de novo.')
      } else {
        setError(err instanceof ApiError ? err.message : 'Não foi possível excluir a conta. Tente novamente.')
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="danger-zone">
      <h3 className="danger-zone__title">Excluir conta</h3>
      <p className="field__hint">Todos os seus dados serão apagados de forma permanente.</p>
      <button type="button" className="btn btn--danger btn--block" onClick={() => setOpen(true)}>
        Excluir minha conta
      </button>

      <ConfirmDialog
        open={open}
        title="Tem certeza que deseja excluir sua conta?"
        description="Essa ação não pode ser desfeita. Sua conta e seus dados serão apagados de forma permanente."
        confirmLabel="Sim, excluir conta"
        loading={deleting}
        error={error}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />
    </div>
  )
}