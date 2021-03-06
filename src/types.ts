export type CatDetail = {
  data: {
    id: string,
    name: string,
    created_utc: number,
    title: string,
    author: string,
    link_flair_text: string,
    post_hint: string,
    url: string,
    media: { reddit_video: { fallback_url: string } },
  },
  kind: string,
}

export type CatsIds = Array<string>;

export type Post = {
  cats: CatDetail[],
  lastId: string,
  favouritesCatsIds: CatsIds
}

export type PostsFetchingState = string;

export type PostsProps = {
  onToggle: Function,
  favouritesCatsIds: CatsIds,
  cats: CatDetail[],

}