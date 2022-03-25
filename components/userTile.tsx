import * as models from '../lib/models'


interface UserTileProps {
  user: models.User
}

const UserTile = (props: UserTileProps): JSX.Element => {
  const { user } = props
  return (
    <div className="px-4 py-2">
      <span>{user.name}</span>
    </div>
  )
}

export default UserTile
