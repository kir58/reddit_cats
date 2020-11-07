/* eslint-disable no-undef */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../actions';
import Loader from '../Loader/Loader';
import Posts from '../Posts/Posts';

import { POST_HEIGHT } from '../../constants';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
  cats: state.posts.cats,
  lastId: state.posts.lastId,
  postsFetchingState: state.postsFetchingState,
  favouritesCatsIds: state.favouritesCatsIds,
});

const actionsCreators = {
  fetchPosts: actions.fetchPosts,
  toggleFavouritePosts: actions.toggleFavouritePosts,
};

const connector = connect(
  mapStateToProps,
  actionsCreators,
);

type PropsFromRedux = ConnectedProps<typeof connector>

type State = {
  lastId: string,
  doRequest: boolean,
}

class Index extends React.Component<PropsFromRedux> {
  state = { lastId: '', doRequest: true };

  static getDerivedStateFromProps(props: PropsFromRedux, state: State) {
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

  handleToggle = (name: string) => () => {
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
          onToggle={this.handleToggle}
        />
        {postsFetchingState === 'requested' ? <Loader byCenter={cats.length === 0} /> : null}
        {postsFetchingState === 'failed' ? <div>Sorry, try to reload the page</div> : null}
      </>
    );
  }
}

export default connector(Index);
