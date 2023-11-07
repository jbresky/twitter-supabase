import Tweet from "./client/tweet";

const Posts = ({ posts }: { posts: any }, currentUserID?: string) => {
    return (
       <>
        {
            posts?.map((post: any) => {
                const {
                    likes,
                    profile,
                    tweet,
                    hasLiked,
                    replies
                } = post

                return (
                    <Tweet
                        key={tweet.id}
                        tweet={{tweetDetails: {
                            ...tweet
                        },
                        userProfile: {
                            ...profile
                        }
                    }}
                        likesCount={likes.length}
                        hasLiked={hasLiked}
                        repliesCount={replies.length}
                    />
                )
            })
        }
       </>
    );
}

export default Posts;