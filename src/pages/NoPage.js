import { Typography, Box } from '@mui/material';
import gif404 from "../assets/404Horse.gif";

export default function NoPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        404: Page not found
      </Typography>
      <Typography variant="h5">
        Go back...
      </Typography>
      <Box
        component="img"
        alt="404 gif"
        src={gif404}
        sx={{
          width: { xs: '80%', sm: '60%', md: '50%' }, // responsiveness
          mt: 3,
          mx: 'auto', // center the image
          display: 'block',
        }}
      />
    </Box>
  );
};
