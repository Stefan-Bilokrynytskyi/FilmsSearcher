export type RootStackAuthNavigation = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ErrorScreen: undefined;
  VerifyEmail: undefined;
};

export type RootStackFilmsNavigation = {
  Films: undefined;
  FilmDetails: {
    filmId: string;
    previousScreen: keyof RootStackFilmsNavigation;
  };
  ErrorScreen: undefined;
};
