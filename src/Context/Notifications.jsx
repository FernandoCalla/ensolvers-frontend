import { Alert, Snackbar } from '@mui/material'
import { useContext, createContext, useState } from 'react'

export const NotificactionsContext = createContext()
const NotificationsProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('success')
  const [message, setMessage] = useState('')
  const vertical = 'bottom'
  const horizontal = 'right'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <NotificactionsContext.Provider  value={{ setOpen, setMessage, setType }}>
      <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      key={vertical + horizontal}
      onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {message}
          </Alert>
      </Snackbar>
      {children}
    </NotificactionsContext.Provider>
  )
}

export default NotificationsProvider

export const useAlertMessage = () => {
  const { setOpen, setMessage, setType } = useContext(NotificactionsContext)
  const showSuccess = (mensaje) => {
    setMessage(mensaje)
    setType('success')
    setOpen(true)
  }
  const showError = (mensaje) => {
    setMessage(mensaje)
    setType('error')
    setOpen(true)
  }
  const showInfo = (mensaje) => {
    setMessage(mensaje)
    setType('info')
    setOpen(true)
  }
  const showWarning = (mensaje) => {
    setMessage(mensaje)
    setType('warning')
    setOpen(true)
  }
  return { showSuccess, showError, showInfo, showWarning }
}
