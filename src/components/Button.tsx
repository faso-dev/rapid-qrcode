import {CSSProperties, PropsWithChildren} from "react";


export interface IButtonProps extends PropsWithChildren {
    sx?: CSSProperties
    className?: string
    onClick?: () => void
}


export const Button = ({children, sx, onClick, className}: IButtonProps) => {
    return (
        <button
            className={className}
            onClick={onClick}
            style={sx}
        >
            {children}
        </button>
    )
}
