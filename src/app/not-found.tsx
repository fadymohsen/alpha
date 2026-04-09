import Link from "next/link";
import Image from "next/image";

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased min-h-screen flex flex-col bg-white" style={{ fontFamily: "system-ui, sans-serif" }}>
        <main className="flex-grow flex items-center justify-center min-h-screen px-6">
          <div className="text-center space-y-8 max-w-lg">
            <div className="relative w-24 h-24 mx-auto opacity-20">
              <Image src="/logo-transperent.png" alt="ALFA" fill className="object-contain" />
            </div>

            <div className="space-y-2">
              <h1 style={{ fontSize: "10rem", fontWeight: 900, color: "#213B63", lineHeight: 1, letterSpacing: "-0.05em" }}>404</h1>
              <div style={{ width: "5rem", height: "4px", backgroundColor: "#7A363B", margin: "0 auto", borderRadius: "9999px" }} />
            </div>

            <div className="space-y-3">
              <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#213B63" }}>
                Page Not Found
              </h2>
              <p style={{ color: "#6b7280", fontWeight: 500, lineHeight: 1.7 }}>
                The page you are looking for might have been moved or doesn&apos;t exist. Let us get you back on track.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", paddingTop: "1rem" }}>
              <Link
                href="/en"
                style={{ backgroundColor: "#213B63", color: "white", padding: "1rem 2rem", borderRadius: "1rem", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}
              >
                English Home
              </Link>
              <Link
                href="/ar"
                style={{ backgroundColor: "#7A363B", color: "white", padding: "1rem 2rem", borderRadius: "1rem", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}
              >
                الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
