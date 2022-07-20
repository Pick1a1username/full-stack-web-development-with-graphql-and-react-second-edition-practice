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

const resolvers = {
    RootQuery: {
        posts(root, args, context) {
            return posts;
        }, 
    }, 
}; 

export default resolvers;