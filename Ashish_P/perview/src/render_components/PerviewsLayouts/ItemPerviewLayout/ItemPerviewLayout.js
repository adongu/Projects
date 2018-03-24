import React from 'react';
import { withRouter } from 'react-router-dom';
import PerviewCard from '../PerviewCard/PerviewCard.js';
import { Grid, Row, Col } from 'react-bootstrap';
import "../../../styles/stylesheets/itemperviewlayout.css"

const ItemPerviewLayout = ({ currentUserId, perviews, bookmarkPerview, unbookmarkPerview, likePerview, unlikePerview, history, toRenderUserProfile }) => {

  const renderItemSection = () => {
    if (perviews && perviews.length > 0) {
      let item = perviews[0].itemDto;

      return (
        // <Row className="flexcolumn itemperview__itemcontainer">
          <Row
            // className="flexrow itemperview__itembox"
            >
            <Col sm={12} md={6}
            // className="itemperview__itemimgbox"
            >
              <img className="itemperview__itemimg" src={item.data.imageUrls.large.url} alt="Item"/>
            </Col>

            <Col
              sm={12} md={6}
              // className="flexcolumn itemperview__iteminfobox"
              >
              <Col
                // className="itemperview__itemname"
              >
                {item.data.title}
              </Col>

              <Row>
                <Col
                  sm={6}
                  col-sm-push-6
                  // className="itemperview__itembuy"
                >
                  <div className="flexcolumn itemperview__itemprice">
                    {`${item.data.listPrice.formattedAmount}`}
                    {/* {renderMoreInfoPopover()} */}
                  </div>

                  <a className="buy-btn" href={item.data.detailPageUrl} target="_blank" rel="noopener noreferrer">
                    Buy {!!(item.siteName) ? "on " + item.siteName : ""}
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        // </Row>
      )
    }
  }

  const renderPerviews = () => {
    if (perviews) {
      return perviews.map((perview) => {
        let user = perview.userDto;
        let item = perviews[0].itemDto;

        return (
          <Col
            className="flexcolumn itemperview__perviewbox"
            key={`item-${perview.itemDto.id}_Perview-${perview.id}`}
            sm={6}
            md={3}
          >
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
          </Col>
        )
      })
    }
  }

  return (
    <Grid
      // className="flexcolumn itemperview__layoutcontainer"
      >
      {renderItemSection()}
      <Row
        // className="itemperview__perviewcontainer"
        >
        {/* <Col
          xs={12}
          sm={12}
          md={12}
          className="itemperview__perviewcenterbox"
          > */}
          {renderPerviews()}
        {/* </Col> */}
      </Row>
    </Grid>
  )
}

export default withRouter(ItemPerviewLayout)
