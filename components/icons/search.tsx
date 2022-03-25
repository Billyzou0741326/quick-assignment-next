interface SearchProps {
  className?: string;
}


const Search = (props: SearchProps): JSX.Element => {
  const { className: cl = '' } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${cl}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

export default Search
