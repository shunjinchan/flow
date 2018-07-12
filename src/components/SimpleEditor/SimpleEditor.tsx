import * as React from 'react'
import { Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { convertKeyName, detectKey } from '../../modules/keyboard'
import { IKeyboardEvent, INodeCommand } from '../../types/editor.type'

interface ISimpleEditor {
  text: string
  handleKeydownEnter?: (evt: React.KeyboardEvent) => void
  handleKeydownDelete?: (evt: React.KeyboardEvent) => void
  handleInput?: (evt: React.FormEvent) => void
}

interface IKeyCommand {
  keys: string
  handler: ((evt: React.KeyboardEvent) => void) | undefined
  command: INodeCommand | string
}

class SimpleEditor extends React.Component<ISimpleEditor> {
  private keyDownSubject: Subject<{}>
  private inputSubject: Subject<{}>

  constructor(props: any) {
    super(props)
    this.keyDownSubject = new Subject()
    this.inputSubject = new Subject()
    this.handleKeyDown()
    this.handleInput()
  }

  public render() {
    return (
      <div
        className="simple-editor"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
        onKeyDown={event => this.keyDownSubject.next(event)}
        onInput={event => this.inputSubject.next(event)}
      />
    )
  }

  private registerShortcut(evt: IKeyboardEvent) {
    const keyCommand: IKeyCommand[] = [
      {
        keys: 'enter',
        command: 'create',
        handler: this.props.handleKeydownEnter
      },
      {
        keys: 'delete',
        command: 'destory',
        handler: this.props.handleKeydownDelete
      },
      {
        keys: 'cmd b',
        command: 'bold',
        handler: this.handleKeydownMetaAndB
      },
      {
        keys: 'cmd u',
        command: 'underline',
        handler: this.handleKeydownMetaAndU
      },
      {
        keys: 'cmd i',
        command: 'italic',
        handler: this.handleKeydownMetaAndI
      }
      // {
      //   keys: 'shift cmd b',
      //   handler: this.handleKeydownShiftAndMetaAndB.bind(this, data.evt)
      // }
    ]
    const monitor = (conf: object[], e: IKeyboardEvent) => {
      conf.forEach((keyConf: IKeyCommand) => {
        if (
          detectKey(keyConf.keys, e) &&
          typeof keyConf.handler === 'function'
        ) {
          keyConf.handler(e.evt)
        }
      })
    }

    monitor(keyCommand, evt)
  }

  private handleKeydownMetaAndB(evt: React.KeyboardEvent) {
    evt.preventDefault()
    this.format('bold')
  }

  private handleKeydownMetaAndU(evt: React.KeyboardEvent) {
    evt.preventDefault()
    this.format('underline')
  }

  private handleKeydownMetaAndI(evt: React.KeyboardEvent) {
    evt.preventDefault()
    this.format('italic')
  }

  private format(command: string, value = null) {
    document.execCommand(command, false, value)
  }

  private handleKeyDown() {
    const filterKeydowns = (
      evt: React.KeyboardEvent<HTMLDivElement>
    ): boolean => {
      const currentKeyName: string = evt.key.toLowerCase()
      const whileList: string[] = [
        'enter',
        'delete',
        'backspace',
        'b',
        'u',
        'i'
      ]
      return whileList.some(key => key === currentKeyName)
    }
    const mapKeydowns = (
      evt: React.KeyboardEvent<HTMLDivElement>
    ): IKeyboardEvent => {
      return {
        altKey: evt.altKey,
        cmdKey: evt.metaKey,
        ctrlKey: evt.ctrlKey,
        keyCode: evt.keyCode,
        keyName: convertKeyName(evt),
        shiftKey: evt.shiftKey,
        innerHTML: evt.currentTarget.innerHTML,
        evt
      }
    }
    this.keyDownSubject
      .pipe(
        filter(filterKeydowns),
        map(mapKeydowns)
      )
      .subscribe(evt => {
        this.registerShortcut(evt)
      })
  }

  private handleInput() {
    this.inputSubject.subscribe(this.props.handleInput)
  }
}

export default SimpleEditor
