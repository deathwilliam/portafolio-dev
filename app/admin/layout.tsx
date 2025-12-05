
import { Inter, Outfit } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard for Portfolio",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary`}>
                {children}
            </body>
        </html>
    );
}
