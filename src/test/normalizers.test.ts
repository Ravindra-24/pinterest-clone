import { describe, expect, it } from "vitest";
import { normalizePost, normalizeUser } from "../services/normalizers";

describe("API normalizers", () => {
  it("converts legacy users without exposing private fields", () => {
    const user = normalizeUser({ _id: "507f1f77bcf86cd799439011", firstName: "Asha", lastName: "Rao", email: "private@example.com", password: "secret" });
    expect(user).toMatchObject({ id: "507f1f77bcf86cd799439011", displayName: "Asha Rao", username: "member-439011" });
    expect(user).not.toHaveProperty("email");
    expect(user).not.toHaveProperty("password");
  });

  it("adapts legacy image fields to responsive media", () => {
    const post = normalizePost({ _id: "507f1f77bcf86cd799439012", title: "Quiet room", image: "https://example.com/room.jpg", user: { firstName: "Asha" }, likes: ["1"], comments: ["2", "3"] });
    expect(post.media.url).toBe("https://example.com/room.jpg");
    expect(post.slug).toContain("quiet-room");
    expect(post.likeCount).toBe(1);
    expect(post.commentCount).toBe(2);
  });
});
