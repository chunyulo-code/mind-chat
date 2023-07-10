import "./globals.css";
import { Montserrat } from "next/font/google";
import { Providers } from "@/redux/provider";
import BindAuthStateHandler from "./utils/bindAuthStateHandler";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "MindChat",
  description: ` MIND CHAT is a web application that facilitates visual thinking for
          users by combining mind maps and ChatGPT. Users can brainstorm
          creative ideas related to a topic and engage in follow-up questions
          based on selected keywords of interest. Additionally, they have the
          option to add interesting keywords to the database, which can be used
          to generate articles, diagrams, and more.`
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <BindAuthStateHandler />
          {children}
        </Providers>
      </body>
    </html>
  );
}
