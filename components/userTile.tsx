import * as models from '../lib/models'


interface UserTileProps {
  user: models.User
}

const UserTile = (props: UserTileProps): JSX.Element => {
  const { user } = props
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Avatar */}
      <div className="rounded-full w-32 md:w-full aspect-w-16 aspect-h-16 md:max-w-48 bg-white shadow-md">
      </div>
      {/* Info */}
      <div className="flex flex-col gap-2 w-full whitespace-nowrap">
        <span className="font-medium text-2xl tracking-wide">{user.username}</span>
        <span className="font-thin text-xl tracking-wide">{user.name}</span>
        <span className="text-md">{user.email}</span>
      </div>
      {/* Website */}
      <div>
        <a
          href={user.website}
          target="_blank noopener noreferrer"
        >
          {user.website}
        </a>
      </div>
    </div>
  )
}

export default UserTile
