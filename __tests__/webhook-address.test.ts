import { describe, it, expect } from "vitest"

function buildAddressString(address: {
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
} | null | undefined): string {
  const components = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]
  return components.filter(Boolean).join(", ")
}

describe("buildAddressString", () => {
  it("joins all present fields", () => {
    const result = buildAddressString({
      line1: "ul. Testowa 1",
      line2: "Apt 2",
      city: "Warszawa",
      state: "MZ",
      postal_code: "00-001",
      country: "PL",
    })
    expect(result).toBe("ul. Testowa 1, Apt 2, Warszawa, MZ, 00-001, PL")
  })

  it("skips null and undefined fields (filter(Boolean) vs filter(!== null))", () => {
    const result = buildAddressString({
      line1: "ul. Testowa 1",
      line2: undefined,
      city: "Warszawa",
      state: null,
      postal_code: "00-001",
      country: "PL",
    })
    expect(result).not.toContain("undefined")
    expect(result).not.toContain("null")
    expect(result).toBe("ul. Testowa 1, Warszawa, 00-001, PL")
  })

  it("returns empty string for null address", () => {
    expect(buildAddressString(null)).toBe("")
  })
})
