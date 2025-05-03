const { Catbox } = require("node-catbox");
const fs = require('fs-extra');
const axios = require('axios');
const catbox = new Catbox();

async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("Unable to find the file");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    return uploadResult;
  } catch (error) {
    throw new Error(`An error occurred during upload: ${error.message}`);
  }
}

module.exports = uploadToCatbox;
