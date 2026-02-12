const getCloudinaryUrl = async () => {
    const response = await fetch("/api/get-cloudinary-url");
    const data = await response.json();
    return data.url;
};

const uploadImage = async (formData) => {
    // const url = CLOUDINARY_URL;
    const url = await getCloudinaryUrl();
    const req = await fetch(url, {
        method: 'POST',
        body: formData,
    })
    const res = await req.json()
    const {secure_url} = res
    return secure_url
}

export {uploadImage}