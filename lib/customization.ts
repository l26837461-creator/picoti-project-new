import { supabase } from "./supabase";

export type ProductType = "pet" | "owner";
export type Gender = "male" | "female";

export type CustomizationFormData = {
  productType: ProductType | null;
  photos: File[];
  petName: string;
  gender: Gender | null;
  birthday: string;
  ownerPhone: string;
  ownerName: string;
};

export const INITIAL_CUSTOMIZATION: CustomizationFormData = {
  productType: null,
  photos: [],
  petName: "",
  gender: null,
  birthday: "",
  ownerPhone: "",
  ownerName: "",
};

export function isInfoComplete(
  data: Pick<
    CustomizationFormData,
    "petName" | "gender" | "birthday" | "ownerPhone" | "ownerName"
  >,
): boolean {
  return (
    data.petName.trim() !== "" &&
    data.gender !== null &&
    data.birthday.trim() !== "" &&
    data.ownerPhone.trim() !== "" &&
    data.ownerName.trim() !== ""
  );
}

const STORAGE_BUCKET = "pet-photos";

export async function submitCustomization(
  data: CustomizationFormData,
): Promise<string> {
  if (!data.productType) {
    throw new Error("请选择定制卡片类型");
  }

  if (data.photos.length < 5) {
    throw new Error("请至少上传5张宠物照片");
  }

  if (!isInfoComplete(data)) {
    throw new Error("请填写完整的宠物及主人信息");
  }

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
