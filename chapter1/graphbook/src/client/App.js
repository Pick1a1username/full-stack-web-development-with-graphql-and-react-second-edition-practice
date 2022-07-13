import React, { useState } from 'react';

import '../../assets/css/style.css';

import avatar1 from '../../uploads/avatar1.png';
import avatar2 from '../../uploads/avatar2.png';


const App = () => {
    const [posts, setPosts] = useState(initialPosts);
    return (
        <div className="container">
            <div className="feed">
                { posts.map((post, i) => 
                    <div key={post.id} className="post">
                        <div className="header">
                            <img src={post.user.avatar} />
                            <h2>{post.user.username}</h2>
                        </div>
                        <p className="content">
                            {post.text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

const initialPosts = [
    {
        id: 2,
        text: 'Lorem ipsum',
        user: {
        avatar: avatar1,
        username: 'Test User'
        }
    },
    {
        id: 1,
        text: 'Lorem ipsum',
        user: {
        avatar: avatar2,
        username: 'Test User 2'
        }
    }
];

export default App