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
    input PostInput {
        text: String!
    }
    input UserInput {
        username: String!
        avatar: String!
    }
    type RootMutation {
        addPost (
            post: PostInput!
            user: UserInput!
        ): Post
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;
export default [typeDefinitions];