import React from "react"
import { render, screen } from "@testing-library/react"

import Home from "@/app/page"

describe("should run propertly", function () {
  it("should has value", function () {
    render(<Home />)
    const element = screen.getByTestId("headingMain")
    expect(element).toHaveTextContent("This is my shop manage")
  })
})
