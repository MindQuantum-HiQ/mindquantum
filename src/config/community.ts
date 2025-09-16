import { EVANGELISTS_URL, MINDSPORE_URL, REPO_URL } from "./site";

export type CommunityLinkId = "repo" | "website" | "evangelists";

export type CommunityLink = {
  id: CommunityLinkId;
  href: string;
};

export const COMMUNITY_LINKS: CommunityLink[] = [
  { id: "repo", href: REPO_URL },
  { id: "website", href: MINDSPORE_URL },
  { id: "evangelists", href: EVANGELISTS_URL },
];

