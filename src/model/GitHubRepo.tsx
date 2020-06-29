import Repo from "./Repo";

export default interface GitHubRepo {
  total_count: number;
  incomplete_results: boolean;
  items: Array<Repo>;
}
