export const initialPosts = [
  {
    id: 1,
    userId: 1,
    title: "Features",
    content: "Since im not using any database and or authentication for this project I will use user Ryan as the “loggedin user”. Ryan can Create, Update and Delete his own post and can only Read posts from other users. The app features include filtering by dates, tags, and post types (all posts, user’s posts, liked posts, and following posts). You can like post and follow users using the buttons. Di po ako gumamit ng icons baka po kase bawal:<",
    timestamp: new Date("2024-08-19T10:00:00"),
    tags: ["technology"],
    likes: [],
    comments: [
      {
        userId: 2,
        userName: "Jason",
        content: "Comment Test",
        timestamp: new Date("2024-08-19T10:30:00"),
      },
    ],
    savedBy: [],
    followedBy: [],
  },
    {
      id: 2,
      userId: 1,
      title: "Ryan post",
      content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      timestamp: new Date("2024-08-19T10:00:00"),
      tags: ["life"],
      likes: [],
      comments: [
        {
          userId: 2,
          userName: "Jason",
          content: "Nice post!",
          timestamp: new Date("2024-08-19T10:30:00"),
        },
      ],
      savedBy: [],
      followedBy: [],
    },
    {
      id: 3,
      userId: 2,
      title: "Jason’s Post",
      content: "This post is created by the user Jason, we cannot edit or delete this post.",
      timestamp: new Date("2024-08-20T12:00:00"),
      tags: ["technology"],
      likes: [],
      comments: [],
      savedBy: [],
      followedBy: [],
    },
  ];

export const users = [
  { id: 1, userName: "Ryan" },
  { id: 2, userName: "Jason" },
];

export const currentUser = {
    id: 1,
    name: "ryan"
  };
export const availableTags = ["technology", "sports", "life", "music"];
  