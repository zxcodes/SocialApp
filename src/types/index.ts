type BottomScreensParamsList = {
  HomeScreen: undefined;
  ProfileScreen: ProfileScreenDataProps;
  ChatScreen: undefined;
  NotificationsScreen: undefined;
  CameraScreen: undefined;
};

type UserDetailsType = {
  username: string;
  userId: string;
  hasStory?: boolean;
  displayPicture: string;
}[];

type ProfileScreenDataProps = {
  username: string;
  followers: string;
  following: string;
  bio: string;
  displayPicture: string;
  galleryImages: {
    id: number;
    url: string;
  }[];
};

type VideoType = {
  uri: string;
  videoId: string;
};

export type {
  BottomScreensParamsList,
  ProfileScreenDataProps,
  UserDetailsType,
  VideoType,
};
