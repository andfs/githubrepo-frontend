import React from "react";
import "./header.css";
import TokenContext from "../TokenContext";
import { Grid } from "@material-ui/core";

interface FormLoginType {
  username: string;
  password: string;
  login: () => void;
  signup: () => void;
  handleChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const url: string = process.env.REACT_APP_URL ?? "http://localhost:8080/";

const FormLogin: React.FC<FormLoginType> = ({
  username,
  password,
  login,
  handleChangeUsername,
  handleChangePassword,
  signup,
}) => (
  <fieldset>
    <label>Login</label>
    <input type="text" placeholder="login" id="username" value={username} onChange={handleChangeUsername} />
    <label>Senha</label>
    <input type="password" placeholder="senha" id="password" value={password} onChange={handleChangePassword} />
    <Grid container>
      <Grid item xs={12} md={6}>
        <input className="button-primary" type="button" onClick={login} value="Login"></input>
      </Grid>
      <Grid item xs={12} md={6}>
        <input className="button-primary" type="button" onClick={signup} value="Cadastrar"></input>
      </Grid>
    </Grid>
  </fieldset>
);

const Header = () => {
  const TokenC = React.useContext(TokenContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const performRequest = async (url: string) => {
    if (username && username.length > 0 && password && password.length > 0) {
      if (password.length < 6) {
        alert("Senha deve conter no mínimo 6 caracteres");
      } else {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          if (response.status == 200) {
            const result: string = await response.text();
            TokenC.setToken(result);
          } else if (response.status === 400) {
            alert("Usuário ou senha inválidos.");
          } else if (response.status === 409) {
            alert("Já existe um usuário com este login.");
          } else {
            alert("Houve um erro na sua requisição.");
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      alert("Usuário ou senha não preenchidos.");
    }
  };

  const login = async () => {
    performRequest(`${url}auth/login`);
  };

  const signup = () => {
    performRequest(`${url}auth/signup`);
  };

  const children = TokenC.token ? (
    <em>"Você já está logado."</em>
  ) : (
    <FormLogin
      username={username}
      password={password}
      handleChangePassword={handleChangePassword}
      handleChangeUsername={handleChangeUsername}
      login={login}
      signup={signup}
    />
  );

  return (
    <div className="header">
      <div>
        <h1>Bem vindo ao GihubRepo.</h1>
        <em>Aqui você podeprocurar por repositórios públicos do Github pelo nome e por usuário.</em>
      </div>
      <div className="info">{children}</div>
    </div>
  );
};

export default Header;
