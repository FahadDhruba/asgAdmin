import "./globals.css";
import { Providers } from "./providers";

import { Hind_Siliguri } from "next/font/google";

const hindshiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-hind-shiliguri",
  subsets: ["bengali"],
});

export const metadata = {
  title: "ASG Compressed Note",
  description: "ASG Compressed Note | Redevelopment & Redesigned",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${hindshiliguri.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
