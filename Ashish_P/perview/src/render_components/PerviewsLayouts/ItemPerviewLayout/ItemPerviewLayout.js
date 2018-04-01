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
            className="itemperview__itembox"
            >
            <Col sm={12} md={3}
            // className="itemperview__itemimgbox"
            >
              <img className="itemperview__itemimg" src={item.data.imageUrls.large.url} alt="Item"/>
            </Col>

            <Col
              sm={12} md={5}
              className="itemperview__iteminfobox"
              >
              <Col
                // sm={6}
                // md={6}
                className="itemperview__itemname"
                sm={12}
              >
                {item.data.title}
              </Col>
              <Col xsHidden smHidden md={12} className="filler">
              </Col>

              {/* <Row> */}
                <Col
                  sm={6}
                  md={6}
                  col-sm-push-6
                  // className="itemperview__itembuy"
                >
                  <Col
                    // className="flexcolumn itemperview__itemprice"
                  >
                    {`${item.data.listPrice.formattedAmount}`}
                  </Col>

                  <Col>
                    <a className="buy-btn" href={item.data.detailPageUrl} target="_blank" rel="noopener noreferrer">
                      Buy {!!(item.siteName) ? "on " + item.siteName : ""}
                    </a>
                  </Col>
                </Col>
              {/* </Row> */}
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
            className="itemperview__itemcontainer"
            key={`item-${perview.itemDto.id}_Perview-${perview.id}`}
            sm={6}
            md={4}
          >
            <div className="flexcolumn itemperview__perviewbox">
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
          {renderPerviews()}
          {renderPerviews()}
          {renderPerviews()}
        {/* </Col> */}
      </Row>
    </Grid>
  )
}

export default withRouter(ItemPerviewLayout)
