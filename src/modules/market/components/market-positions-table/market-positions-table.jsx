/* eslint-disable react/no-array-index-key */

import React, { Component } from "react";
import PropTypes from "prop-types";

import MarketPositionsListPosition from "modules/market/components/market-positions-table/market-positions-table--position";

import SharedStyles from "modules/market/components/market-orders-positions-table/open-orders-table.style";
import Styles from "modules/market/components/market-positions-table/market-positions-table.styles";
import {
  AWAITING_SIGNATURE,
  PENDING
} from "modules/transactions/constants/statuses";

export default class MarketPositionsList extends Component {
  static propTypes = {
    positions: PropTypes.array.isRequired,
    numCompleteSets: PropTypes.object,
    transactionsStatus: PropTypes.object.isRequired,
    sellCompleteSets: PropTypes.func.isRequired,
    marketId: PropTypes.string.isRequired,
    market: PropTypes.object.isRequired
  };

  static defaultProps = {
    numCompleteSets: null
  };

  render() {
    const {
      positions,
      numCompleteSets,
      transactionsStatus,
      sellCompleteSets,
      marketId
    } = this.props;

    const pendingCompleteSetsHash = `pending-${marketId}-${numCompleteSets &&
      numCompleteSets.fullPrecision}`;
    const pendingCompleteSetsInfo = transactionsStatus[pendingCompleteSetsHash];
    const status = pendingCompleteSetsInfo && pendingCompleteSetsInfo.status;
    let completeSetButtonText = "Sell Complete Sets";
    switch (status) {
      case AWAITING_SIGNATURE:
        completeSetButtonText = "Awaiting Signature...";
        break;
      case PENDING:
        completeSetButtonText = "Pending transaction...";
        break;
      default:
        completeSetButtonText = "Sell Complete Sets";
        break;
    }

    return (
      <section>
        <div
          ref={outcomeList => {
            this.outcomeList = outcomeList;
          }}
        >
          <div className={SharedStyles.MarketOpenOrdersList__table}>
            <ul className={SharedStyles["MarketOpenOrdersList__table-header"]}>
              <li>Outcome</li>
              <li>
                <span>Type</span>
              </li>
              <li>
                <span>Quantity</span>
              </li>
              <li>
                <span>Average Price</span>
              </li>
              <li>
                <span>
                  Unrealized <span />
                  P/L
                </span>
              </li>
              <li>
                <span>
                  Realized <span />
                  P/L
                </span>
              </li>
              <li>Action</li>
            </ul>
            {positions.length === 0 && (
              <div className={SharedStyles.MarketOpenOrdersList__empty} />
            )}
            <div className={SharedStyles.MarketOpenOrdersList__scrollContainer}>
              {positions.length > 0 && (
                <div className={SharedStyles["MarketOpenOrdersList__table-body"]}>
                  {positions &&
                    positions.map((position, i) => (
                      <MarketPositionsListPosition
                        key={i}
                        outcomeName={position.name}
                        position={position}
                        isExtendedDisplay={false}
                        isMobile={false}
                        marketId={marketId}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
          {numCompleteSets &&
            numCompleteSets.value > 0 && (
              <div className={Styles.MarketPositionsList__completeSets}>
                <span>{`You currently have ${
                  numCompleteSets.full
                } of all outcomes.`}</span>
                <button
                  onClick={e => {
                    sellCompleteSets(marketId, numCompleteSets, () => {});
                  }}
                  disabled={!!pendingCompleteSetsInfo}
                >
                  {completeSetButtonText}
                </button>
              </div>
            )}
        </div>
        <div className={SharedStyles.MarketOpenOrdersList__footer} />
      </section>
    );
  }
}