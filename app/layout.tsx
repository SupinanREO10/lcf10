import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"AAR Insight | แบบสอบถามถอดบทเรียน",description:"แบบสอบถามและแดชบอร์ดผลการถอดบทเรียนนวัตกรรมทางการศึกษา",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="th"><body className="antialiased">{children}</body></html>}
