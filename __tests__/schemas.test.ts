import { describe, it, expect } from "vitest"
import { LoginSchema, RegisterSchema, ColorSchema, SizeSchema } from "@/schemas"

describe("LoginSchema", () => {
  it("accepts valid credentials", () => {
    expect(LoginSchema.safeParse({ email: "a@b.com", password: "secret" }).success).toBe(true)
  })

  it("rejects invalid email", () => {
    expect(LoginSchema.safeParse({ email: "not-an-email", password: "x" }).success).toBe(false)
  })

  it("rejects empty password", () => {
    expect(LoginSchema.safeParse({ email: "a@b.com", password: "" }).success).toBe(false)
  })
})

describe("RegisterSchema", () => {
  it("accepts valid registration data", () => {
    expect(RegisterSchema.safeParse({ name: "Jan", email: "a@b.com", password: "pass" }).success).toBe(true)
  })

  it("rejects empty name", () => {
    expect(RegisterSchema.safeParse({ name: "", email: "a@b.com", password: "pass" }).success).toBe(false)
  })
})

describe("ColorSchema", () => {
  it("accepts a valid hex color", () => {
    expect(ColorSchema.safeParse({ name: "Red", value: "#ff0000" }).success).toBe(true)
  })

  it("rejects a value not starting with #", () => {
    expect(ColorSchema.safeParse({ name: "Red", value: "ff0000" }).success).toBe(false)
  })

  it("rejects value shorter than 4 chars", () => {
    expect(ColorSchema.safeParse({ name: "Red", value: "#ab" }).success).toBe(false)
  })
})

describe("SizeSchema", () => {
  it("accepts valid size", () => {
    expect(SizeSchema.safeParse({ name: "Large", value: "L" }).success).toBe(true)
  })

  it("rejects empty value", () => {
    expect(SizeSchema.safeParse({ name: "Large", value: "" }).success).toBe(false)
  })
})
