import {
  ContentState,
  convertFromHTML,
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils
} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import * as React from 'react'
import { updateNode } from '../../services/node'
import { BulletButton } from '../BulletButton/BulletButton'

interface INodeTextState {
  editorState: EditorState
}

interface INodeTextProps {
  id: string
  html: string
}

function keyBindingFn(e: React.KeyboardEvent): string | null {
  // enter
  if (e.keyCode === 13) {
    return 'add-node'
  }
  return getDefaultKeyBinding(e)
}

export class NodeText extends React.Component<INodeTextProps, INodeTextState> {
  constructor(props: any) {
    super(props)
    this.state = {
      editorState: this.props.html
        ? EditorState.createWithContent(this.convertFrmHTML())
        : EditorState.createEmpty()
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
            keyBindingFn={keyBindingFn}
          />
        </div>
      </div>
    )
  }

  private convertFrmHTML() {
    const blocksFromHTML = convertFromHTML(this.props.html)
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    return state
  }

  private onChange(editorState: EditorState) {
    this.setState({ editorState })
    updateNode({
      html: stateToHTML(editorState.getCurrentContent()),
      id: this.props.id
    })
  }

  private handleKeyCommand(command: string): DraftHandleValue {
    if (command === 'add-node') {
      return 'handled'
    }
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }
}
