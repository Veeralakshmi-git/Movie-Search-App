import React, { Key } from 'react'
import '@blueprintjs/core/lib/css/blueprint.css';
import { Card, Button, H5 } from "@blueprintjs/core";
import "./SingleContent.css"
type Props  = {
    key: Key; 
    id: number; 
    poster: string; 
    title: string; 
    date:string;
    media_type: string;
    overview:string;
  }
  
const SingleContent = (items:Props) => {
  
  return (
    <div>     
      <Card className='media'>
        
          <img className="poster" src={items.poster ? `https://image.tmdb.org/t/p/w300/${items.poster}`: "https://www.movienewz.com/img/films/poster-holder.jpg"} alt="" />
          <strong className='"title'>{items.title}</strong>
          <span className='subTitle'>
            {items.media_type == "tv" ? "TV-Series" : "movie"}
            <span className='subTitle'>{items.date}</span>
          </span>
      </Card>
  </div>
  )
}

export default SingleContent
