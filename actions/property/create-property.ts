"use server";

import { cookies } from "next/headers";
import type { UploadApiResponse } from "cloudinary";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function createProperty(
  formData: FormData
) {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get("token")
        ?.value;

    if (!token) {
      return {
        success: false,
        message:
          "Não autorizado",
      };
    }

    const user =
      verifyToken(token);

    if (!user) {
      return {
        success: false,
        message:
          "Sessão inválida",
      };
    }

    if (
      user.role !== "ADMIN" &&
      user.role !== "REALTOR"
    ) {
      return {
        success: false,
        message:
          "Sem permissão",
      };
    }

    const files =
      formData.getAll(
        "images"
      ) as File[];

    const uploadedImages:
      string[] = [];

    for (const file of files) {
      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const result =
        await new Promise<UploadApiResponse>(
          (
            resolve,
            reject
          ) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder:
                    "nexhome",
                },
                (
                  error,
                  result
                ) => {
                  if (error) {
                    reject(
                      error
                    );
                    return;
                  }

                  if (!result) {
                    reject(
                      new Error(
                        "Upload sem resposta"
                      )
                    );
                    return;
                  }

                  resolve(
                    result
                  );
                }
              )
              .end(buffer);
          }
        );

      uploadedImages.push(
        result.secure_url
      );
    }

    const property =
      await prisma.properties.create({
        data: {
          title:
            String(
              formData.get(
                "title"
              )
            ),

          description:
            String(
              formData.get(
                "description"
              )
            ),

          price: Number(
            formData.get(
              "price"
            )
          ),

          area: Number(
            formData.get(
              "area"
            )
          ),

          bedrooms:
            Number(
              formData.get(
                "bedrooms"
              )
            ),

          bathrooms:
            Number(
              formData.get(
                "bathrooms"
              )
            ),

          garage_spots:
            Number(
              formData.get(
                "garage_spots"
              )
            ),

          city: String(
            formData.get(
              "city"
            )
          ),

          district:
            String(
              formData.get(
                "district"
              )
            ),

          address:
            String(
              formData.get(
                "address"
              )
            ),

          property_type:
            formData.get(
              "property_type"
            ) as
              | "HOUSE"
              | "APARTMENT"
              | "LAND"
              | "COMMERCIAL",

          latitude:
            formData.get(
              "latitude"
            )
              ? Number(
                  formData.get(
                    "latitude"
                  )
                )
              : null,

          longitude:
            formData.get(
              "longitude"
            )
              ? Number(
                  formData.get(
                    "longitude"
                  )
                )
              : null,

          owner_id:
            user.userId,
        },
      }); 

    await prisma.property_images.createMany({
  data: uploadedImages.map(
    (image_url) => ({
      image_url,

      property_id:
        property.id,
    })
  ),
});

    return {
      success: true,
      message:
        "Imóvel criado com sucesso",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Erro ao criar imóvel",
    };
  }
}
