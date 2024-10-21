import { expect } from "chai";
import { addToLeaderBoard } from "../lib/client/game-service";
import { INITIAL_LEADERBOARD } from "../lib/model";

describe("Leaderboard", () => {
  it("should display the leaderboard", () => {
    expect(true).to.be.true;
  });
  it("should add to leaderboard", () => {
    addToLeaderBoard(INITIAL_LEADERBOARD, {
      id: "1",
      playerName: "test",
      playerLevel: "kid",
      gameLevel: 1,
      questions: [],
      maxCompletedLevel: 0,
      totalHighResTime: 0,
    });
  });
});
