import { signUp, signInCredentials, signOutAll } from "@/actions/auth";
import { createUser } from "@/actions/users";
import { signIn, signOut } from "@/auth";
import { Role } from "@/generated/prisma";

// Моки для залежностей
jest.mock("@/actions/users", () => ({
  createUser: jest.fn(),
}));

jest.mock("@/auth", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

const mockedCreateUser = jest.mocked(createUser);
const mockedSignIn = jest.mocked(signIn);
const mockedSignOut = jest.mocked(signOut);

describe("Auth Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("signUp", () => {
    // Позитивні тести
    it("should successfully create a user with USER role", async () => {
      mockedCreateUser.mockResolvedValueOnce({
        id: "user-id-123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        image: null,
        role: Role.USER,
        password: "hashedPassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await signUp(
        "test@example.com",
        "John",
        "Doe",
        Role.USER,
        "password123"
      );

      expect(mockedCreateUser).toHaveBeenCalledWith(
        "test@example.com",
        "John",
        "Doe",
        Role.USER,
        "password123"
      );
      expect(result).toEqual({ success: true });
    });

    it("should successfully create a user with ADMIN role", async () => {
      mockedCreateUser.mockResolvedValueOnce({
        id: "admin-id-123",
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        image: null,
        role: Role.ADMIN,
        password: "hashedPassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await signUp(
        "admin@example.com",
        "Admin",
        "User",
        Role.ADMIN,
        "adminPassword123"
      );

      expect(mockedCreateUser).toHaveBeenCalledWith(
        "admin@example.com",
        "Admin",
        "User",
        Role.ADMIN,
        "adminPassword123"
      );
      expect(result).toEqual({ success: true });
    });

    // Негативні тести
    it("should throw error when createUser fails with Error instance", async () => {
      const error = new Error("Database connection failed");
      mockedCreateUser.mockRejectedValueOnce(error);

      await expect(
        signUp("fail@example.com", "Fail", "User", Role.USER, "password123")
      ).rejects.toThrow("Database connection failed");
    });

    it("should reject with same value when createUser fails with non-Error value", async () => {
      mockedCreateUser.mockRejectedValueOnce("Some error string");

      await expect(
        signUp("fail@example.com", "Fail", "User", Role.USER, "password123")
      ).rejects.toEqual("Some error string");
    });

    it("should reject with null when createUser fails with null", async () => {
      mockedCreateUser.mockRejectedValueOnce(null);

      await expect(
        signUp("fail@example.com", "Fail", "User", Role.USER, "password123")
      ).rejects.toBeNull();
    });
  });

  describe("signInCredentials", () => {
    // Позитивні тести
    it("should successfully sign in with correct credentials", async () => {
      mockedSignIn.mockResolvedValueOnce({ ok: true, error: null });

      const result = await signInCredentials("user@example.com", "correctPassword");

      expect(mockedSignIn).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "correctPassword",
        redirect: false,
      });
      expect(result).toEqual({ success: true });
    });

    // Негативні тести
    it("should throw error when signIn fails with Error instance", async () => {
      const error = new Error("Invalid credentials");
      mockedSignIn.mockRejectedValueOnce(error);

      await expect(
        signInCredentials("user@example.com", "wrongPassword")
      ).rejects.toThrow("Invalid credentials");
    });

    it("should throw generic error when signIn fails with string error", async () => {
      mockedSignIn.mockRejectedValueOnce("Auth failed");

      await expect(
        signInCredentials("user@example.com", "wrongPassword")
      ).rejects.toThrow("Unknown error");
    });

    it("should throw generic error when signIn fails with null", async () => {
      mockedSignIn.mockRejectedValueOnce(null);

      await expect(
        signInCredentials("user@example.com", "wrongPassword")
      ).rejects.toThrow("Unknown error");
    });

    it("should log error to console when signIn fails", async () => {
      const error = new Error("Login failed");
      mockedSignIn.mockRejectedValueOnce(error);

      try {
        await signInCredentials("user@example.com", "wrongPassword");
      } catch (e) {
        // ignore
      }

      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe("signOutAll", () => {
    // Позитивні тести
    it("should successfully sign out", async () => {
      mockedSignOut.mockResolvedValueOnce(undefined);

      await signOutAll();

      expect(mockedSignOut).toHaveBeenCalledWith({
        redirectTo: "/login",
        redirect: true,
      });
    });

    // Негативні тести
    it("should throw when signOut fails with Error", async () => {
      const error = new Error("Sign out error");
      mockedSignOut.mockRejectedValueOnce(error);

      await expect(signOutAll()).rejects.toThrow("Sign out error");
    });

    it("should throw with same value when signOut fails with non-Error value", async () => {
      mockedSignOut.mockRejectedValueOnce("Some error");

      await expect(signOutAll()).rejects.toEqual("Some error");
    });
  });

  // Edge cases
  describe("Edge Cases", () => {
    it("should handle empty strings in signUp", async () => {
      mockedCreateUser.mockResolvedValueOnce({
        id: "empty-id",
        email: "",
        firstName: "",
        lastName: "",
        image: null,
        role: Role.USER,
        password: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await signUp("", "", "", Role.USER, "");

      expect(mockedCreateUser).toHaveBeenCalledWith("", "", "", Role.USER, "");
      expect(result).toEqual({ success: true });
    });

    it("should handle empty strings in signInCredentials", async () => {
      mockedSignIn.mockResolvedValueOnce({ ok: true, error: null });

      const result = await signInCredentials("", "");

      expect(mockedSignIn).toHaveBeenCalledWith("credentials", {
        email: "",
        password: "",
        redirect: false,
      });
      expect(result).toEqual({ success: true });
    });
  });
});