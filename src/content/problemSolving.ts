import type { ProblemSolvingData } from "./types";

export const problemSolvingData: ProblemSolvingData = {
  totalSolved: "1,000+",
  headline: "Algorithmic Problem Solving",
  description:
    "Solved 1,000+ algorithmic problems across online judges, practicing data structures, graph algorithms, dynamic programming, and competitive real-time problem solving.",
  codeforces: {
    platform: "Codeforces",
    handle: "fugitive_stranger",
    url: "https://codeforces.com/profile/fugitive_stranger",
    rating: "1416",
    ratingTier: "Specialist",
    badge: "Specialist (max. 1416)",
    additionalHandles: [
      { handle: "divyo.argha", rating: "1223", url: "https://codeforces.com/profile/divyo.argha" },
      { handle: "bugichigi", rating: "1226", url: "https://codeforces.com/profile/bugichigi" },
    ],
  },
  leetcode: {
    platform: "LeetCode",
    handle: "bob_dylan",
    url: "https://leetcode.com/u/bob_dylan/",
    rating: "1924",
    ratingTier: "Knight",
    problemsSolved: "360+",
    badge: "Knight (max. 1924)",
    metaBadges: [
      { label: "Solved", value: "360+" },
      { label: "Max Rating", value: "1924" },
      { label: "Solution Views", value: "24.8k" },
      { label: "Reputation", value: "165+" },
      { label: "Badges", value: "5" },
    ],
  },
  otherJudges: [
    {
      platform: "LightOJ",
      handle: "bob_dylan",
      url: "https://lightoj.com/user/bob_dylan",
      badge: "Online Judge",
    },
    {
      platform: "VJudge",
      handle: "Divyo100",
      url: "https://vjudge.net/user/Divyo100",
      badge: "Virtual Judge",
    },
    {
      platform: "HackerRank",
      handle: "strangerfugitive",
      url: "https://www.hackerrank.com/profile/strangerfugitive",
      badge: "Practice",
    },
    {
      platform: "HackerEarth",
      handle: "strangerfugitive",
      url: "https://www.hackerearth.com/@strangerfugitive",
      badge: "Practice",
    },
  ],
  campusContests: {
    title: "SUST Intra-University Programming Contests",
    institution: "Shahjalal University of Science & Technology (SUST)",
    dates: "2020 – 2024",
    tag: "Intra-SUST",
    detail:
      "Participated in multiple competitive intra-university programming contests at SUST, solving algorithmic problems under strict real-time constraints and sharpening analytical speed.",
  },
};
