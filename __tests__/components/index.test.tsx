import React from "react"
import { render, screen } from "@testing-library/react"

describe("should run propertly", function () {
  it("should has value", function () {
    render(<h1 data-testid="headingMain">This is my shop</h1>)
    const element = screen.getByTestId("headingMain")
    expect(element).toHaveTextContent("This is my shop manage")
  })
})
