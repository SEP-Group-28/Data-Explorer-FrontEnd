import React from 'react';
import { render, screen } from "@testing-library/react"
import Register from "../register/Register";

describe("Test register component", () =>{
    test("render register form with a button", async() => {
        render(<Register/>);
        const btnList = await screen.getByTestId('register-elem');
        expect(btnList).not.toBeNull();
    });
});
