import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import ChartServices from "../../services/ChartServices";


function StockTypes({ changeStockType }) {
  const [stockTypes, setStockTypes] = useState([]);

  useEffect(() => {
    getStockList();
  }, []);

  const getStockList = async () => {
    try {
      const stock = await ChartServices.getstocklist();

      setStockTypes(stock.data.data);
    } catch (error) {}
  };
  const handleClick = (type) => {
    changeStockType(type);
  };

  return (
    <div className="CryptoTypes">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {stockTypes.map((type) => {
            return (
              <tr key={type}>
                <td className="d-flex flex-row">
                  {/* <Icon name="btc" size={20}/> */}
                  <button
                    className="type-btn d-flex align-items-center"
                    value={type.substr(0, type.indexOf("/"))}
                    onClick={() => {
                      handleClick(type);
                    }}
                  >
                    <div className="type-btn-inter">
                      {/* <img
                        style={{ width: "17px", height: "17px" }}
                        src={
                          type == "BTC/USDT"
                            ? BitcoinIcon
                            : type == "ETH/USDT"
                            ? EthIcon
                            : type == "SOL/USDT"
                            ? SolanIcon
                            : type == "BNB/USDT"
                            ? BinanceIcon
                            : type == "AVAX/USDT"
                            ? AvaxIcon
                            : type == "TRX/USDT"
                            ? TrxIcon
                            : "none"
                        }
                      /> */}
                      <p>{type}</p>
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default StockTypes
