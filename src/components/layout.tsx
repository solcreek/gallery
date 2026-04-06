import { Link, Outlet } from "@tanstack/react-router";
import { config } from "@/gallery.config";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <Link to="/" className="font-mono text-sm font-medium tracking-tight">
            {config.brand}
          </Link>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/"
              className="text-foreground"
            >
              Templates
            </Link>
            {config.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 mt-auto">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="font-mono font-medium">{config.brand}</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {config.footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
