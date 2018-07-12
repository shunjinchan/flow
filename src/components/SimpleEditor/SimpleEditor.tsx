import * as React from 'react'
import { Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { convertKeyName, detectKey } from '../../modules/keyboard'
import { IKeyboardEvent } from '../../types/editor.type'

interface ISimpleEditor {
  text: string
  handleKeydownEnter?: (evt: React.KeyboardEvent) => void
  handleKeydownDelete?: (evt: React.KeyboardEvent) => void
}

interface IKeyCommand {
  keys: string
  handler: ((evt: React.KeyboardEvent) => void) | undefined
}

class SimpleEditor extends React.Component<ISimpleEditor> {
  private keyDownSubject: Subject<{}>

  constructor(props: any) {
    super(props)
    this.keyDownSubject = new Subject()
    this.handleKeyDown.call(this)
  }

  public render() {
    return (
      <div
        className="simple-editor"
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: this.props.text }}
        onKeyDown={event => this.keyDownSubject.next(event)}
      />
    )
  }

  private registerShortcut(evt: IKeyboardEvent) {
    const keyCommand: IKeyCommand[] = [
      {
        keys: 'enter',
        handler: this.props.handleKeydownEnter
      },
      {
        keys: 'delete',
        handler: this.props.handleKeydownDelete
      },
      {
        keys: 'cmd b',
        handler: this.handleKeydownMetaAndB
      },
      {
        keys: 'cmd u',
        handler: this.handleKeydownMetaAndU
      },
      {
        keys: 'cmd i',
        handler: this.handleKeydownMetaAndI
      }
      // {
      //   keys: 'shift cmd b',
      //   handler: this.handleKeydownShiftAndMetaAndB.bind(this, data.evt)
      // }
    ]
    const monitor = (conf: object[], e: IKeyboardEvent) => {
      conf.forEach(
        (keyConf: {
          keys: string
          handler: (evt: React.KeyboardEvent) => void
        }) => {
          if (
            detectKey(keyConf.keys, e) &&
            typeof keyConf.handler === 'function'
          ) {
            keyConf.handler(e.evt)
          }
        }
      )
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
}

export default SimpleEditor
