import { IKeyboardEvent } from '../types/editor.type';

interface Ikey {
  alias: string
  code: number | number[]
  name: string | string[]
}

const keys: Ikey[] = [
  {
    alias: 'delete',
    code: [8, 46],
    name: ['Backspace', 'Delete'],
  },
  // IE11 uses key names without `Arrow` prefix for arrow keys.
  {
    alias: 'up',
    code: 38,
    name: ['Up', 'ArrowUp'],
  },
  {
    alias: 'left',
    code: 37,
    name: ['Left', 'ArrowLeft'],
  },
  {
    alias: 'right',
    code: 39,
    name: ['Right', 'ArrowRight'],
  },
  {
    alias: 'down',
    code: 40,
    name: ['Down', 'ArrowDown'],
  },
  // 系统修饰键
  {
    alias: 'ctrl',
    code: 17,
    name: 'Control',
  },
  {
    alias: 'shift',
    code: 16,
    name: 'Shift',
  },
  {
    alias: 'alt',
    code: 18,
    name: 'Alt',
  },
  {
    alias: 'cmd',
    code: 91,
    name: 'Meta',
  }
]

/**
 * 转换按键名字，处理浏览器兼容与兼容 keypree.js
 */
function convertKeyName(evt: React.KeyboardEvent): string {
  let keyName = evt.key.toLowerCase()

  keys.forEach(key => {
    if (
      key.code === evt.keyCode ||
      (Array.isArray(key.code) && key.code.some(code => code === evt.keyCode))
    ) {
      keyName = key.alias
    }
  })

  return keyName
}

function detectKey(k: string, evt: IKeyboardEvent): boolean {
  const modifierKeys: string[] = ['alt', 'cmd', 'shift', 'ctrl']
  const confKeys: string[] = k.split(' ')

  // 匹配单个按键的情况，如 tab、up、down。需过滤修饰键被按下的情况
  if (confKeys.length === 1) {
    if (
      confKeys[0] === evt.keyName &&
      modifierKeys.every(key => evt[`${key}Key`] === false) // 没有按下修饰键
    ) {
      return true
    }
    return false
  }

  // 匹配多个按键，按键规则：修饰键（1或多）+普通按键（1）
  if (confKeys.length >= 2 && confKeys.some(key => key === evt.keyName)) {
    // 配置的修饰键
    const confModifierKeys = confKeys.filter(key => {
      return modifierKeys.some(modifierKey => modifierKey === key)
    })
    // 其他修饰键
    const otherModifierKeys = modifierKeys.filter(modifierKey => {
      return confModifierKeys.every(key => key !== modifierKey)
    })

    // 对比配置的修饰键与当前按下的修饰键是否一样
    if (
      confModifierKeys.every(key => evt[`${key}Key`] === true) &&
      otherModifierKeys.every(key => evt[`${key}Key`] === false)
    ) {
      return true
    }
    return false
  }

  return false
}

export { convertKeyName, detectKey }
