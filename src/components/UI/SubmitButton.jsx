import Button from '@mui/material/Button';

export default function SubmitButton(props) {
    return (
        <Button 
            {...props} 
            variant="contained" 
            color="success"
            >
                {props.children}
        </Button>
    )
}