export const fileUpload = async (file) => {
    if (!file) return null;
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dgehvkp7x/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Could not upload file');
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        return null;
    }
};
