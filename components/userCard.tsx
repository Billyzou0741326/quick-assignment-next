import * as models from '../lib/models'


interface UserCardProps {
  user: models.User
}

const UserCard = (props: UserCardProps): JSX.Element => {
  const { user } = props
  return (
    <div className="flex flex-col gap-4 w-full p-8 bg-white rounded-2xl shadow-md">
      {/* Info */}
      <div className="flex flex-col gap-1 w-full whitespace-nowrap">
        <span className="font-medium text-2xl tracking-wide">{user.username}</span>
        <span className="text-md tracking-wide">{user.name}</span>
        <span className="text-md">{user.email}</span>
      </div>
      {/* Website */}
      <div>
        <a
          href={user.website}
          target="_blank noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 ease-in-out duration-300"
        >
          {user.website}
        </a>
      </div>
    </div>
  )
}

export default UserCard
