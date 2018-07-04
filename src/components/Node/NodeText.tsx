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
import { updateNode } from '../../services/node.service'
import { BulletButton } from '../BulletButton/BulletButton'

interface INodeTextState {
  editorState: EditorState
}

interface INodeTextProps {
  id: string
  html: string
  createNode: () => string
  addChild: (id: string, childId: string) => void
}

export class NodeText extends React.Component<INodeTextProps, INodeTextState> {
  constructor(props: INodeTextProps) {
    super(props)
    this.state = {
      editorState: this.props.html
        ? EditorState.createWithContent(this.convertFromHTML())
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
        <div className="simple-editor">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            keyBindingFn={this.keyBindingFn}
          />
        </div>
      </div>
    )
  }

  private convertFromHTML() {
    const blocksFromHTML = convertFromHTML(this.props.html)
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    return state
  }

  private onChange(editorState: EditorState) {
    this.setState({ editorState })
    // updateNode({
    //   html: stateToHTML(editorState.getCurrentContent()),
    //   id: this.props.id
    // })
  }

  private handleKeyCommand(command: string): DraftHandleValue {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (command === 'create-node') {
      const childId = this.props.createNode()
      this.props.addChild(this.props.id, childId)
      return 'handled'
    }
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  private keyBindingFn(e: React.KeyboardEvent): string | null {
    // enter
    if (e.keyCode === 13) {
      return 'create-node'
    }
    return getDefaultKeyBinding(e)
  }
}
