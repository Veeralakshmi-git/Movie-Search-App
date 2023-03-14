import  { useState } from 'react'
import {  Tab, Tabs } from '@blueprintjs/core';
import "./Search.css"
import { InputGroup } from "@blueprintjs/core"; 

const Search = () => {

  const [type, setType] = useState(0)
  return (
    <div style={{width:"100%"}}>
      <div style={{width:"100%",marginLeft:'300px',marginBottom:"20px"}}>
      <InputGroup
                disabled={false}
                leftIcon="search"
                onChange={() => { console.log("Called on change of value") }}
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
        >
            <Tab  style={{width:"20%",color:"white",fontSize:"20px",outline:"none"}} id="Home" title="Home" panel={
                    <p>Sample Content 1</p>
                } />
            <Tab  style={{width:"20%",color:"white",fontSize:"20px",outline:"none"}} id="TV" title="TV SERIES"  panel={
                    <p>Sample Content 11</p>
                } />

        </Tabs>
    </div>
       
   
  )
}

export default Search
