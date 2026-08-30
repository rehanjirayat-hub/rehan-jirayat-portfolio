import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from '../../utils/classNames'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={classNames('button', `button-${variant}`, className)} type={type} {...props}>
      {children}
    </button>
  )
}
