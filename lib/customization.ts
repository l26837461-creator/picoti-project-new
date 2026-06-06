import { supabase } from "./supabase";

export type ProductType = "pet" | "owner";
export type Gender = "male" | "female";

export type CustomizationFormData = {
  productType: ProductType;
  photos: File[];
  petName: string;
  gender: Gender | null;
  birthday: string;
  ownerPhone: string;
  ownerName: string;
};

export const INITIAL_CUSTOMIZATION: CustomizationFormData = {
  productType: "pet",
  photos: [],
  petName: "",
  gender: null,
  birthday: "",
  ownerPhone: "",
  ownerName: "",
};

const STORAGE_BUCKET = "pet-photos";

export async function submitCustomization(
  data: CustomizationFormData,
): Promise<string> {
  const orderId = crypto.randomUUID();
  const photoUrls: string[] = [];

  for (const file of data.photos) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${orderId}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) {
      throw new Error(`图片上传失败：${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path);

    photoUrls.push(urlData.publicUrl);
  }

  const { error: insertError } = await supabase.from("customizations").insert({
    id: orderId,
    product_type: data.productType,
    pet_name: data.petName,
    gender: data.gender,
    birthday: data.birthday,
    owner_phone: data.ownerPhone,
    owner_name: data.ownerName,
    photo_urls: photoUrls,
  });

  if (insertError) {
    throw new Error(`提交失败：${insertError.message}`);
  }

  return orderId;
}
