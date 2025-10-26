import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ToastProvider } from "../components/Toast";
import Footer from "../components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://groupbofficersacademy.com"),
  title: "Group B Officers Academy",
  description: "Group B Officers Academy is a platform for officers to learn and grow.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Group B Officers Academy",
    description: "Group B Officers Academy is a platform for officers to learn and grow.",
    url: "https://groupbofficersacademy.com",
    siteName: "Group B Officers Academy",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Group B Officers Academy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Group B Officers Academy",
    description: "Group B Officers Academy is a platform for officers to learn and grow.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${poppins.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <ToastProvider>
          <Navbar />
          <main className="grow">  
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
