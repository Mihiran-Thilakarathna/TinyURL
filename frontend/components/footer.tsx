export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-surface w-full">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          © {currentYear} TinyURL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
