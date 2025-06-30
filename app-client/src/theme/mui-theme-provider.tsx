"use client";

import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { palette } from "@/theme/core/palette";
import { typography } from "@/theme/core/typography";
import { shadows } from "@/theme/core/shadows";

const theme = createTheme({
  palette,
  typography,
  shadows,
});

export default function MuiThemeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
