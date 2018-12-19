/* eslint react/no-array-index-key: 0 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import MarketPositionsListOrphanedOrder from "modules/market/components/market-positions-list--orphaned-order/market-positions-list--orphaned-order";
import OpenOrdersOrder from "modules/market/components/market-orders-positions-table/open-orders-table--orders";

import Styles from "modules/market/components/market-orders-positions-table/open-orders-table.style";

export default class OpenOrdersTable extends Component {
  static propTypes = {
    openOrders: PropTypes.array,
    orphanedOrders: PropTypes.array.isRequired,
    cancelOrphanedOrder: PropTypes.func.isRequired
  };

  static defaultProps = {
    openOrders: []
  };

  render() {
    const { openOrders, orphanedOrders, cancelOrphanedOrder } = this.props;

    return (
      <div className={Styles.MarketOpenOrdersList}>
        <div className={Styles.MarketOpenOrdersList__table}>
          <ul className={Styles["OpenOrdersTable__table-header"]}>
            <li>Outcome</li>
            <li>Type</li>
            <li>
              <span>Quantity</span>
            </li>
            <li>Price</li>
            <li>Escrowed ETH</li>
            <li>Escrowed Shares</li>
            <li>
              <span>Action</span>
            </li>
          </ul>
          {openOrders.length === 0 &&
            orphanedOrders.length === 0 && (
              <div className={Styles.OpenOrdersTable__empty} />
            )}
          {(openOrders.length > 0 || orphanedOrders.length > 0) && (
            <div className={Styles["MarketPositionsList__table-body"]}>
              {openOrders.map((order, i) => (
                <OpenOrdersOrder
                  key={i}
                  outcomeName={order.name}
                  order={order}
                  pending={order.pending}
                  isExtendedDisplay={false}
                  isMobile={false}
                />
              ))}
              {(orphanedOrders || []).map(order => (
                <MarketPositionsListOrphanedOrder
                  key={order.orderId}
                  outcomeName={order.outcomeName || order.outcome}
                  order={order}
                  pending={false}
                  isExtendedDisplay={false}
                  outcome={order}
                  cancelOrphanedOrder={cancelOrphanedOrder}
                />
              ))}
            </div>
          )}
        </div>
        <div className={Styles.OpenOrdersTable__footer} />
      </div>
    );
  }
}