import fs from "fs";
/**
 * Deletes a file from the server.
 * @param {string} filePath - The absolute or relative path to the file to be deleted.
 */
export const deleteUploadedFile = (filePath) => {
  // Ensure the provided filePath exists before attempting to delete
  filePath = `.${filePath}`;
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file at ${filePath}:`, err);
      } else {
        console.log(`File deleted successfully: ${filePath}`);
      }
    });
  } else {
    console.warn(`File not found at ${filePath}. Deletion skipped.`);
  }
};
