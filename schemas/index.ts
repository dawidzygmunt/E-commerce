import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const StoreSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
})

export const BillboardSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  showText: z.boolean(),
})

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  billboardId: z.string().min(1, { message: "Billboard is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
})

export const ColorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  value: z
    .string()
    .min(4, { message: "Value must be at least 4 characters" })
    .regex(/^#/, { message: "String must be a valid hex code" }),
})

export const SizeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  value: z.string().min(1, { message: "Value is required" }),
})

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  images: z
    .object({ url: z.string() })
    .array()
    .min(1, { message: "At least one image is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  colorId: z.string().min(1, { message: "Color is required" }),
  sizeId: z.string().min(1, { message: "Size is required" }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})
