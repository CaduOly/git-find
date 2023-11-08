import { useState } from "react";
import background from "../../assets/background.png";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { ItemList } from "../../components/ItemList";
import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    if (newUser.name) {
      const { avatar_url, login, name, bio } = newUser;
      setCurrentUser({ avatar_url, login, name, bio });

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos);
      }
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} alt="github logo" className="background" />
        <div className="info">
          <div className="search">
            <Input
              className="input"
              name="usuario"
              placeholder="@usuario"
              onChange={(event) => setUser(event.target.value)}
              value={user}
            ></Input>
            <Button label="Buscar" onClick={handleGetData}></Button>
          </div>

          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="profile"
                ></img>
                <div className="">
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
            <>
              <div className="repositorio">
                <h4>Repositórios</h4>
                {repos.map((repo) => (
                  <ItemList title={repo.name} description={repo.description} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
