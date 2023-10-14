import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { FiberProvider } from "its-fine";

import { api } from "app/utils/api";

import "app/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <FiberProvider>
          <Component {...pageProps} />
      </FiberProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
