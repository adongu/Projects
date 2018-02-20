import React from 'react';
import { withRouter } from 'react-router-dom';
import PerviewCard from '../PerviewCard/PerviewCard.js';
import { Grid, Row, Col } from 'react-bootstrap';
import "../../../styles/stylesheets/itemperviewlayout.css"

// import {
//   renderMoreInfoPopover
// } from '../../SharedComponents/PricePopOver';

const ItemPerviewLayout = ({ currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history, toRenderUserProfile }) => {
  const renderItemSection = () => {
    if (perviews && perviews.length > 0) {
      let item = perviews[0].itemDto;

      return (
        <section className="flexcolumn itemperview__itemcontainer">
          <div className="flexrow itemperview__itembox">
            <div className="itemperview__itemimgbox">
              <img className="itemperview__itemimg" src={item.data.imageUrls.large.url} alt="Item"/>
            </div>

            <div className="flexcolumn itemperview__iteminfobox">
              <div className="itemperview__itemname">{item.data.title}</div>
              <div className="flexcolumn itemperview__itemprice">
                {`${item.data.listPrice.formattedAmount}`}
                {/* {renderMoreInfoPopover()} */}
              </div>

              <div className="itemperview__itembuy">
                <a className="buy-btn" href={item.data.detailPageUrl} target="_blank">
                  Buy {!!(item.siteName) ? "on " + item.siteName : ""}
                </a>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }

  const renderPerviews = () => {
    if (perviews) {
      return perviews.map((perview) => {
        let user = perview.userDto;
        let item = perviews[0].itemDto;

        return (
          <div className="flexcolumn itemperview__perviewbox" key={`item-${perview.itemDto.id}_Perview-${perview.id}`}>
            <PerviewCard
              item = {item}
              currentUserId = {currentUserId}
              perviewUser = { user }
              perview = {perview}
              likers = {perview.likers}
              bookmarkPerview = {bookmarkPerview}
              unbookmarkPerview = {unbookmarkPerview}
              likePerview = {likePerview}
              unlikePerview = {unlikePerview}
              history = {history}
              toRenderUserProfile = {toRenderUserProfile}
            />
          </div>
        )
      })
    }
  }

  return (
    <Grid className="flexcolumn itemperview__layoutcontainer">
      {renderItemSection()}
      <Row className="itemperview__perviewcontainer">
        <Col
          xs={12}
          sm={12}
          md={12}
          className="itemperview__perviewcenterbox"
          >
          {renderPerviews()}
        </Col>
      </Row>
    </Grid>
  )
}

export default withRouter(ItemPerviewLayout)
