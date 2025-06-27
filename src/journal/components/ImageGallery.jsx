import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images = [] }) => {
    return (
        <ImageList
            sx={{ width: '100vw', height: '50vh' }}
            cols={4}
            rowHeight={164}
        >
            {images.map((imgUrl) => (
                <ImageListItem key={imgUrl} sx={{ m: 0.5 }}>
                    <img
                        srcSet={`${imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
                        alt='Imagen de la nota'
                        loading='lazy'
                        style={{ borderRadius: 4 }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
