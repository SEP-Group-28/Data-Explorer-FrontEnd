import React from 'react' 
import { Table } from 'react-bootstrap'

function CryptoTypes() {
  const handleClick=()=>{

  }

  const cryptoTypes=["BTC","ETH","LTC","AUR"]
  return (
    <div className="CryptoTypes">
      <Table striped hover variant="dark">
        <thead>
          <tr>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {cryptoTypes.map((type) => {
            return (
              <tr key={type}>
                <td className='d-flex flex-row'>
                  {/* <Icon name="btc" size={20}/> */}
                  <button
                    className="type-btn"
                    value={type}
                    onClick={handleClick}
                  >
                    {type}
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

export default CryptoTypes
