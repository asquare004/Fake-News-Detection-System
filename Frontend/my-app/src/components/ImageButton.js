
import Button from '@mui/material/Button';

const ImageButton = ({ src, alt, onClick, style }) => {
    return (
        <Button
            className="hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 animate-frontToBack"
            color="primary"
            onClick={onClick}
            style={{
                marginY: "10px",
                marginRight: "10px",
                height: "60px",
                width: "70px",
                borderRadius: "10px",
                borderColor: "gray",
            }}
        >
            <img src={src} alt={alt} style={{ width: '70%', height: '80%' }} />
        </Button>

    );
};

export default ImageButton;
