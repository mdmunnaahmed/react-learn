import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../app/state/postSlice";

const PostsView = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [ ]);
  return (
    <div>
      <h1>all posts</h1>
      {isLoading && <h2>loading.....</h2>}
      {!isLoading && error && <h2>Error.....</h2>}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsView;
