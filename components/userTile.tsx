import * as models from '../lib/models'
import Tooltip from './tooltip'


interface UserTileProps {
  user: models.User
}

const UserTile = (props: UserTileProps): JSX.Element => {
  const { user } = props
  return (
    <Tooltip text={`${user.username}, ${user.email}`}>
      <div
        className="relative px-4 py-2"
      >
        <span>{user.name}</span>
      </div>
    </Tooltip>
  )
}

export default UserTile
