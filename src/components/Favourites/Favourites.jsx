import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Favourites.css';
import * as actions from '../../actions';
import Loader from '../Loader/Loader';
import Posts from '../Posts/Posts';


const mapStateToProps = (state) => ({
  favouritesCatsIds: state.favouritesCatsIds,
});

const actionsCreators = {
  toggleFavouritePosts: actions.toggleFavouritePosts,
};
class Favourites extends React.Component {
  state = { postsCats: [], fetchingState: 'none' }

  componentDidMount() {
    this.getFavouritesCats();
  }

  getFavouritesCats = async () => {
    const { favouritesCatsIds } = this.props;
    this.setState({ fetchingState: 'requested' });
    try {
      const response = await axios.get(`https://www.reddit.com/api/info.json?id=${favouritesCatsIds.join(',')}`);
      this.setState({ postsCats: response.data.data.children, fetchingState: 'finished' });
    } catch (e) {
      this.setState({ fetchingState: 'failed' });
    }
  }

  handleToggle = (name) => () => {
    const { postsCats } = this.state;
    const { toggleFavouritePosts } = this.props;
    this.setState({ postsCats: postsCats.filter((el) => el.data.name !== name) });
    toggleFavouritePosts({ name });
  }

  render() {
    const { favouritesCatsIds } = this.props;
    const { postsCats, fetchingState } = this.state;
    if (fetchingState === 'requested') {
      return <Loader byCenter />;
    }
    if (fetchingState === 'failed') {
      return 'reload the page please';
    }
    if (postsCats.length === 0) {
      return (
        <div>
          Your favourites is empty. You can add cute cats here from:
          <Link to="/" className={styles.link}> there</Link>
        </div>
      );
    }
    return (
      <Posts
        cats={postsCats}
        favouritesCatsIds={favouritesCatsIds}
        handleToggle={this.handleToggle}
      />
    );
  }
}
Favourites.propTypes = {
  favouritesCatsIds: PropTypes.array.isRequired,
  toggleFavouritePosts: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, actionsCreators)(Favourites);
