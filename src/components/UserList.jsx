import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <Typography color="text.secondary">No users found.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {users.map((user) => (
        <Card
          key={user.id}
          variant="outlined"
          sx={{
            transition: "0.3s",
            "&:hover": {
              boxShadow: 4,
              transform: "translateY(-2px)"
            }
          }}
        >
          <CardContent>
            <Typography fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.phone}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button
                size="small"
                onClick={() => onEdit(user)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e3f2fd"
                  }
                }}
              >
                Edit
              </Button>

              <Button
                size="small"
                color="error"
                onClick={() => {
                  if (window.confirm("Delete this user?")) {
                    onDelete(user.id);
                  }
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "#fdecea"
                  }
                }}
              >
                Delete
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default UserList;
