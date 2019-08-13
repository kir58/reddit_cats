/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions';
import Loader from '../Loader/Loader';
import Posts from '../Posts/Posts';

import { POST_HEIGHT } from '../../constants';

const mapStateToProps = (state) => ({
  cats: state.posts.cats,
  lastId: state.posts.lastId,
  postsFetchingState: state.postsFetchingState,
  favouritesCatsIds: state.favouritesCatsIds,
});

const actionCreators = {
  fetchPosts: actions.fetchPosts,
  toggleFavouritePosts: actions.toggleFavouritePosts,
};

class Index extends React.Component {
  state = { lastId: '', doRequest: true };

  static getDerivedStateFromProps(props, state) {
    if (props.lastId !== state.lastId) {
      return { lastId: props.lastId, doRequest: true };
    }
    return { doRequest: false };
  }

  componentDidMount() {
    const { cats, fetchPosts } = this.props;
    if (cats.length === 0) {
      fetchPosts();
    }
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleToggle = (name) => () => {
    const { toggleFavouritePosts } = this.props;
    toggleFavouritePosts({ name });
  }

  handleScroll = () => {
    const { documentElement, body } = document;
    const scrollTop = documentElement ? documentElement.scrollTop : body.scrollTop;
    const scrollHeight = documentElement ? documentElement.scrollHeight : body.scrollHeight;
    const clientHeight = documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - POST_HEIGHT;
    const { fetchPosts, lastId } = this.props;
    const { doRequest } = this.state;
    if (scrolledToBottom && doRequest) {
      fetchPosts(lastId);
    }
  }

  render() {
    const { cats, postsFetchingState, favouritesCatsIds } = this.props;
    return (
      <>
        <Posts
          cats={cats}
          favouritesCatsIds={favouritesCatsIds}
          handleToggle={this.handleToggle}
        />
        {postsFetchingState === 'requested' ? <Loader byCenter={cats.length === 0} /> : null}
        {postsFetchingState === 'failed' ? <div>Sorry, try to reload the page</div> : null}
      </>
    );
  }
}
Index.propTypes = {
  cats: PropTypes.array.isRequired,
  favouritesCatsIds: PropTypes.array.isRequired,
  toggleFavouritePosts: PropTypes.func.isRequired,
  postsFetchingState: PropTypes.string.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  lastId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Index);
