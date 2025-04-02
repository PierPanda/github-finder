import React from "react";
import Form from "./compornents/form";
import UsersList from "./compornents/users-list";
import Title from "./compornents/title";
import UserCard from "./compornents/user-card";

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  // Empêcher le défilement seulement quand une modale est ouverte
  React.useEffect(() => {
    if (selectedUser) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedUser]);

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

    if (login === null) {
      setSelectedUser(null);
      return;
    }

    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedUser(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Impossible de charger les données utilisateur");
      });
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col">
      <div className="flex flex-col justify-center items-center min-h-[300px] md:min-h-[400px] py-10">
        <Title />
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mt-4 md:mt-8 px-4">
          <Form handleSubmit={handleSubmit} />
        </div>
      </div>

      <div className="flex-grow relative">
        <UsersList users={users} loading={loading} handleClick={handleClick} />
      </div>

      {selectedUser && selectedUser.login && (
        <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

export default App;
