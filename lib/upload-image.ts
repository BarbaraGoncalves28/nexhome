import type { UploadApiResponse } from "cloudinary";

import { cloudinary } from "./cloudinary";

export async function uploadImage(
  file: File
) {
  const bytes =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(bytes);

  return new Promise<string>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "nexhome",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            const uploadResult =
              result as
                | UploadApiResponse
                | undefined;

            if (!uploadResult) {
              reject(
                new Error(
                  "Upload sem resposta"
                )
              );
              return;
            }

            resolve(
              uploadResult.secure_url
            );
          }
        )
        .end(buffer);
    }
  );
}
