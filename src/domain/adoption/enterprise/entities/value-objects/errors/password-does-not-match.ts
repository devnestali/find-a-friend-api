export class PasswordDoesNotMatch extends Error {
  constructor() {
    super("Passwords do not match.");
  }
}
