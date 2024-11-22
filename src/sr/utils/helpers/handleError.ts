import {toast} from 'react-toastify'

export function handleRejectedErrorMsg(error: any) {
  toast.error(error?.message)
}
