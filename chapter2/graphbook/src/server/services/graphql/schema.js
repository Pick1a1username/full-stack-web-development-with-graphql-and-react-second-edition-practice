const typeDefinitions = `
    type Post {
        id: Int
        user: User
        text: String
    }
    type User {
        avatar: String
        username: String
    }
    type RootQuery {
        posts: [Post]
    }
    schema {
        query: RootQuery
    }
`;
export default [typeDefinitions];