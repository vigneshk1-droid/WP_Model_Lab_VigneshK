import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const addUser = async () => {
    await axios.post("http://localhost:5000/add-user", { name });
  };

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple SaaS App</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={addUser}>Add User</button>

      <h3>Users:</h3>
      {users.map((u, i) => (
        <p key={i}>{u.name}</p>
      ))}
    </div>
  );
}

export default App;
