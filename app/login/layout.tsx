"use client";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground dark:bg-gray-900 dark:text-white flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}