import { Disclosure } from "@headlessui/react"

import * as models from '../lib/models'
import * as api from '../lib/api'
import ChevronRight from "./icons/chevron-right"
import AlbumItem from './albumItem'
import AlbumContext from '../lib/context/album'


interface AlbumProps {
  albums?: models.Album[]
}

const AlbumSection = (props: AlbumProps): JSX.Element => {
  const { albums = [] } = props

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="w-full">
            <div className="px-6 py-2 flex flex-row items-center w-full border-l-4 border-green-500 rounded-r-full bg-white">
              <span className="text-2xl">Albums</span>
              <div className="flex-1"></div>
              {/*
                Use the `open` props to rotate the icon
              */}
              <ChevronRight className={`${open ? 'transform rotate-90' : ''}`} />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="p-4">
            <AlbumContext.Provider value={{ getPhotosByAlbumId: api.getPhotosByAlbumId }}>
              <div className="flex flex-col divide-y rounded-lg bg-white">
                {albums.map((album) => (
                  <AlbumItem
                    key={`${album.id}`}
                    album={album}
                  />
                ))}
              </div>
            </AlbumContext.Provider>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default AlbumSection
