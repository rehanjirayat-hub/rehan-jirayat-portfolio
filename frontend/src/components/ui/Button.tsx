import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from '../../utils/classNames'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonBaseProps {
  variant?: ButtonVariant
}

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & ButtonBaseProps>
type ButtonLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonBaseProps>

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button className={classNames('button', `button-${variant}`, className)} type={type} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ children, className, variant = 'primary', ...props }: ButtonLinkProps) {
  return (
    <a className={classNames('button', `button-${variant}`, className)} {...props}>
      {children}
    </a>
  )
}
