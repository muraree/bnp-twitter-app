import React from 'react';
import moment from 'moment';
import Linkify from 'react-linkify';

const TweetBox = prop => [
    <div key={prop._id} className="media">
      {prop.entities.urls[0] && prop.entities.urls[0].expanded_url.search("youtube.com") > 0 && (
        <iframe title="youtube video" width="420" height="315" src={prop.entities.urls[0].expanded_url.replace("watch?v=", "embed/")} />)
      }
      {prop.extended_entities && prop.extended_entities.media[0].type === "photo" && (
        <img
          style={{width: '80%', height: 'auto'}}
          src={prop.extended_entities.media["0"].media_url}
          alt="user tweet with" />)
      }
      {prop.extended_entities && (prop.extended_entities.media[0].type === "animated_gif"
      || prop.extended_entities.media[0].type === "video") && (
        <video width="100%" height="250px" name="media" controls>
          <source src={prop.extended_entities.media["0"].video_info.variants[0].url} type="video/mp4" />
        </video>)
      }
    </div>,
    <div key={"tweet" + prop._id} id="tweet">
      <div className="tweet-container pb">
        <div className="user pr">
          <img src={prop.user.profile_image_url} alt="user" />
          <div className="username">
            <div className="name">{prop.user.name}</div>
            <div className="handle">{`@${prop.user.screen_name}`}</div>
          </div>
        </div>
        <div className="tweet-content pt"><Linkify>{prop.text}</Linkify></div>
        <div className="date pt pb">{moment(prop.created_at).format("hh:mm a - MMM DD ")} from <a>{prop.user.location || 'WorldWide'}</a></div>

        <div className="rl">
          <div className="retweets"><b>{prop.retweet_count}</b> Retweets</div>
          <div className="likes"><b>{prop.favorite_count}</b> Likes</div>
        </div>
      </div>
    </div>];

export default TweetBox;
