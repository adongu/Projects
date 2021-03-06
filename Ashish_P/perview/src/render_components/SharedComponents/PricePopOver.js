import React from 'react';
import moment from 'moment';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import '../../styles/stylesheets/SharedComponents/pricepopover.css';

const popoverClickRootClose = (
  <Popover
    id="popover-trigger-click-root-close"
    className="narrowperviews__popover"
  >
    <span>
      Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on perview.co at the time of purchase will apply to the purchase of this product.
    </span>
  </Popover>
)

const overlayTrigger = (
  <OverlayTrigger
    trigger="click"
    placement="bottom"
    rootClose
    overlay={popoverClickRootClose}
    className="narrowperviews__moreinfo-popover"
  >
    <span className="price__popover-icon">
      <i className="fa fa-question-circle-o" aria-hidden="true"></i>
    </span>
  </OverlayTrigger>
)
/*
  @PropType
  @param time - 0
*/
export const renderMoreInfoPopover = (time) => (
  <div className="narrowperviews__moreinfo">
    <span className="narrowperviews__moreinfo-text">
      {`as of ${moment(time).format("HH:mm a Z")}`}
    </span>

    {overlayTrigger}
  </div>
)
