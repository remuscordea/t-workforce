import { CONFIG } from "@/config-global";

import { SignInView } from "@/sections/auth";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Sign in - ${CONFIG.appName}`}</title>

      <SignInView />
    </>
  );
}
