export function validateEmail(email: string): {
  value: boolean;
  message: string;
} {
  if (email.length === 0) return { value: false, message: "Email is required" };
  const re = /\S+@\S+\.\S+/;
  return re.test(email)
    ? { value: true, message: "" }
    : { value: false, message: "Invalid email" };
}
export function validatePassword(password: string): {
  value: boolean;
  message: string;
} {
  if (password.length === 0) {
    return { value: false, message: "Password is required" };
  }

  if (password.length < 6) {
    return { value: false, message: "Password must be at least 6 characters" };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      value: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (!/\d/.test(password)) {
    return {
      value: false,
      message: "Password must contain at least one digit",
    };
  }

  if (/\s/.test(password)) {
    return {
      value: false,
      message: "Password must not contain whitespace characters",
    };
  }

  return { value: true, message: "" };
}

export function validateUsername(username: string): {
  value: boolean;
  message: string;
} {
  if (username.length === 0) {
    return { value: false, message: "Username is required" };
  }

  if (username.length <= 1) {
    return { value: false, message: "Username must be at least 2 characters" };
  }

  if (/\s/.test(username)) {
    return {
      value: false,
      message: "Username must not contain whitespace characters",
    };
  }

  return { value: true, message: "" };
}
