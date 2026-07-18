import { Seo } from "../components/ui/Seo";

const content = {
  about: {
    title: "Made for curious minds.",
    eyebrow: "About the platform",
    description: "A calm visual discovery space for ideas with context.",
    sections: [
      ["Why we exist", "The internet has no shortage of images. What is often missing is context: who made something, why it matters, and how it might inform your own work. This community is designed around thoughtful discovery rather than endless interruption."],
      ["Independent by design", "This product has its own identity and interaction language. It is inspired by the broad idea of visual collecting, not by any single platform's brand or interface."],
      ["Built with care", "Accessibility, privacy, useful attribution, responsive imagery, and respectful community tools are product requirements—not finishing touches."],
    ],
  },
  guidelines: {
    title: "Create with care.",
    eyebrow: "Community guidelines",
    description: "Simple standards for a useful and welcoming visual community.",
    sections: [
      ["Share what you can stand behind", "Post work you created or have permission to share. Credit original makers, describe images accurately, and avoid misleading titles or tags."],
      ["Respect people", "Harassment, hateful conduct, sexual exploitation, threats, doxxing, and targeted abuse are not accepted. Critique ideas without attacking people."],
      ["Keep discovery useful", "Do not post spam, deceptive links, repetitive promotion, unsafe instructions, or manipulated engagement. Report concerns privately so moderators can review them."],
    ],
  },
  privacy: {
    title: "Privacy in plain language.",
    eyebrow: "Privacy",
    description: "What the product needs, what it stores, and what remains yours.",
    sections: [
      ["Information you provide", "Account details, profile information, posts, comments, collections, and reports are stored to provide the service. Private collections are never included in public feeds or sitemaps."],
      ["Security and sessions", "Authentication uses short-lived access credentials and secure refresh cookies. Sensitive account fields are excluded from public API responses."],
      ["Your choices", "You can edit or delete content, make collections private, export account data, and request account deletion. Analytics remains disabled until consent requirements are satisfied."],
    ],
  },
  terms: {
    title: "Clear expectations.",
    eyebrow: "Terms",
    description: "The basic agreement for using this visual discovery platform.",
    sections: [
      ["Your content", "You retain ownership of content you upload and grant the service permission to display, resize, and distribute it solely to operate the product."],
      ["Acceptable use", "Do not misuse accounts, scrape private data, attack infrastructure, evade moderation, or upload unlawful and infringing material."],
      ["Availability", "The service may change as it develops. Important changes to these terms or privacy practices will be communicated before they take effect."],
    ],
  },
} as const;

export default function StaticPage({ page }: { page: keyof typeof content }) {
  const item = content[page];
  return <div className="page"><Seo title={item.eyebrow} description={item.description} path={`/${page}`} /><article className="container" style={{ maxWidth: 980 }}><span className="eyebrow">{item.eyebrow}</span><h1 className="editorial" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", lineHeight: .86, margin: ".6rem 0 2rem" }}>{item.title}</h1><p className="hero-copy" style={{ marginBottom: "3rem" }}>{item.description}</p><div style={{ display: "grid", gap: "1rem" }}>{item.sections.map(([title, body]) => <section className="surface" style={{ padding: "clamp(1.25rem, 4vw, 2.5rem)" }} key={title}><h2 className="editorial" style={{ fontSize: "2rem", margin: "0 0 .6rem" }}>{title}</h2><p className="muted" style={{ lineHeight: 1.8, margin: 0 }}>{body}</p></section>)}</div></article></div>;
}
