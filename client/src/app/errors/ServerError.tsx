import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
export default function ServerError() {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h3" gutterBottom color="error">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography>
            {state.error.detail || "Internal Error Server!"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>
        Go back to the Store
      </Button>
    </Container>
  );
}
