// Node.js v18+ has fetch built-in. If you use older Node.js, install node-fetch and import it.
const API = 'https://jsonplaceholder.typicode.com';

async function fetchApi(url) {
    const response = await fetch(`${API}/${url}`);

    return response.json();
}

async function main() {
    // 2 & 3. Get all users, posts, and comments in parallel using async/await
    const [users, posts, comments] = await Promise.all([
        fetchApi('/users'),
        fetchApi('/posts'),
        fetchApi('/comments')
    ]);

    // 3. Map posts and comments to users
    const usersWithPostsAndComments = users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        const userComments = comments.filter(comment =>
            userPosts.some(post => post.id === comment.postId)
        );
        return {
            ...user,
            posts: userPosts.map(({ id, title, body }) => ({ id, title, body })),
            comments: userComments.map(({ id, postId, name, body }) => ({ id, postId, name, body }))
        };
    });

    // 4. Filter only users with more than 3 comments
    const filteredUsers = usersWithPostsAndComments.filter(user => user.comments.length > 3);

    // 5. Reformat data with counts
    const usersWithCounts = filteredUsers.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        commentsCount: user.comments.length,
        postsCount: user.posts.length
    }));

    // 6. Who is the user with the most comments/posts?
    const mostCommentsUser = usersWithCounts.reduce((max, user) =>
        user.commentsCount > max.commentsCount ? user : max, usersWithCounts[0]);
    const mostPostsUser = usersWithCounts.reduce((max, user) =>
        user.postsCount > max.postsCount ? user : max, usersWithCounts[0]);

    // 7. Sort users by postsCount descending
    const sortedByPosts = [...usersWithCounts].sort((a, b) => b.postsCount - a.postsCount);

    // 8. Get post with ID 1 and its comments, merge (in parallel)
    async function fetchPostWithComments(postId) {
        const [post, comments] = await Promise.all([
            fetchApi('posts/' + postId),
            fetchApi('posts/' + postId + '/comments')
        ]);

        return {
            ...post,
            comments: comments
        };
    }

    // Gọi hàm này trong main để lấy kết quả:
    const mergedPost = await fetchPostWithComments(1);
    console.log('Merged post with comments:', mergedPost);

    // const [post1Res, post1CommentsRes] = await Promise.all([
    //     fetchA(`${API}/posts/1`),
    //     fetch(`${API}/posts/1/comments`)
    // ]);
    // const post1 = await post1Res.json();
    // const post1Comments = await post1CommentsRes.json();
    // const mergedPost = {
    //     ...post1,
    //     comments: post1Comments
    // };

    // Output results
    console.log('Users with posts and comments:', usersWithPostsAndComments);
    console.log('Filtered users (>3 comments):', filteredUsers);
    console.log('Users with counts:', usersWithCounts);
    console.log('User with most comments:', mostCommentsUser);
    console.log('User with most posts:', mostPostsUser);
    console.log('Sorted by postsCount:', sortedByPosts);
    console.log('Merged post with comments:', mergedPost);
}

main().catch(console.error);