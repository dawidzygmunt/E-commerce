import { describe, it, expect } from "vitest"
import { API_ERRORS } from "@/lib/api-errors"

describe("API_ERRORS", () => {
  it("has static error strings", () => {
    expect(API_ERRORS.UNAUTHENTICATED).toBe("Unauthenticated")
    expect(API_ERRORS.UNAUTHORIZED).toBe("Unauthorized")
    expect(API_ERRORS.INTERNAL).toBe("Internal error")
  })

  it("idRequired generates a message with the entity name", () => {
    expect(API_ERRORS.idRequired("Product")).toBe("Product id is required")
    expect(API_ERRORS.idRequired("Category")).toBe("Category id is required")
  })
})
