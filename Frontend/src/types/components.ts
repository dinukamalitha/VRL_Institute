export interface InfoCardProps {
  title: string
  excerpt?: string
  date?: string
  time?: string
  category?: string
  author?: string
  location?: string
  type?: string
  isEvent?: boolean
  image?: string | string[]
}

export interface ResourcePerson {
  _id: string
  name: string
  photo: string;
  description: string
}

export interface FileUploadProps {
  accept?: string;
  label?: string;
  buttonText?: string;
  onFileSelect?: (file: File) => void;
  currentFile?: string | string[];
  required?: boolean;
  showPreview?: boolean;
  id?: string;
}

export interface PublicationsCardProps {
  category: string;
  image: string;
  count: number;
  width?: number;
  height?: number;
  isLink: boolean;
}

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
  height?: number | string;
  uploadFolder?: string;
}

export interface ToastState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}