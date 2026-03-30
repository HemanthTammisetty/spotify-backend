const { ImageKit, toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  try {
    const fileName = file?.originalname || `music_${Date.now()}`;
    const preparedFile = await toFile(file.buffer, fileName);

    const result = await imagekit.files.upload({
      file: preparedFile,
      fileName,
      folder: "yt-complete-backend/musics"
    });
    return result;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
}

module.exports = { uploadFile };