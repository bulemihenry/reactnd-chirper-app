import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";
import { Redirect } from "react-router-dom";
class NewTweet extends Component {
  state = {
    text: "",
    toHome: false,
  };
  handleChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, id } = this.props;
    //todo:add tweet to store
    dispatch(handleAddTweet(text, id));
    this.setState(() => ({ text: "", toHome: id ? false : true }));
  };
  render() {
    const { text, toHome } = this.state;
    // redire ct to the home view if submitted
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    const tweetleft = 280 - text.length;
    return (
      <div>
        <h3 className="center">Compose New Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happeni ng?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {tweetleft <= 100 && <div>{tweetleft}</div>}
          <button className="btn" type="submit" disabled={text === ""}>
            submit
          </button>
        </form>
      </div>
    );
  }
}
export default connect()(NewTweet);
