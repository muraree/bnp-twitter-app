import React from 'react';
import TweetBox from './TweetBox';
import InfiniteScroll from 'react-infinite-scroller';
import TweetPostForm from './TweetPostForm';

const MainComponent = (props) => {
  return (
    <div>
      <div>
        <h3>#nowplaying in San Francisco</h3>
        <p>This page shows #nowplaying tweets in San Francisco that contain a youtube link. it also allows you to post a #nowplaying tweet with a YouTube link.</p>
      </div>
      <TweetPostForm handleChange={props.handleChange} createNewTweet={props.createNewTweet} />
      <div className="tweet-container">
        <InfiniteScroll
          pageStart={0}
          loadMore={props.requestAndMergeTweets}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}>

          { props.tweets.map((tweet, i) =>
              <div className="tweet-box" key={tweet.id}>
                <div className="tweet-header">
                  <TweetBox {...tweet}/>
                </div>
              </div>
            )
          }

        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MainComponent;
