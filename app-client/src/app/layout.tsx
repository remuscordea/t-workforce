import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProviderWrapper from "@/theme/mui-theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Material Kit React - Next.js",
  description: "Converted version using App Router and MUI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiThemeProviderWrapper>
          <CssBaseline />
          {children}
        </MuiThemeProviderWrapper>
      </body>
    </html>
  );
}
