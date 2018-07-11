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
import BulletButton from '../BulletButton/BulletButton'

interface INodeTextState {
  editorState: EditorState
}

interface INodeTextProps {
  id: string
  text: string
  parentId: string
  updateText: (id: string, text: string) => void
  createNode: (parentid: string) => string
  addChild: (id: string, childId: string) => void
  removeChild: (id: string, childId: string) => void
  destoryNode: (id: string) => void
}

class NodeText extends React.Component<INodeTextProps, INodeTextState> {
  private editor: React.Ref<Editor>

  constructor(props: INodeTextProps) {
    super(props)
    this.state = {
      editorState:
        this.props.text &&
        convertFromHTML(this.props.text).contentBlocks !== null // 空白
          ? EditorState.createWithContent(this.convertFromHTML(this.props.text))
          : EditorState.createEmpty()
    }
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.keyBindingFn = this.keyBindingFn.bind(this)
    this.editor = React.createRef()
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
            ref={this.editor}
          />
        </div>
      </div>
    )
  }

  public componentDidMount() {
    this.focus()
  }

  private focus() {
    ;(this.editor as any).current.focus()
  }

  private convertFromHTML(text: string) {
    const blocksFromHTML = convertFromHTML(text)
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    return state
  }

  private onChange(editorState: EditorState) {
    this.setState({ editorState })
    this.props.updateText(
      this.props.id,
      stateToHTML(editorState.getCurrentContent())
    )
  }

  private handleKeyCommand(command: string): DraftHandleValue {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (command === 'create-node') {
      const parentId =
        this.props.id === 'root' ? this.props.id : this.props.parentId
      const childId = this.props.createNode(parentId)
      this.props.addChild(parentId, childId)
      return 'handled'
    }
    if (command === 'destory-node') {
      this.props.destoryNode(this.props.id)
      this.props.removeChild(this.props.parentId, this.props.id)
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
    if (
      e.keyCode === 8 &&
      convertFromHTML(this.props.text).contentBlocks === null
    ) {
      return 'destory-node'
    }
    return getDefaultKeyBinding(e)
  }
}

export default NodeText
