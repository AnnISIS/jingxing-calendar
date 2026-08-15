import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "净行日历｜今日",
  description: "清净、庄严的中国风佛历与东林法务日历。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
