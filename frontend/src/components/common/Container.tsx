import type { HTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from '../../utils/classNames'

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={classNames('page-container', className)} {...props}>
      {children}
    </div>
  )
}
