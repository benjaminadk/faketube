import { CheckCircle } from 'styled-icons/boxicons-solid/CheckCircle'
import { format } from 'date-fns'
import { CreatedByStyles } from './styles/CreatedBy'

export default ({ video }) => (
  <CreatedByStyles>
    <img src={video.user.image} />
    <div className="author-info">
      <div>
        <div>{video.user.name}</div>
        {video.user.verified ? <CheckCircle /> : null}
      </div>
      <div>Published on {format(new Date(video.createdAt), 'MMM do, y')}</div>
    </div>
  </CreatedByStyles>
)
