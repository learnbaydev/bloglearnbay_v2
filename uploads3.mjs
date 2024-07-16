import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Log the environment variables to verify they are set
console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
console.log("BUCKET_NAME:", process.env.BUCKET_NAME);

// Create an S3 client
const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.BUCKET_NAME;

if (bucketName === "learnbay-ver") {
  async function uploadFileToS3(localPath, s3Key) {
    const fileContent = fs.readFileSync(localPath, { encoding: null });
    // Determine the Content-Type based on the file extension
    const contentType =
      mime.contentType(path.extname(localPath)) || "application/octet-stream";
    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      console.log(`Uploaded ${s3Key} successfully.`);
    } catch (error) {
      console.error(`Error uploading ${s3Key}:`, error);
    }
  }

  async function uploadFolderContentsToS3(localFolderPath, s3Path = "_next/static") {
    const items = fs.readdirSync(localFolderPath, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(localFolderPath, item.name);
      const currentS3Path = path.join(s3Path, item.name).replace(/\\/g, "/");

      if (item.isFile()) {
        await uploadFileToS3(itemPath, currentS3Path);
      } else if (item.isDirectory()) {
        await uploadFolderContentsToS3(itemPath, currentS3Path);
      }
    }
  }

  async function main() {
    const localFolderPath = path.join(process.cwd(), ".next/static");

    try {
      await uploadFolderContentsToS3(localFolderPath);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  main();
} else {
  console.log("Bucket name does not match 'learnbay-ver'. No action taken.");
}
