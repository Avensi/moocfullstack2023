import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
    const user = {
        username :"test",
        name : "test",
        password : "user1",
        id : "azerty"
    }
    const blog = {
        title : "Test rendering Blog view off",
        author : "User1",
        user :  "azerty",
        url : "ergerg",
        likes :1
    }
    render(<Blog blog={blog} user={user} />)

    const element = screen.getByText("Test rendering Blog view off User1")
    expect(element).toBeDefined()
})