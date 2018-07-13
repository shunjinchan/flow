import * as React from 'react'
import { IKeyBinding } from '../../types/editor.type'
import BulletButton from '../BulletButton/BulletButton'
import SimpleEditor from '../SimpleEditor/SimpleEditor'

interface INodeTextProps {
  id: string
  text: string
  parentId: string
  updateText: (id: string, text: string, lazy?: boolean) => void
  createNode: (parentid: string) => string
  addChild: (id: string, childId: string) => void
  removeChild: (id: string, childId: string) => void
  destoryNode: (id: string) => void
}

interface INodeTextState {
  text: string
  keyCommand: IKeyBinding[]
}

class NodeText extends React.Component<INodeTextProps, INodeTextState> {
  private editor: React.Ref<{}>

  constructor(props: INodeTextProps) {
    super(props)
    this.handleKeydownEnter = this.handleKeydownEnter.bind(this)
    this.handleKeydownDelete = this.handleKeydownDelete.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.editor = React.createRef()
    this.state = {
      text: '',
      keyCommand: [
        {
          keys: 'enter',
          command: 'create',
          handler: this.handleKeydownEnter
        },
        {
          keys: 'delete',
          command: 'destory',
          handler: this.handleKeydownDelete
        },
        {
          keys: 'tab',
          command: 'indent-right',
          handler: this.handleKeydownTab
        }
      ]
    }
  }

  public render() {
    return (
      <div className="node-text">
        <div className="collapse-button" />
        <div className="expand-button" />
        <BulletButton />
        <div className="text-field">
          <SimpleEditor
            text={this.props.text}
            handleInput={this.handleInput}
            keyCommand={this.state.keyCommand}
          />
        </div>
      </div>
    )
  }

  private createNode() {
    const parentId =
      this.props.id === 'root' ? this.props.id : this.props.parentId
    const childId = this.props.createNode(parentId)
    this.props.addChild(parentId, childId)
  }

  private destoryNode() {
    this.props.destoryNode(this.props.id)
    this.props.removeChild(this.props.parentId, this.props.id)
  }

  private handleInput(evt: React.FormEvent) {
    this.setState({ text: evt.currentTarget.innerHTML })
    this.props.updateText(this.props.id, evt.currentTarget.innerHTML)
  }

  private handleKeydownEnter(evt: React.KeyboardEvent) {
    evt.preventDefault()
    if (this.props.text) {
      this.createNode()
    }
  }

  private handleKeydownDelete(evt: React.KeyboardEvent) {
    if (!this.state.text) {
      evt.preventDefault()
      this.destoryNode()
    }
  }

  private handleKeydownTab(evt: React.KeyboardEvent) {
    console.log(evt);
  }
}

export default NodeText
