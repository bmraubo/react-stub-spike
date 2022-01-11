import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import React from "react";
import App from "./pokemon"

describe('Testing frontend...', () => {

    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
      
    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it("Tests the frontend without contacting the API", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({"name": "Lazy Smurf"})
            })
        )

        render(
            <App />,
            container
        )
        fireEvent.click(screen.getByText("What is it???"))
        
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        })

        await waitFor(() => {
            expect(screen.getByTestId("Display").textContent).toBe("Its Lazy Smurf")
        })
    })
})