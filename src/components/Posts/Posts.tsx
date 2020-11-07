import React from 'react';

import styles from './Posts.css';
import { getDiffDate } from '../../utils';
import FullStar from '../../assest/full_star.png';
import StarWithoutBackground from '../../assest/star_without_background.png';
import { CatDetail, CatsIds } from '../../types';



type Props = {
  onToggle: Function,
  favouritesCatsIds: CatsIds,
  cats: CatDetail[],

}
const Posts = ({ cats, favouritesCatsIds, onToggle }: Props) =>  (
  <ul className={styles.list}>
    {cats.map(({ data: { id, name, author, created_utc, title, link_flair_text, post_hint, url, media, } }) => (
      <li key={id} className={styles.item}>
        <div className={styles.item_header}>
          <button
            id={name}
            name={name}
            aria-label={name}
            type="button"
            className={styles.favourit}
            onClick={onToggle(name)}
          />
          <label htmlFor={name}>
            <img
              src={favouritesCatsIds.includes(name) ? FullStar : StarWithoutBackground}
              alt="favourites"
              className={styles.favourites_icon}
              title={favouritesCatsIds.includes(name) ? 'remove from favourites' : 'add to favourites'}
            />
          </label>
          <div className={styles.item_header_element}>
            {'Posted by '}
            <span className={`${styles.author} ${styles.item_header_element}`}>{author}</span>
          </div>
          <div className={`${styles.date} ${styles.item_header_element}`}>{` ${getDiffDate(created_utc)}`}</div>
        </div>
        <div>
          {`${title} `}
          <span className={styles.flair_text}>{link_flair_text}</span>
        </div>
        {post_hint === 'image' ? <img src={url} alt="cat" className={styles.picture} /> : null}
        {post_hint === 'hosted:video' ? (
          <div className={styles.video_container}>
            <video src={media.reddit_video.fallback_url} className={styles.video} controls>
              <track src="#" kind="captions" srcLang="en" label="english_captions" />
            </video>
          </div>
        ) : null}
      </li>
    ))}
  </ul>
);

export default Posts;
