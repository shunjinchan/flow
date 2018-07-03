import {
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  RichUtils
} from 'draft-js'
import * as React from 'react'
import { addNode } from '../../services/node'
import { BulletButton } from '../BulletButton/BulletButton'

interface IState {
  editorState: EditorState
}

export class NodeText extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }

  public render() {
    return (
      <div className="node-text">
        <div className="collapse-button" />
        <div className="expand-button" />
        <BulletButton />
        <div className="simple-text">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }

  private onChange(editorState: EditorState) {
    this.setState({ editorState })
    // addNode({ text: 'hahah' })
  }

  private handleKeyCommand(command: DraftEditorCommand): DraftHandleValue {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }
}
