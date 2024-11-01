export const signUpErrors: { message: string; explanation: string }[] = [
  {
    message: "EMAIL_EXISTS",
    explanation: "The email address is already in use by another account.",
  },

  {
    message: "TOO_MANY_ATTEMPTS_TRY_LATER",
    explanation:
      "We have blocked all requests from this device due to unusual activity. Try again later.",
  },
];

export const signInErrors: { message: string; explanation: string }[] = [
  {
    message: "EMAIL_NOT_FOUND",
    explanation: "There is no user record corresponding to this identifier.",
  },
  {
    message: "INVALID_PASSWORD",
    explanation:
      "The password is invalid or the user does not have a password.",
  },
  {
    message: "USER_DISABLED",
    explanation: "The user account has been disabled by an administrator.",
  },
  {
    message: "INVALID_LOGIN_CREDENTIALS",
    explanation: "Email or password is incorrect.",
  },
];
