import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import * as models from '../lib/models'
import * as api from '../lib/api'
import UserTile from '../components/userTile'

interface HomeProps {
  users?: models.User[]
}

const Home: NextPage<HomeProps, {}> = (props) => {
  const { users = [] } = props

  return (
    <div className="bg-gray-200 py-8">
      <Head>
        <title>Home | Full Stack Assignment</title>
      </Head>

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
