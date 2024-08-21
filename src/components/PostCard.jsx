import React, { useState } from "react";

const PostCard = ({
  post,
  currentUser,
  updatePost,
  deletePost,
  toggleLikePost,
  toggleFollow,
  addComment,
  availableTags,
  userMap,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [newTags, setNewTags] = useState(post.tags);

  const handleUpdate = () => {
    updatePost({
      ...post,
      title: newTitle,
      content: newContent,
      tags: newTags,
    });
    setEditing(false);
  };

  const toggleTag = (tag) => {
    if (newTags.includes(tag)) {
      setNewTags(newTags.filter((t) => t !== tag));
    } else {
      setNewTags([...newTags, tag]);
    }
  };

  return (
    <div className="PostCard">
      {!editing ? (
        <>
          <div className="CardHeader">
            <h2>{post.title}</h2>
            <div className="CardButtons">
              {post.userId === currentUser.id && (
                <>
                  <button onClick={() => setEditing(true)}>Edit</button>
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </>
              )}
              {post.userId !== currentUser.id && (
                <button onClick={() => toggleFollow(post.id, post.userId)}>
                  {post.followedBy.includes(currentUser.id)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="SubHeader">
            <small>Author: {userMap.get(post.userId) || "Unknown"}</small>
            <small>Tags: {post.tags.join(", ")}</small>
            <small>Posted on: {post.timestamp.toLocaleString()}</small>
          </div>
          <p>{post.content}</p>
          <div className="CardFooter">
            <button onClick={() => toggleLikePost(post.id)}>
              {post.likes.includes(currentUser.id) ? "Unlike 💟" : "Like 💖"}
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment(post.id, e.target.comment.value);
                e.target.reset();
              }}
            >
              <input type="text" name="comment" placeholder="Add a comment" />
              <button type="submit">Comment</button>
            </form>
          </div>

          <small>Comments:</small>
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>
                <strong>{userMap.get(comment.userId) || "Unknown"}:</strong>{" "}
                {comment.content}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="EditCard">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Edit Title"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Edit Content"
          />
          <div className="EditTags">
            <label>Edit Tags: </label>
            {availableTags.map((tag, index) => (
              <span
                key={index}
                onClick={() => toggleTag(tag)}
                className={
                  newTags.includes(tag) ? "tag-selected" : "tag-unselected"
                }
              >
                {tag}
              </span>
            ))}
          </div>

          <button onClick={handleUpdate}>Update Post</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
