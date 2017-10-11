// for solicit
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import CreatePerviewModal from

const ContentSolicit = ({}) => {

  const renderCreateButton = () => {
    return (
      <CreatePerviewModal
        currentUser={this.props.currentUser}
        results={this.props.itemResults}
        fetchUser={this.props.fetchUser}
        fetchResults={this.props.fetchItemResults}
        createItem={this.props.createItem}
        createPerview={this.props.createPerview}
        selectedItem={this.props.selectedItem}
        history={this.props.history}
      />
    )
  }

  return (
    <div className="solicit__container">
      {renderNavOptions}
    </div>
  )
}
