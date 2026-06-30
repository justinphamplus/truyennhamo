import { z } from "zod";

export const signUpSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, "Tên hiển thị cần ít nhất 2 ký tự.")
      .max(50, "Tên hiển thị tối đa 50 ký tự."),
    email: z.string().trim().email("Email không hợp lệ."),
    password: z
      .string()
      .min(8, "Mật khẩu cần ít nhất 8 ký tự.")
      .max(72, "Mật khẩu tối đa 72 ký tự."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Mật khẩu xác nhận chưa khớp.",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ."),
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

export const profileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Tên hiển thị cần ít nhất 2 ký tự.")
    .max(50, "Tên hiển thị tối đa 50 ký tự."),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .refine(
      (value) => value === "" || /^[a-z0-9_]{3,32}$/.test(value),
      "Tên người dùng gồm 3–32 ký tự: chữ thường, số hoặc dấu gạch dưới.",
    ),
  bio: z.string().trim().max(500, "Giới thiệu tối đa 500 ký tự."),
});

export function firstValidationError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Dữ liệu chưa hợp lệ.";
}
