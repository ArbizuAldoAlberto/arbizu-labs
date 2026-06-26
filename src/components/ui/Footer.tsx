import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-space-border)] bg-[var(--color-deep-space)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl text-white font-bold mb-4">
              Arbizu<span className="text-[#1D9E75]">Labs</span>
            </h3>
            <p className="font-mono text-xs text-[#C2C0B6]/60 leading-relaxed">
              Agencia de software enterprise especializada en arquitecturas Offline-First y SaaS B2B.
            </p>
          </div>

          <div>
            <h4 className="font-space text-xs uppercase tracking-widest text-white font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 font-mono text-xs text-[#C2C0B6]/60">
              <li><Link href="/services#mobile" className="hover:text-white transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services#saas" className="hover:text-white transition-colors">SaaS Platforms</Link></li>
              <li><Link href="/services#automation" className="hover:text-white transition-colors">n8n Automation</Link></li>
              <li><Link href="/services#security" className="hover:text-white transition-colors">Security Audit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-space text-xs uppercase tracking-widest text-white font-bold mb-4">Recursos</h4>
            <ul className="space-y-2 font-mono text-xs text-[#C2C0B6]/60">
              <li><Link href="/cases" className="hover:text-white transition-colors">Casos de Estudio</Link></li>
              <li><a href="https://arbizualdo.gumroad.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Kits de Código (Gumroad)</a></li>
              <li><Link href="/whitepaper" className="hover:text-white transition-colors">Whitepaper Gratuito</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog Técnico</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-space text-xs uppercase tracking-widest text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 font-mono text-xs text-[#C2C0B6]/60">
              <li><a href="mailto:aldo@arbizulabs.com" className="hover:text-white transition-colors">aldo@arbizulabs.com</a></li>
              <li><Link href="/booking" className="hover:text-white transition-colors">Agendar Discovery Call</Link></li>
              <li><a href="https://aldoarbizu.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio del Fundador →</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-space-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#C2C0B6]/40">
            © 2026 Arbizu Labs. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 font-mono text-xs text-[#C2C0B6]/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
