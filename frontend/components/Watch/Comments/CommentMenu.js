import Popup from '../../styles/Popup'

export default ({ show, x, y, isAuthor, isOwner, onDeleteComment }) => (
  <Popup show={show} x={x} y={y + 40} width={isOwner && !isAuthor ? 17 : ''}>
    {isAuthor ? (
      <React.Fragment>
        <div>Edit</div>
        <div onClick={onDeleteComment}>Delete</div>
      </React.Fragment>
    ) : isOwner ? (
      <React.Fragment>
        <div>Pin</div>
        <div>Remove</div>
        <div>Report</div>
        <div>Hide user from channel</div>
      </React.Fragment>
    ) : (
      <div>Report</div>
    )}
  </Popup>
)
