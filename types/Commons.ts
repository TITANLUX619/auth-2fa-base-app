declare type ToastType = 'default' | 'error' | 'success' | 'warning' | 'info'

declare type ToastProps =
  {
    type: ToastType;
    message?: string;
  }

declare type Result<DataType> = {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
  data?: DataType;
}

declare type ServerActionResult<DataType> = Promise<Result<DataType> | { error: string } | undefined>