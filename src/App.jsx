import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("form"); // 👈 NEW
 const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success"
});

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (data) => {
  try {
    if (data.id) {
      await updateUser(data.id, data);
      setSnackbar({
        open: true,
        message: "User information updated successfully",
        severity: "success"
      });
    } else {
      await createUser(data);
      setSnackbar({
        open: true,
        message: "User added successfully",
        severity: "success"
      });
    }
    setSelectedUser(null);
    fetchUsers();
  } catch (error) {
    setSnackbar({
      open: true,
      message: "Something went wrong. Please try again.",
      severity: "error"
    });
  }
};

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setView("form");
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
       <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%", mt:8 }}
         >
          {snackbar.message}
       </Alert>
    </Snackbar>
    </Box>
  );
}

export default App;
