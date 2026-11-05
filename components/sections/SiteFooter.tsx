import { Container } from "@/components/ui/Container.tsx";
import { Logo } from "@/components/ui/Logo.tsx";

export function SiteFooter() {
  return (
    <footer className="border-t border-border pt-12 pb-[max(3rem,env(safe-area-inset-bottom))]">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="text-small text-text-muted">
          © {new Date().getFullYear()} Nayab Gull. Full-stack development, GoHighLevel and AI
          automation for US businesses.
        </p>
      </Container>
    </footer>
  );
}
