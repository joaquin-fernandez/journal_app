import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dgehvkp7x',
    api_key: '281836876643665',
    api_secret: 'ESE4gH3E1eqv4O_uttQ2rCgyCKI',
    secure: true,
});

describe('Pruebas en fileUpload', () => {
    test('Debe de subir el archivo correctamente a Cloudinary', async () => {
        const imageUrl =
            'https://media.beehiiv.com/cdn-cgi/image/format=auto,onerror=redirect/uploads/publication/thumbnail/311f6e46-6679-4533-bab9-7a6b66bbc9ae/landscape_React_Digest-2.png';
        const resp = await fetch(imageUrl);

        const blob = await resp.blob();
        const file = new File([blob], 'image.png');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.api.delete_resources([imageId]);
    });

    test('Debe de devolver null si no se puede subir el archivo', async () => {
        const file = new File([], 'image.png');

        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});
