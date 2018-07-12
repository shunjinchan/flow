import * as React from 'react'
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
      text: ''
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
            handleKeydownEnter={this.handleKeydownEnter}
            handleKeydownDelete={this.handleKeydownDelete}
            handleInput={this.handleInput}
          />
        </div>
      </div>
    )
  }

  private handleKeydownEnter(evt: React.KeyboardEvent) {
    evt.preventDefault()
    if (this.props.text) {
      const parentId =
        this.props.id === 'root' ? this.props.id : this.props.parentId
      const childId = this.props.createNode(parentId)
      this.props.addChild(parentId, childId)
    }
  }

  private handleKeydownDelete(evt: React.KeyboardEvent) {
    if (!this.state.text) {
      evt.preventDefault()
      this.props.destoryNode(this.props.id)
      this.props.removeChild(this.props.parentId, this.props.id)
    }
  }

  private handleInput(evt: React.FormEvent) {
    this.setState({ text: evt.currentTarget.innerHTML })
    this.props.updateText(this.props.id, evt.currentTarget.innerHTML)
  }
}

export default NodeText
