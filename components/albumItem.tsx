import React from 'react'
import Image from 'next/image'

import * as models from '../lib/models'
import AlbumContext from '../lib/context/album'
import ChevronRight from './icons/chevron-right'


interface AlbumItemProps {
  album?: models.Album
}


const AlbumItem = (props: AlbumItemProps): JSX.Element => {
  const { album = null } = props
  const [ expanded, setExpanded ] = React.useState(false)
  const [ loading, setLoading ] = React.useState(false)
  const [ photos, setPhotos ] = React.useState<models.Photo[]>([])
  const { getPhotosByAlbumId } = React.useContext(AlbumContext)

  const lazyFetchPhotos = async () => {
    if (album !== null && (!photos || photos.length === 0)) {
      setLoading(true)
      const photos = await getPhotosByAlbumId(album.id)
      setLoading(false)
      setPhotos(photos)
    }
  }
  const onExpandedClick = (exp: boolean) => {
    exp && lazyFetchPhotos()
    setExpanded(exp)
  }

  return (
    <>
      {album && (
        <div className="flex flex-col p-2">
          <button
            className="flex flex-row items-center gap-2 w-full h-full hover:text-blue-500 ease-in-out duration-300"
            onClick={() => onExpandedClick(!expanded)}
          >
            {/* Title */}
            <span className="">{album.title}</span>
            <div className="grow"></div>
            {/* Button show photos */}
            <ChevronRight className={`${expanded ? 'transform rotate-90' : ''}`} />
          </button>
          {expanded && (
            <div className="flex flex-row flex-wrap gap-2 mt-4">
              {photos.map((photo) => (
                <div key={`${photo.id}`} className="relative w-28 h-28">
                  <Image
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    layout="fill"
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default AlbumItem
