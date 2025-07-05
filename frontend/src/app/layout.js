import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "Indian Cuisine Explorer",
  description: "Explore Indian dishes with ingredients and origins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
