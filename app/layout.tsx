import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// TODO: fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gabriel Ytterberg',
  description: 'Portfolio is a strong word for it but this is what I got.',
};

const Footer = () => {
  return (
    <footer className='mt-auto flex flex-wrap items-center justify-center py-4'>
      &copy; {new Date().getFullYear()} Gabriel Ytterberg
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
