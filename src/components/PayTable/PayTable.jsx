import React from 'react';
import { payTable, handTypeNames } from '../../utils/payTable';
import './PayTable.css';

const PayTable = ({ currentBet, currentHandType }) => {
  return (
    <div className="pay-table">
      <table>
        <tbody>
          {Object.entries(payTable).map(([handType, payouts]) => (
            handType !== 'NO_WIN' && (
              <tr 
                key={handType} 
                className={currentHandType === handType ? 'highlighted' : ''}
              >
                <td className="hand-name">{handTypeNames[handType]}</td>
                {payouts.map((payout, index) => (
                  <td 
                    key={index} 
                    className={index + 1 === currentBet ? 'current-bet' : ''}
                  >
                    {payout}
                  </td>
                ))}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayTable;
