import { describe, it, expect } from "vitest"
import { cn, formatter } from "@/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })

  it("ignores falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar")
  })
})

describe("formatter", () => {
  it("formats a number as USD currency", () => {
    expect(formatter.format(9.99)).toContain("9.99")
    expect(formatter.format(9.99)).toContain("$")
  })

  it("formats zero", () => {
    expect(formatter.format(0)).toContain("0")
  })
})
