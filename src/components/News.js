import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';

import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const tempArticles = [
  {
    "source": {
      "id": null,
      "name": "SciTechDaily"
    },
    "author": null,
    "title": "Natural Sweetener Thaumatin Found To Have Powerful Anti-Inflammatory Properties - SciTechDaily",
    "description": "In a cellular test system, thaumatin's digestive products can promote acid secretion by human stomach cells and affect inflammatory responses. A recent study conducted by the Leibniz Institute for Food Systems Biology at the Technical University of Munich has…",
    "url": "https://scitechdaily.com/natural-sweetener-thaumatin-found-to-have-powerful-anti-inflammatory-properties/",
    "urlToImage": "https://scitechdaily.com/images/Artificial-Sweetener-Sugar-Substitute-Wooden-Spoon.jpg",
    "publishedAt": "2024-10-03T14:11:50Z",
    "content": "A new study from the Leibniz Institute reveals that bitter-tasting peptides are produced in the stomach during the digestion of the sweetener thaumatin, which can stimulate acid secretion and reduce … [+5500 chars]"
  },
  {
    "source": {
      "id": null,
      "name": "[Removed]"
    },
    "author": null,
    "title": "[Removed]",
    "description": "[Removed]",
    "url": "https://removed.com",
    "urlToImage": null,
    "publishedAt": "2024-10-03T13:36:10Z",
    "content": "[Removed]"
  },
  {
    "source": {
      "id": "cbs-news",
      "name": "CBS News"
    },
    "author": null,
    "title": "Marburg virus kills 11 in Rwanda. What to know about the Ebola-like outbreak and symptoms - CBS News",
    "description": "Rwanda declared an outbreak of the highly contagious Marburg virus​, a deadly hemorrhagic fever that has no authorized vaccine or treatment.",
    "url": "https://www.cbsnews.com/news/marburg-virus-what-to-know-symptoms/",
    "urlToImage": "https://assets3.cbsnewsstatic.com/hub/i/r/2023/02/15/57c35400-3673-496e-a729-8c47f4ee5afa/thumbnail/1200x630/ecc3c6752ef3be4c398245941b84b856/gettyimages-151035350.jpg?v=0736ad3ef1e9ddfe1218648fe91d6c9b",
    "publishedAt": "2024-10-03T12:55:21Z",
    "content": "Eleven people have died in Rwanda from the highly contagious Marburg virus, and 36 cases have been confirmed, the country's health ministry reported Tuesday, just days after the country declared an o… [+1943 chars]"
  }
];

const News = (props) => {

  const [articles, setArticles] = useState(tempArticles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const updatePage = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);

    setArticles(parsedData.articles);
    setTotal(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);

  }

  useEffect(() => {
    // updatePage();
  }, []);

//0c4ca38448c347798eeeec44874cb0e6
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotal(parsedData.totalResults);
  }


  return (
      <>
        <h1 className='text-center' style={{margin: "35px 0", marginTop: '90px'}}>Top Headlines Today</h1><hr />
        <InfiniteScroll
          dataLength={articles.length}
          // next={this.fetchMoreData}
          hasMore={ articles.length !== total }
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
                {!loading && articles.map((element) => {
                    return <div className="col-md-3" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:'https://www.nccpimandtip.gov.eg/uploads/newsImages/1549208279-default-news.png'} link={element.url?element.url:'/'} author={element.author?element.author:"Unknown"} source={element.source.name} publishedDate={element.publishedAt}/>
                    </div>
                })} 
            </div>
          </div>
        </InfiniteScroll>
      </>
  )
  
}

News.defaultProps = {
  category: 'general',
  pageSize: 8
}

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default News
