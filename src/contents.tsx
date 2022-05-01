import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import { loadExpands } from './utils'
import { ContentsItem } from './contents-item'
import { useContentsOptions, useContentsActiveInfo } from './hooks'
import type { ContentsOnChange, ContentsOnClick, ContentsOption, ContentsOptionStruct } from './types'

export interface ContentsProps<T> {
  /** 类名 */
  className?: string
  /** 样式 */
  style?: React.CSSProperties
  /** 目录名 */
  name?: string
  /** 已选值 */
  value?: T
  /** 选项 */
  options?: ContentsOption<T>[] | ContentsOptionStruct<T>
  /** 禁止修改 */
  disabled?: boolean
  /** 点击项（包括非叶子节点） */
  onClick?: ContentsOnClick<T>
  /** 改变已选值（仅仅针对叶子节点） */
  onChange?: ContentsOnChange<T>
}

export interface ContentsRef {
  rootNode: HTMLDivElement | null
}

export const Contents = forwardRef<ContentsRef, ContentsProps<any>>(({
  className,
  style,
  name,
  value,
  disabled,
  onChange,
  onClick,
  ...props
}, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const expands = useMemo(() => loadExpands(name), [name])
  const options = useContentsOptions(props.options)
  const [active, actives] = useContentsActiveInfo(value, options)

  useImperativeHandle(ref, () => ({
    rootNode: rootRef.current
  }), [rootRef.current])

  return (
    <div
      ref={rootRef}
      style={style}
      className={className}
    >
      {options.tree.map((option, index) => (
        <ContentsItem
          key={index}
          name={name}
          disabled={disabled}
          option={option}
          active={active}
          options={options}
          actives={actives}
          expands={expands}
          onClick={onClick}
          onChange={onChange}
        />
      ))}
    </div>
  )
})