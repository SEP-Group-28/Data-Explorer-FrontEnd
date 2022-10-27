import React, { Component } from 'react'
import HeaderTwo from '../../components/headers/HeaderTwo';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import '../../assets/css/watchlist.css'
import { autocompleteClasses, Container } from '@mui/material';
import Token from '../../services/Token';
import WatchlistServices from '../../services/WatchlistServices';
import Loader from '../../components/loader/Loader';
import { Table } from 'react-bootstrap'

export default function Alert() {
    const dummy = 
    [
        {
            symbol:"BTC",
            value :"19219"
            //interval
        },
        {
            symbol:"SOL",
            value :"2832"
        },
        {
            symbol:"ETH",
            value :"2324"
        },
    ];
    <div className="Alerts">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Alerts</th>
          </tr>
        </thead>
        <tbody>
          {dummy.map((symbol) => {
            return (
              <tr key={symbol}>
                <td className="d-flex flex-row">
                    <p>{symbol}</p>
                  {/* <Icon name="btc" size={20}/> */}
                  {/* <button
                    className="type-btn d-flex align-items-center"
                    value={symbol.substr(0, symbol.indexOf("/"))}
                    onClick={() => {
                      handleClick(symbol.substr(0, symbol.indexOf("/")));
                    }}
                  >
                    <div className="type-btn-inter">
                      <img style={{width:"17px",height:"17px"}} src={symbol=="BTC/USDT"?BitcoinIcon: symbol=="ETH/USDT"? EthIcon:
                        symbol=="SOL/USDT"?SolanIcon : symbol=="BNB/USDT"? BinanceIcon: symbol=="AVAX/USDT"?AvaxIcon: symbol=="TRX/USDT"?TrxIcon:"none"}/>
                      <p >{symbol}</p>
                    </div>
                  </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
}
