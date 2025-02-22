import "../../globals.css";
import AdminNav from "./adminNav";

export const metadata = {
  title: "Admin | ASG Compressed Note",
  description: "ASG Compressed Note | Redevelopment & Redesigned",
};

export default function Layout({ children }) {
  return (
    <main>
      {/* <UserNav>{children}</UserNav> */}
      <AdminNav>{children}</AdminNav>
    </main>
  );
}
