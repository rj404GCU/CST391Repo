import React, { useState } from 'react';
import Post from './Post';
import './Post.css';
import AddPost from './AddPost';

function App() {
    const [postList, setPostList] = useState([
    {
      postNumber: 0,
      text: 'A short psychic broke out of jail. She was a small medium at large.'
    },
    {
      postNumber: 1,
      text: 'A tall psychic broke out of jail. She was a small medium at large.'
    },
    {
      postNumber: 2,
      text: 'A large psychic broke out of jail. She was a small medium at large.'
    },
    {
      postNumber: 3,
      text: 'A small psychic broke out of jail. She was a small medium at large.'
    },
    {
      postNumber: 4,
      text: 'A Blue psychic broke out of jail. She was a small medium at large.'
    },
  ]);

  const [postId, setPostId] = useState(3);

  const handleAddPost = (newText) => {
    let newPost = {
      postNumber: postId,
      text: newText
    };
    
    setPostList(postList => [...postList, newPost]);
    setPostId(postId+1);
    //http://www.techiediaries.com/react-usestate-hook-update-array/

  }

  const handleDeletePost = (id) => {
    let updatedPostList = postList.filter(post => post.postNumber !== id);

    setPostList(updatedPostList);
  }
  
  const posts = postList.map((post) => (
      <Post key={post.postNumber} text={post.text} id={post.postNumber} onDelete={handleDeletePost}/>
    ));

  return (
    <div>
      {posts}
      <AddPost onAdd={handleAddPost}/>
    </div>);
}

export default App;
