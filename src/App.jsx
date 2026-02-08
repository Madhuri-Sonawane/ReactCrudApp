import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import { Box, Card, CardContent, Typography } from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("form"); // 👈 NEW

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (data) => {
    if (data.id) {
      await updateUser(data.id, data);
    } else {
      await createUser(data);
    }
    setSelectedUser(null);
    fetchUsers();
    setView("list"); // 👈 after submit, go to list
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setView("form"); // 👈 go back to form
  };

  return (
    <Box minHeight="100vh" bgcolor="#f5f7fa">
      <Navbar
        onFormClick={() => {
          setSelectedUser(null);
          setView("form");
        }}
        onListClick={() => setView("list")}
      />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
        p={2}
      >
        <Card sx={{ width: "100%", maxWidth: 500, borderRadius: 3 }}>
          <CardContent>
            {view === "form" && (
              <>
                <Typography variant="h6" gutterBottom>
                  {selectedUser ? "Edit User" : "Add New User"}
                </Typography>
                <UserForm
                  onSubmit={handleSubmit}
                  selectedUser={selectedUser}
                />
              </>
            )}

            {view === "list" && (
              <>
                <Typography variant="h6" gutterBottom>
                  User List
                </Typography>
                <UserList
                  users={users}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default App;
