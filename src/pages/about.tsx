export default function AboutPage() {
  return (
    <div className="about">
      <header className="mb-3">
        <h1>About CryptoNexus</h1>
      </header>

      <section className="mb-3">
        <p>
          CryptoNexus is a lightweight interface for exploring cryptocurrency
          data and market trends. It aggregates curated information from the
          CoinGecko API so you can quickly access coin metadata, track market
          movements, and discover new projects.
        </p>

        <p>
          Our goal is to provide a fast, distraction-free experience for both
          newcomers and experienced traders. We prioritize clarity, sensible
          defaults, and a small set of tools that help you understand the market
          without overwhelming you.
        </p>
      </section>

      <section className="mb-3">
        <h2>Features</h2>
        <ul className="about-list">
          <li>Real-time cryptocurrency data from CoinGecko</li>
          <li>Clean, minimal interface with no distractions</li>
          <li>Filter and sort coins by various metrics</li>
          <li>Detailed coin pages with charts and metadata</li>
          <li>Responsive design that works on all devices</li>
        </ul>
      </section>

      <section>
        <h2>Open Source & Community</h2>
        <p>
          CryptoNexus is open-source and community-driven. Contributions are
          welcome — whether it’s improving accessibility, adding features,
          fixing bugs, or suggesting enhancements. Check the repository for
          contributing guidelines.
        </p>

        <p>
          If you have questions or want to suggest integrations with other
          services, feel free to open an issue or start a discussion on the
          project's GitHub.
        </p>
      </section>
    </div>
  )
}
