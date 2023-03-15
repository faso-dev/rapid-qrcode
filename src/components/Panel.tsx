import {CSSProperties, PropsWithChildren} from "react";


interface IPanelProps extends PropsWithChildren {
    sx?: CSSProperties
}


export const Panel = ({children, sx}: IPanelProps) => {
    return (
        <div
            style={{
                background: 'linear-gradient(103.95deg, rgba(160, 160, 160, 0.55) 5.43%, #3D3D3D 91.99%)',
                borderRadius: '12px',
                padding: '.5rem 1rem',
                position: 'absolute',
                bottom: '0',
                left: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                ...sx && sx,
            }}
        >
            {children}
        </div>
    )
}
