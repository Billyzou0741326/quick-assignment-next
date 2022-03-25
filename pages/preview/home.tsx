import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'

import * as models from '../../lib/models'
import * as api from '../../lib/api'
import UserTile from '../../components/userTile'

interface HomeProps {
  users?: models.User[]
}

const Home: NextPage<HomeProps, {}> = (props) => {
  const { users = [] } = props

  return (
    <div className="min-h-screen max-w-screen bg-gray-200 py-8">
      {/* User list */}
      <div className="container mx-auto max-w-md flex flex-col bg-white rounded-lg divide-y">
        {users.map((user) => (
          <Link href={`/user/${user.id}`} passHref key={`${user.id}`}>
            <a className="hover:text-blue-500 ease-in-out duration-300">
              <UserTile user={user} />
            </a>
          </Link>
        ))}
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
