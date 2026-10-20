import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Globe2,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Wrench,
} from "lucide-react";
import { DigitalCardActions } from "@/components/digital-card-actions";
import { site } from "@/lib/site";
import "./digital-card.css";

export const metadata: Metadata = {
  title: "Cartão digital",
  description:
    "Todos os contactos e plataformas oficiais da SAMMAC num só lugar. Formação técnica e soluções industriais em Angola.",
  alternates: { canonical: site.cardUrl },
  openGraph: {
    title: "SAMMAC | Vamos conectar-nos",
    description:
      "Formação técnica, soluções industriais e todos os nossos contactos num só lugar.",
    url: site.cardUrl,
    images: [
      {
        url: "/links/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SAMMAC — Cartão digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMMAC | Vamos conectar-nos",
    description: "Todos os nossos contactos num só lugar.",
    images: ["/links/opengraph-image"],
  },
};

function TikTokIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.5 2h-3v13.5a3 3 0 1 1-3-3V9.4A6.1 6.1 0 1 0 16.6 15V8.4A9.2 9.2 0 0 0 22 10V7a5.5 5.5 0 0 1-5.5-5Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4A24 24 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 9h4v13H2Zm7 0h4v1.8c.7-1.2 1.8-2.1 3.8-2.1 4.1 0 4.7 2.7 4.7 6.1V22h-4v-6.4c0-1.6 0-3.5-2.2-3.5s-2.3 1.7-2.3 3.4V22H9Z" />
    </svg>
  );
}

const platforms = [
  {
    name: "Site oficial",
    description: "Conhece o centro e o nosso trabalho",
    href: site.domain,
    Icon: Globe2,
    featured: true,
  },
  {
    name: "Instagram",
    description: "O dia a dia da SAMMAC",
    href: site.instagram,
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    description: "Novidades, formações e comunidade",
    href: site.facebook,
    Icon: FacebookIcon,
  },
  {
    name: "TikTok",
    description: "A prática ganha vida em vídeo",
    href: site.tiktok,
    Icon: TikTokIcon,
  },
  {
    name: "LinkedIn",
    description: "Liga-te à nossa rede profissional",
    href: site.linkedin,
    Icon: LinkedInIcon,
  },
];

export default function DigitalCardPage() {
  return (
    <main id="conteudo" className="digital-page">
      <div className="digital-topline">
        <span>UM CENTRO. TODAS AS CONEXÕES.</span>
        <span>
          <MapPin size={14} aria-hidden="true" />
          Angola
        </span>
      </div>
      <article className="digital-card" aria-label="Cartão digital da SAMMAC">
        <section className="digital-profile" aria-labelledby="digital-title">
          <div className="digital-photo">
            <Image
              src="/images/technician-black.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 440px, 100vw"
            />
          </div>
          <div className="digital-profile-content">
            <a
              href={site.domain}
              className="digital-logo"
              aria-label="Visitar o site oficial da SAMMAC"
            >
              <Image
                src="/brand/sammac-logo-horizontal.png"
                alt="SAMMAC — Centro Técnico de Treinamento"
                width={280}
                height={73}
                sizes="240px"
                priority
              />
            </a>
            <div className="digital-identity">
              <p className="digital-eyebrow">
                <span />
                CENTRO TÉCNICO DE TREINAMENTO
              </p>
              <h1 id="digital-title">
                Conhecimento que liga.
                <br />
                <span>Prática que transforma.</span>
              </h1>
              <p className="digital-intro">
                Formamos profissionais. Criamos soluções para pessoas, empresas
                e indústria.
              </p>
            </div>
            <div className="digital-profile-bottom">
              <p>FORMAÇÃO TÉCNICA & SOLUÇÕES INDUSTRIAIS</p>
              <a href="#plataformas">
                Encontra-nos aqui <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <div className="digital-connections">
          <header className="digital-heading">
            <p className="digital-eyebrow">VAMOS CONECTAR-NOS</p>
            <h2>A SAMMAC, sempre perto.</h2>
            <p>Escolhe a tua plataforma. A ligação começa aqui.</p>
          </header>
          <a
            className="digital-whatsapp"
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={23} aria-hidden="true" />
            <span>
              <strong>Fala connosco no WhatsApp</strong>
              <small>{site.phone}</small>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <nav
            id="plataformas"
            className="digital-platforms"
            aria-label="Plataformas oficiais da SAMMAC"
          >
            {platforms.map(({ name, description, href, Icon, featured }) => (
              <a
                key={name}
                className={`digital-platform${featured ? " digital-platform-featured" : ""}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="digital-platform-icon">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <span>
                  <strong>{name}</strong>
                  <small>{description}</small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="digital-quicklinks">
            <a href={`${site.domain}/formacoes`}>
              <GraduationCap size={18} aria-hidden="true" />
              Ver formações
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={`${site.domain}/servicos`}>
              <Wrench size={17} aria-hidden="true" />
              Os nossos serviços
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="digital-contact">
            <a href={site.phoneHref}>
              <Phone size={17} aria-hidden="true" />
              <span>
                <small>Telefone</small>
                {site.phone}
              </span>
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={18} aria-hidden="true" />
              <span>
                <small>E-mail</small>
                {site.email}
              </span>
            </a>
          </div>
          <DigitalCardActions />
        </div>
      </article>
      <footer className="digital-footer">
        <a href={site.domain}>
          SAMMAC <span>© {new Date().getFullYear()}</span>
        </a>
        <a href={`${site.domain}/privacidade`}>Privacidade</a>
      </footer>
    </main>
  );
}
