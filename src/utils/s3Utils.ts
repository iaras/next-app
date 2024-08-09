import { ListObjectsV2Command, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "./s3Client";

export interface S3Image {
  key: string;
  url: string;
  category?: string;
  tags?: string[];
}

export async function getImagesFromS3(): Promise<S3Image[]> {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
  });

  try {
    const data = await s3Client.send(command);
    const images: S3Image[] = [];

    if (data.Contents) {
      for (const object of data.Contents) {
        if (object.Key) {
          const getObjectCommand = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: object.Key,
          });
          const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });

          // メタデータを取得
          const headObjectCommand = new HeadObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: object.Key,
          });
          const headObject = await s3Client.send(headObjectCommand);
          const metadata = headObject.Metadata;

          images.push({
            key: object.Key,
            url,
            category: metadata?.['category'] || 'uncategorized',
            tags: metadata?.['tags'] ? metadata['tags'].split(',') : [],
          });
        }
      }
    }

    return images;
  } catch (error) {
    console.error("Error fetching images from S3:", error);
    return [];
  }
}