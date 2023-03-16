import  { Key, useState } from 'react'
import {  H2, Tab, Tabs } from '@blueprintjs/core';
import "./Search.css"
import { InputGroup } from "@blueprintjs/core"; 
import { useQuery } from 'react-query';
import axios from 'axios';
import useDebounce from '../../components/Debounce';
import SingleContent from '../../components/SingleContent/SingleContent';

type Props  = {
  key: Key; 
  id: number; 
  name:string;
  poster_path: string; 
  title: string; 
  first_air_date: string; 
  release_date: string; 
  media_type: string;
  overview:string;
  vote_average:string;
}

const Search = () => {
  const [type, setType] = useState("")
  const [searchText,setSearchText] = useState("")
  const [page,setPage] = useState(1)
 
  const debouncedSearchItem = useDebounce(searchText,1000)

   const {isLoading,error,data}= useQuery({
    queryKey:['search',debouncedSearchItem,type],
    queryFn: async () => {
    const {data} =await axios.get( `https://api.themoviedb.org/3/search/${type=="tv" ? "tv" : "movie"}?api_key=e192acb0aab966bdc48f1e29bde7b569&language=en-US&query=${searchText}&page=1&include_adult=false`
  )
    return data.results
}})
  isLoading && <h2>Loading</h2>
  error && "Unexpected error occur"+ error
  return (
    <div style={{width:"100%"}}>
      <div style={{width:"100%",marginLeft:'300px',marginBottom:"20px"}}>
      <InputGroup
                disabled={false}
                leftIcon="search"
                onChange={(e) => {
                  setSearchText(e.target.value) 
                }}
                value={searchText}
                placeholder="Search"
                style={{ borderColor:"white",padding:"30px",width:"60%",border:"none",backgroundColor:'unset',caretColor:"white",color:"white"}}
        />     
      </div>
      
      <Tabs
           animate={true}   
            fill={true}
            id="navbar"
            large={true}
            className="Align-tabs"
            onChange={(e:string) => {setType(e),setPage(1)}}
        >
            <Tab  style={{width:"20%",color:"white",fontSize:"20px",outline:"none"}} id="movie" title="MOVIES" />
            <Tab  style={{width:"20%",color:"white",fontSize:"20px",outline:"none"}} id="tv" title="TV SERIES" />

        </Tabs>
        <div className='Flexx'>
             { data && data.map((c:Props)=>(
               <SingleContent 
               key={c.id}
               id={c.id}
               poster={c.poster_path}
               title={c.title || c.name}
               date={c.first_air_date || c.release_date}
               media_type={type=="tv" ? "tv" : "movie"}
               overview={c.overview}
             />
             ))}
             
               {searchText &&  !data &&  
             (type=="tv" ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)} 
        </div>
    </div>
       
   
  )
}

export default Search
