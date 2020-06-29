import RepoOwner from "./RepoOwner";

export default interface Repo {
  id: number;
  name: string;
  full_name: string;
  non_public: boolean;
  owner: RepoOwner;
  html_url: string;
  description: string;
  language: string;
  open_issues: number;
  score: number;
  isFavorite: boolean;
}
