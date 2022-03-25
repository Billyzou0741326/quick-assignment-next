import React from 'react'
import Link from 'next/link'


interface LayoutProps {
  children?: React.ReactNode
}

const Layout = (props: LayoutProps): JSX.Element => {
  const { children = <></> } = props

  return (
    <div className="min-h-screen max-w-screen">
      <div className="px-8 py-4 flex flex-row w-full bg-slate-800 text-white">
        <div>
          <Link href="/" passHref>
            <a className="hover:text-gray-400 ease-in-out duration-300">
              Home
            </a>
          </Link>
        </div>
        <div className="grow"></div>
      </div>
      {children}
    </div>
  )
}


export default Layout
