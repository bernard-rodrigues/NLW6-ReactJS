import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

// spread de propriedades. Todas as propriedades de Button estão sendo repassadas para o button do HTML da maneira que podemos ver abaixo, dentro do contexto.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}