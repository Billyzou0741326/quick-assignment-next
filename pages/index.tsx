import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import * as models from '../lib/models'
import * as api from '../lib/api'
import UserTile from '../components/userTile'

interface HomeProps {
  users?: models.User[]
}

const Home: NextPage<HomeProps, {}> = (props) => {
  const { users = [] } = props

  return (
    <div className="w-screen min-h-screen">
      <div className="p-8 bg-green-200/20">
        {/* User list */}
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <UserTile key={`${user.id}`} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const users = await api.getUsers()
  return {
    props: {
      users,
    },
  }
}

export default Home
