import React, { Fragment, useState } from 'react'
import { Contents } from 'xueyan-react-contents'
import type { ContentsOption } from 'xueyan-react-contents'
import { SwitchTheme } from 'xueyan-react-style'
import { LabelLineIcon, ScanIcon } from 'xueyan-react-icon'

const options: ContentsOption<number>[] = [
  {
    value: 1,
    label: '选项一',
  },
  {
    value: 2,
    label: '选项二',
    disabled: true
  },
  {
    value: 3,
    label: '选项三选项三选项三选项三选项三选项三选项三选项三',
    disabled: true
  },
  {
    value: 4,
    label: '选项四',
    icon: <ScanIcon/>,
    children: [
      {
        value: 41,
        label: '子选项一',
        icon: <LabelLineIcon/>,
        href: 'https://baidu.com'
      },
      {
        value: 42,
        label: '子选项二',
      }
    ]
  },
  {
    value: 5,
    label: '选项五',
  },
  {
    value: 6,
    label: (
      <Fragment>
        <LabelLineIcon style={{ 
          verticalAlign: 'text-bottom', 
          marginRight: '4px' 
        }}/>
        <span>选项六</span>
      </Fragment>
    )
  }
]

export default function Main() {
  const [opts, setOpts] = useState(options)
  const [value, setValue] = useState<number|undefined>(3)
  const [disabled, setDisabled] = useState<boolean>(false)

  return (
    <div style={{ background: 'var(--base)', padding: '16px' }}>
      <SwitchTheme style={{ marginBottom: '16px' }}/>
      <div 
        style={{ color: 'var(--font)', marginBottom: '16px' }}
        onClick={() => setOpts(opts !== options ? options : [{
          label: '选项五',
          value: 4
        }])}
      >切换</div>
      <div 
        onClick={() => setDisabled(!disabled)}
        style={{ color: 'var(--font)', marginBottom: '16px' }}
      >{disabled ? '解除禁用' : '禁用'}</div>
      <Contents 
        style={{ width: '200px' }}
        value={value}
        options={opts} 
        disabled={disabled}
        onChange={(value, option) => {
          setValue(value)
          console.log(option)
        }}
        getHref={option => {
          return '#' + option.label
        }}
      />
    </div>
  )
}