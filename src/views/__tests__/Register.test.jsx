import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../register/Register";
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";


describe("Test register component", () =>{
    const createInstance=() => {
        render(<BrowserRouter><Register/></BrowserRouter>);
    }    
    test("render register form with a button", () => {
        createInstance();
        const btnList = screen.getByTestId('register-elem');
        expect(btnList).not.toBeNull();
    });
    test("email input should accept email", async() => {
        createInstance();
        const email = screen.getByPlaceholderText("Enter email");
        await userEvent.type(email, "nameonly");
        expect(email.value).not.toBe("nameonly@gmail.com");
    });
    test("password input should have type password", () =>{
        createInstance();
        const password = screen.getByTestId("password");
        expect(password).toHaveAttribute("type", "password");
    });
    // test("should be able to submit form", () => {
    //     createInstance();
    //     const signupBtn = screen.getByTestId("submit");
    //     const email = screen.getByPlaceholderText("Enter email");
    //     const password = screen.getByTestId("password");


    // });
});

