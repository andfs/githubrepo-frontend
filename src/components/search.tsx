import React from "react";
import GitHubRepo from "../model/GitHubRepo";
import Repo from "../model/Repo";
import CustomTable from "./customTable";
import TokenContext from "../TokenContext";

const url: string = process.env.REACT_APP_URL ?? "http://localhost:8080/";

const Search = () => {
  const TokenC = React.useContext(TokenContext);
  const [repositoryName, setRepositoryName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [loading, setLoding] = React.useState(false);
  console.log(process.env.REACT_APP_URL);
  const [repos, setRepos] = React.useState<Array<Repo>>();
  const searchRepo = async () => {
    setUsername("");
    setRepos([]);
    setLoding(true);
    const response = await fetch(`${url}search?repo=${repositoryName}`);
    const result: GitHubRepo = await response.json();
    setRepos(result.items);
    setLoding(false);
  };

  const searchRepoByUser = async () => {
    setRepositoryName("");
    setRepos([]);
    setLoding(true);
    const response = await fetch(`${url}search/user?username=${username}`);
    const result: GitHubRepo = await response.json();
    setRepos(result.items);
    setLoding(false);
  };

  const toFavorite = async (index: number) => {
    if (TokenC.token && TokenC.token.length > 0) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${TokenC.token}`);
      const method = repos![index].isFavorite ? "remove" : "add";
      const options = { method: method === "add" ? "GET" : "DELETE", headers };
      const id = repos![index].id;
      const uri = `${url}favorite/${method}?id=${id}`;
      const response = await fetch(uri, options);
      console.log(response.status);

      setRepos((reps) => {
        reps![index].isFavorite = !reps![index].isFavorite;
        return [...reps!];
      });
    } else {
      alert("Para favoritar é necessário estar logado");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="column column-50">
            <fieldset>
              <label>Pesquise um repositório</label>
              <input
                type="text"
                placeholder="Repositório"
                id="repository"
                value={repositoryName}
                onChange={(e) => setRepositoryName(e.target.value)}
              />
              <input className="button-primary" type="button" value="Pesquisar" onClick={searchRepo}></input>
            </fieldset>
          </div>
          <div className="column column-50">
            <fieldset>
              <label>Pesquise um repositório por usuário</label>
              <input type="text" placeholder="Usuário" id="user" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="button-primary" type="button" value="Pesquisar" onClick={searchRepoByUser}></input>
            </fieldset>
          </div>
        </div>
      </div>
      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h2>Carregando...</h2>
        </div>
      )}
      {repos && repos.length > 0 && <CustomTable repos={repos} toFavorite={toFavorite} />}
    </>
  );
};

export default Search;
