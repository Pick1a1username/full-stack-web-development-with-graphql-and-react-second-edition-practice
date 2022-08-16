import logger from '../../helpers/logger';

const posts = [
    {
        id: 2,
        text: 'Lorem ipsum',
        user: {
        // avatar: avatar1,
        username: 'Test User'
        }
    },
    {
        id: 1,
        text: 'Lorem ipsum',
        user: {
        // avatar: avatar2,
        username: 'Test User 2'
        }
    }
];

export default function resolver() {
    const { db } = this;
    const { Post } = db.models;

    const resolvers = {
        RootQuery: {
            posts(root, args, context) {
                return Post.findAll({order: [['createdAt', 'DESC']]});
            },
        },
        RootMutation: {
            addPost(root, { post, user }, context) {
                const postObject = { 
                    ...post,
                    user,
                    id: posts.length + 1,
                };
                posts.push(postObject);

                logger.log({ level: 'info', message: 'Post was created' });
                return postObject;
            }
        },
        Post: {
            user(post, args, context) {
                return post.getUser();
            },
        },
    }; 
    return resolvers;
}