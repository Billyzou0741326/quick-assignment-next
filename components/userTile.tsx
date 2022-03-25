import * as models from '../lib/models'


interface UserTileProps {
  user: models.User
}

const UserTile = (props: UserTileProps): JSX.Element => {
  const { user } = props
  return (
    <div>
      <span>{ user.username }</span>
    </div>
  )
}

export default UserTile
