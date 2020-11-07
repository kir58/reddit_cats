import React from 'react';
import axios from 'axios';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Favourites.css';
import * as actions from '../../actions';
import Loader from '../Loader/Loader';
import Posts from '../Posts/Posts';
import { RootState } from '../../reducers';
import { CatDetail } from '../../types';



const mapStateToProps = (state: RootState) => ({
  favouritesCatsIds: state.favouritesCatsIds,
});

const actionsCreators = {
  toggleFavouritePosts: actions.toggleFavouritePosts,
};

const connector = connect(
  mapStateToProps,
  actionsCreators,
)

type PropsFromRedux = ConnectedProps<typeof connector>


type StateTypes = {
  cats: CatDetail[],
  fetchingState: string,
}

class Favourites extends React.Component<PropsFromRedux> {
  state : StateTypes = { cats: [], fetchingState: 'none' }

  componentDidMount() {
    this.getFavouritesCats();
  }

  getFavouritesCats = async () => {
    const { favouritesCatsIds } = this.props;
    this.setState({ fetchingState: 'requested' });
    try {
      const response = await axios.get(`https://www.reddit.com/api/info.json?id=${favouritesCatsIds.join(',')}`);
      this.setState({ cats: response.data.data.children, fetchingState: 'finished' });
    } catch (e) {
      this.setState({ fetchingState: 'failed' });
    }
  }

  handleToggle = (name: string) => () => {
    const { cats } = this.state;
    const { toggleFavouritePosts } = this.props;
    this.setState({ cats: cats.filter((el) => el.data.name !== name) });
    toggleFavouritePosts({ name });
  }

  render() {
    const { favouritesCatsIds } = this.props;
    const { cats, fetchingState } = this.state;

    if (fetchingState === 'requested') {
      return <Loader byCenter />;
    }

    if (fetchingState === 'failed') {
      return 'reload the page please';
    }
  
    if (cats.length === 0) {
      return (
        <div>
          Your favourites is empty. You can add cute cats
          <Link to="/" className={styles.link}> here</Link>
        </div>
      );
    }

    return (
      <Posts
        cats={cats}
        favouritesCatsIds={favouritesCatsIds}
        onToggle={this.handleToggle}
      />
    );
  }
}

export default connector(Favourites);
