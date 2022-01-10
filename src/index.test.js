import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import React from "react";
import App from "./pokemon"

describe('Testing frontend...', () => {

    it("Tests the frontend without contacting the API", () => {
        jest.mock('fetch')
        let response = {"name": "Samwise Gamgee"}

        fetch.mockResolvedValue(response)

        render(
            <App />
        )
        fireEvent.click(screen.getByText("What is it???"))
        expect(screen.getByTestId("Display").textContent).toBe("Samwise Gamgee")
    })
})