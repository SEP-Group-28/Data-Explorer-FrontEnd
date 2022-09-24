import React from 'react';
import { render, screen } from "@testing-library/react";
import AlertDetails from '../homeView/AlertDetails';
import CryptoSec from '../homeView/CryptoSec';
import HomeSubOne from '../homeView/HomeSubOne';
import StockSec from '../homeView/StockSec';

describe("Test HomeView component", () =>{
    it("render alert details", () => {
        render(<AlertDetails/>);
        const txt = screen.getByText("Subscribe to");
        expect(txt).toBeInTheDocument();
    });
    it("render Cypto section", () => {
        render(<CryptoSec/>);
        const txt = screen.getByTestId('cryptoDesc');
        expect(txt).toBeInTheDocument();
    });
    it("render HomeSub", () => {
        render(<HomeSubOne/>);
        const txt = screen.getByText("Make your predictions smartly");
        expect(txt).toBeInTheDocument();
    });
    it("render Stock section", () => {
        render(<StockSec/>);
        const txt = screen.getByTestId('stockDesc');
        expect(txt).toBeInTheDocument();
    });
});
