/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import PropTypes from 'prop-types';
import styles from './Posts.css';
import { getDiffDate } from '../../utils';
import FullStar from '../../assest/full_star.png';
import StarWithoutBackground from '../../assest/star_without_background.png';


const Posts = (props) => {
  const { cats, favouritesCatsIds, handleToggle } = props;
  return (
    <ul className={styles.list}>
      {cats.map(({ data }) => (
        <li key={data.id} className={styles.item}>
          <div className={styles.item_header}>
            <button
              id={data.name}
              name={data.name}
              aria-label={data.name}
              type="button"
              className={styles.favourit}
              onClick={handleToggle(data.name)}
            />
            <label htmlFor={data.name}>
              <img
                src={favouritesCatsIds.includes(data.name) ? FullStar : StarWithoutBackground}
                alt="favourites"
                className={styles.favourites_icon}
                title={favouritesCatsIds.includes(data.name) ? 'remove from favourites' : 'add to favourites'}
              />
            </label>
            <div className={styles.item_header_element}>
              {'Posted by '}
              <span className={`${styles.author} ${styles.item_header_element}`}>{data.author}</span>
            </div>
            <div className={`${styles.date} ${styles.item_header_element}`}>{` ${getDiffDate(data.created_utc)}`}</div>
          </div>
          <div>
            {`${data.title} `}
            <span className={styles.flair_text}>{data.link_flair_text}</span>
          </div>
          {data.post_hint === 'image' ? <img src={data.url} alt="cat" className={styles.picture} /> : null}
          {data.post_hint === 'hosted:video' ? (
            <div className={styles.video_container}>
              <video src={data.media.reddit_video.fallback_url} className={styles.video} controls="controls">
                <track src="#" kind="captions" srcLang="en" label="english_captions" />
              </video>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

Posts.propTypes = {
  cats: PropTypes.array.isRequired,
  favouritesCatsIds: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default Posts;
