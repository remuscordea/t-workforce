import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type FooterProps = React.ComponentProps<typeof Box>;

export function Footer({ sx, ...other }: FooterProps) {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', ...sx }} {...other}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} TWF
      </Typography>
    </Box>
  );
}
