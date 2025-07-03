import 'src/global.css';

import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTopButton = () =>
    showScrollBtn ? (
      <Fab
        size="medium"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{
          zIndex: 9,
          right: 20,
          bottom: 80,
          width: 48,
          height: 48,
          position: 'fixed',
          bgcolor: 'black.800',
        }}
      >
        <Iconify width={24} icon="eva:arrow-ios-upward-fill" sx={{ '--color': 'white' }} />
      </Fab>
    ) : null;

  // TODO - change this to AI chatbot
  const githubButton = () => (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 48,
        height: 48,
        position: 'fixed',
        bgcolor: 'grey.800',
      }}
    >
      <Iconify width={24} icon="socials:github" sx={{ '--color': 'white' }} />
    </Fab>
  );

  return (
    <ThemeProvider>
      {children}
      {githubButton()}
      {scrollToTopButton()}
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

// This hook scrolls to the top of the page whenever the pathname changes.
function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
