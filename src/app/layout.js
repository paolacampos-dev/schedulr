import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://schedulr.paolacampos.dev"),

  title: "Schedulr",
  description: "Simple scheduler for planning and managing your time",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Schedulr",
    description: "Simple scheduler for planning and managing your time",
    url: "https://schedulr.paolacampos.dev",
    siteName: "Schedulr",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Paola Campos - dev Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body>
        {children}
      </body>
    </html>
  );
}
