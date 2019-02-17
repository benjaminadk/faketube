import Popup from '../../styles/Popup'

const CommentMenu = ({ show, x, y, isAuthor, isOwner }) => (
  <Popup show={show} x={x} y={y + 40} width={isOwner && !isAuthor ? 17 : false}>
    {isAuthor ? (
      <React.Fragment>
        <div>Edit</div>
        <div>Delete</div>
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

export default CommentMenu
