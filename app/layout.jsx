import "./globals.css";
import Loading from "./loading";
import { Suspense } from 'react'
import Logout from '@/app/components/logout'
import { CookiesProvider } from 'next-client-cookies/server';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="">
      <body>
        <Logout />
        <Suspense fallback={<Loading />}>
          <CookiesProvider>{children}</CookiesProvider>
        </Suspense>
      </body>
    </html>
  );
}
