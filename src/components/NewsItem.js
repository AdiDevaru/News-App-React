import React from 'react'

const NewsItem = (props) => {

    let {title, description, imageUrl, link, author, source, publishedDate} = props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <div style={{display: 'flex', right: '0', position: 'absolute'}}> 
                <span className="badge rounded-pill bg-danger">
                  {source}
                </span>
            </div>  
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description.slice(0, 81)}...</p>
                <p className="card-text"><small className="text-muted">Published by <b>{author?author:"Unknown"}</b> <br />on {new Date(publishedDate).toGMTString()}</small></p>
                <a rel="noreferrer" href={link} className="btn btn-sm btn-dark" target="_blank">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem
