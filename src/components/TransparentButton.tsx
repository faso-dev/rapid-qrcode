import {Button, IButtonProps} from "./Button";


export const TransparentButton = ({children, sx, onClick}: IButtonProps) => {
    return (
        <Button
            className="transparent-button"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: .5,
                background: 'transparent',
                borderRadius: '12px',
                maxWidth: '155px',
                width: '100%',
                color: '#fff',
                ...sx && sx
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}
