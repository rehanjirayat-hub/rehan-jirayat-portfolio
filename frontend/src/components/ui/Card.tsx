import type { HTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from '../../utils/classNames'

type CardProps = PropsWithChildren<HTMLAttributes<HTMLElement>>

export function Card({ children, className, ...props }: CardProps) {
  return (
    <article className={classNames('surface-card', className)} {...props}>
      {children}
    </article>
  )
}
