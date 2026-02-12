// const url = CLOUDINARY_URL;

const uploadImage = async (formData) => {
    // const req = await fetch(url, {
    const req = await fetch("/api/cloudinary-config.js", {
        method: 'POST',
        body: formData,
    })
    const res = await req.json()
    const {secure_url} = res
    return secure_url
}

export {uploadImage}