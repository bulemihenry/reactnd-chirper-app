import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";
class Tweet extends Component {
  handlelike = (e) => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasliked,
        authedUser,
      })
    );
  };
  toParent = (e, id) => {
    e.preventDefault();
    // redirect to parent tweet, todo
    this.props.history.push(`/tweet/${id}`);
  };
  render() {
    const { tweet } = this.props;
    if (tweet === null) {
      return <p>This tweet doesnt exist</p>;
    }
    const {
      name,
      avatar,
      timestamp,
      text,
      hasliked,
      likes,
      replies,
      id,
      parent,
    } = tweet;
    console.log(this.props);
    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`avatar of  ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)} </div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, id)}
              >
                replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          {/* </div> */}
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icons" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handlelike}>
              {hasliked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icons" />
              ) : (
                <TiHeartFullOutline className="tweet-icons" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
}
export default withRouter(connect(mapStateToProps)(Tweet));
