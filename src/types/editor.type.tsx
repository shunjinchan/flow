export interface IKeyboardEvent {
  altKey: boolean
  cmdKey: boolean
  ctrlKey: boolean
  keyCode: number
  keyName: string
  shiftKey: boolean
  innerHTML: string
  evt: React.KeyboardEvent<HTMLDivElement>
}

export type INodeCommand =
  | 'create'
  | 'destory'
  | 'bold'
  | 'underline'
  | 'italic'
  | 'indent-left'
  | 'indent-right'
  | 'move-up'
  | 'move-down'
  | 'focus-up'
  | 'focus-down'
