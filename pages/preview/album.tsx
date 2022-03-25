import type { NextPage, GetServerSideProps } from 'next'
import React from 'react'

import * as models from '../../lib/models'
import * as api from '../../lib/api'
import AlbumSection from '../../components/albumSection'
import AlbumContext from '../../lib/context/album'

interface AlbumProps {
  albums?: models.Album[]
}

const Album: NextPage<AlbumProps, {}> = (props) => {
  const { albums = [] } = props

  return (
    <div className="min-h-screen max-w-screen bg-gray-200">
      <AlbumContext.Provider value={{ getPhotosByAlbumId: api.getPhotosByAlbumId }}>
        <AlbumSection
          albums={albums}
        />
      </AlbumContext.Provider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const albums = await api.getAlbumsByUserId(1)
  return {
    props: {
      albums,
    },
  }
}

export default Album
