import { useState } from "react";
import "./App.css";
import PostCard from "./components/PostCard";
import NewPostForm from "./components/NewPostForm";
import { initialPosts, currentUser, availableTags, users } from "./data";

const filterOptions = [
  "All Posts",
  "My Posts",
  "Liked Posts",
  "Following Posts",
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [filterTag, setFilterTag] = useState("All");
  const [filterType, setFilterType] = useState("All Posts");
  const [sortDateAsc, setSortDateAsc] = useState(true);
  const userMap = new Map(users.map(user => [user.id, user.userName]));

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const toggleLikePost = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.likes.includes(currentUser.id);
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter((id) => id !== currentUser.id)
              : [...post.likes, currentUser.id],
          };
        }
        return post;
      })
    );
  };

  const toggleFollow = (postId, userId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isFollowed = post.followedBy.includes(currentUser.id);
          return {
            ...post,
            followedBy: isFollowed
              ? post.followedBy.filter((id) => id !== currentUser.id)
              : [...post.followedBy, currentUser.id],
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId, comment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                userId: currentUser.id,
                content: comment,
                timestamp: new Date(),
              },
            ],
          };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts
    .filter((post) => filterTag === "All" || post.tags.includes(filterTag))
    .filter((post) => {
      switch (filterType) {
        case "My Posts":
          return post.userId === currentUser.id;
        case "Liked Posts":
          return post.likes.includes(currentUser.id);
        case "Following Posts":
          return post.followedBy.includes(currentUser.id);
        default:
          return true;
      }
    })
    .sort((a, b) =>
      sortDateAsc ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
    );

  return (
    <div className="App">
      <div className="heading">
        <h1>Squadzify</h1>
        <NewPostForm
          currentUser={currentUser}
          addPost={addPost}
          availableTags={availableTags}
        />
      </div>
      <div className="filter-section">
        <div className="filter-header">
          <h1>News Feed</h1>
          <button onClick={() => setSortDateAsc(!sortDateAsc)}>
          Sort by date {sortDateAsc ? "Asc" : "Desc"}
        </button>
        </div>
        <div className="filter">
          <label>Tags: </label>
          {["All", ...availableTags].map((tag, index) => (
            <span
              key={index}
              onClick={() => setFilterTag(tag)}
              className={`filter-option ${filterTag === tag ? "selected" : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="type filter">
   
          {filterOptions.map((type, index) => (
            <span
              key={index}
              onClick={() => setFilterType(type)}
              className={`filter-option ${
                filterType === type ? "selected" : ""
              }`}
            >
              {type}
            </span>
          ))}
        </div>

       
      </div>

      <div className="card-container">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            updatePost={updatePost}
            deletePost={deletePost}
            toggleLikePost={toggleLikePost}
            toggleFollow={toggleFollow}
            addComment={addComment}
            availableTags={availableTags}
            userMap={userMap}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
