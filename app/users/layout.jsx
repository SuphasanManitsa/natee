import "../globals.css";
import Logout from '@/app/components/logout'

export default function RootLayout({ children }) {
  return (
    <div>
        <Logout />
        {children}
    </div>
  );
}
