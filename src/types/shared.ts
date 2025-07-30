export interface TableRowSetupProps<T> {
  item: T
}

export type FormActionResponse<T = any> = {
  success?: boolean
  statusCode?: number
  message?: string
  data?: T
  errors?: {
    description?: string[]
    status?: string[]
    [key: string]: string[] | undefined
  }
}

export type DeleteActionProps = (
  prevState: FormActionResponse,
  formData: FormData
) => Promise<FormActionResponse>

export interface TableRowClientWrapperProps<T> {
  item: T
  id: number
  path: string
  editFormComponent: (close: () => void) => React.ReactNode
  deleteAction: DeleteActionProps
}

export interface GenericDeleteFormProps {
  id: number
  path: string
  closeModal?: () => void
  deleteAction: DeleteActionProps
}
