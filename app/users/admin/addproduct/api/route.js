import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for raw file data
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const file = req.body; // Access the file data from the request body

  // File validation (replace with your validation logic)
  if (!file.type.startsWith('image/')) {
    return res.status(400).json({ message: 'Invalid file type' });
  }

  // Generate unique filename
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `uploads/${fileName}`; // Define upload directory

  try {
    await fs.writeFile(filePath, file.data); // Save the file
    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Upload failed' });
  }
};

export default handler;
