import {CSSProperties, PropsWithChildren} from "react";


interface TypographyProps extends PropsWithChildren {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
    sx?: CSSProperties
    
}


export const Typography = ({children, variant, sx}: TypographyProps) => {
    const Tag = variant || 'p';
    return (
        <Tag
            style={sx}
        >
            {children}
        </Tag>
    )
}
