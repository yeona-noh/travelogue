const { uploadFile } = require("../services/s3Service");

// Upload files to S3 and return URLs
exports.uploadPhotos = async (req, res) => {
  try {
    const files = req.files; // Files uploaded via multer middleware
    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const url = await uploadFile(file);
        return url;
      })
    );

    res.status(201).json({ message: "Files uploaded successfully", photoUrls });
  } catch (error) {
    console.error("Error uploading photos:", error.message);
    res.status(500).json({ error: "Photo upload failed" });
  }
};
