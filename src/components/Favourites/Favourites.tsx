import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Favourites.css';
import * as actions from '../../actions';
import Loader from '../Loader/Loader';
import Posts from '../Posts/Posts';
import { RootState } from '../../reducers';
import { CatDetail } from '../../types';



const Favourites = () : ReactElement =>  {
  const [cats, setCats] = useState<CatDetail[]>([]);
  const [fetchingState, setFetchingState] = useState<string>('none');

  const dispatch = useDispatch();
  const { favouritesCatsIds } = useSelector((state: RootState) => state);

  useEffect(() => {
    const getFavouritesCats = async () => {
      setFetchingState('requested');
      try {
        const response = await axios.get(`https://www.reddit.com/api/info.json?id=${favouritesCatsIds.join(',')}`);
        setFetchingState('finished');
        setCats(response.data.data.children);
      } catch (e) {
        setFetchingState('failed');
        setCats([]);
      }
    };

    getFavouritesCats();
  }, []);
  
  const handleToggle = (name: string) => () => {
    const updCats = cats.filter((el) => el.data.name !== name)
    setCats(updCats);
    dispatch(actions.toggleFavouritePosts({ name }));
  }

  if (fetchingState === 'requested') {
    return <Loader byCenter />;
  }

  if (fetchingState === 'failed') {
    return <div>reload the page please</div>;
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
      onToggle={handleToggle}
    />
  );
}

export default Favourites;