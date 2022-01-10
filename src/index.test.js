import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import React from "react";
import App from "./pokemon"
import { act } from 'react-dom/test-utils'

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
        
        act(() => {
            render(
                <App />,
                container
            )
        })

        await act(() => {
            fireEvent.click(screen.getByText("What is it???"))
        })
        
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("Display").textContent).toBe("Its Lazy Smurf")
    })
})