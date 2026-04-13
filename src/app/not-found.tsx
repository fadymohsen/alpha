import Link from "next/link";
import Image from "next/image";

export default function RootNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased min-h-screen flex flex-col" style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#fafafa" }}>
        <main style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          {/* Background blurs */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "-8rem", right: "-8rem", width: "24rem", height: "24rem", background: "rgba(33,59,99,0.05)", borderRadius: "50%", filter: "blur(100px)" }} />
            <div style={{ position: "absolute", bottom: "-8rem", left: "-8rem", width: "24rem", height: "24rem", background: "rgba(122,54,59,0.05)", borderRadius: "50%", filter: "blur(100px)" }} />
          </div>

          <div style={{ textAlign: "center", maxWidth: "32rem", position: "relative", zIndex: 10 }}>
            {/* Logo */}
            <div style={{ width: "5rem", height: "5rem", margin: "0 auto 2.5rem", opacity: 0.1, position: "relative" }}>
              <Image src="/logo-transperent.png" alt="ALFA" fill style={{ objectFit: "contain" }} />
            </div>

            {/* 404 */}
            <div style={{ position: "relative", marginBottom: "2.5rem" }}>
              <h1 style={{ fontSize: "clamp(10rem, 20vw, 16rem)", fontWeight: 900, color: "rgba(33,59,99,0.05)", lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none", margin: 0 }}>
                404
              </h1>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <div style={{ width: "4rem", height: "4rem", borderRadius: "1rem", background: "rgba(122,54,59,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7A363B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 900, color: "#213B63", margin: 0, letterSpacing: "-0.02em" }}>
                  Page Not Found
                </h2>
                <p style={{ color: "#9ca3af", fontWeight: 500, lineHeight: 1.7, maxWidth: "24rem", margin: "0 auto", fontSize: "1rem" }}>
                  The page you&apos;re looking for has been moved or doesn&apos;t exist
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <div style={{ width: "3rem", height: "2px", background: "rgba(33,59,99,0.1)", borderRadius: "9999px" }} />
              <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#C1922C" }} />
              <div style={{ width: "3rem", height: "2px", background: "rgba(33,59,99,0.1)", borderRadius: "9999px" }} />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <Link
                href="/ar"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "#213B63", color: "white", padding: "1rem 2rem", borderRadius: "1rem", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" as const, boxShadow: "0 10px 25px -5px rgba(33,59,99,0.2)" }}
              >
                🏠 الصفحة الرئيسية
              </Link>
              <Link
                href="/en"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "white", color: "#213B63", padding: "1rem 2rem", borderRadius: "1rem", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" as const, border: "1px solid rgba(33,59,99,0.1)" }}
              >
                English Home →
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
