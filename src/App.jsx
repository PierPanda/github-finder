import React from "react";
import Form from "./compornents/form";
import UsersList from "./compornents/users-list";
import Title from "./compornents/title";
import UserCard from "./compornents/user-card";

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setLoading(true);
    fetch(`https://api.github.com/search/users?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setLoading(false);
      });
  };

  const handleClick = (e, login) => {
    e.preventDefault();
    console.log("handleClick appelé avec login:", login);

    if (login === null) {
      setSelectedUser(null);
      return;
    }

    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Données utilisateur récupérées:", data);
        setSelectedUser(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Impossible de charger les données utilisateur");
      });
  };

  return (
    <>
      <div className="max-wscreen h-screen overflow-hidden bg-[#0D1117]">
        <Title />
        <Form handleSubmit={handleSubmit} />
        <div>
          <UsersList
            users={users}
            loading={loading}
            handleClick={handleClick}
          />
          {selectedUser && selectedUser.login && (
            <UserCard
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
