import {Button, IButtonProps} from "./Button";


export const BlackButton = ({children, sx, onClick}: IButtonProps) => {
    return (
        <Button
            sx={{
                background: 'linear-gradient(103.95deg, rgba(160, 160, 160, 0.55) 5.43%, #3D3D3D 91.99%)',
                borderRadius: '12px',
                color: '#fff',
                maxWidth: '155px',
                width: '100%',
                ...sx && sx
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
    
}
