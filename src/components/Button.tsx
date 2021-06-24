import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

// spread de propriedades. Todas as propriedades de Button estão sendo repassadas para o button do HTML da maneira que podemos ver abaixo, dentro do contexto.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props} />
    )
}