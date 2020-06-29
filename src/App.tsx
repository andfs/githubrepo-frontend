import React from "react";
import "./App.css";
import Header from "./components/header";
import Search from "./components/search";
import TokenContext from "./TokenContext";

function App() {
  const [token, setToken] = React.useState<string | null>(null);
  const setTokenMethod = (jwtToken: string) => setToken(jwtToken);
  return (
    <TokenContext.Provider value={{ token, setToken: setTokenMethod }}>
      <div className="App">
        <Header />
        <Search />
      </div>
    </TokenContext.Provider>
  );
}

export default App;
