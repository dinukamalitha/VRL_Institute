export interface EditNewsBlogModalProps {
  open: boolean
  onClose: () => void
  newsItem?: any
  width?: string | number
  height?: string | number
}

export interface AddNewsBlogModalProps {
  open: boolean
  onClose: () => void
  width?: string | number
  height?: string | number
}