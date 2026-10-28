import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Generator from './Generator'
import './App.css'

function Home() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenDropdown(null)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="app">
      <header className="navbar" ref={navRef}>
        <a
          href="#beranda"
          className="brand"
          onClick={() => setOpenDropdown(null)}
          aria-label="SLHS Jakarta Selatan - Beranda"
        >
          <span className="brand-icon">S</span>
          <span>SLHS JAKSEL</span>
        </a>

        <nav className="nav-links" aria-label="Navigasi utama">
          <a href="#beranda" onClick={() => setOpenDropdown(null)}>
            Beranda
          </a>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-trigger"
              aria-expanded={openDropdown === 'info'}
              onClick={() =>
                setOpenDropdown(openDropdown === 'info' ? null : 'info')
              }
            >
              Informasi <span className="dropdown-arrow">▾</span>
            </button>

            {openDropdown === 'info' && (
              <div className="dropdown-menu">
                <a href="#tentang" onClick={() => setOpenDropdown(null)}>
                  Tentang SLHS
                </a>
                <a href="#persyaratan" onClick={() => setOpenDropdown(null)}>
                  Persyaratan &amp; Prosedur
                </a>
                <a href="#faq" onClick={() => setOpenDropdown(null)}>
                  FAQ
                </a>
              </div>
            )}
          </div>

          <div className="nav-dropdown">
            <button
              type="button"
              className="nav-dropdown-trigger"
              aria-expanded={openDropdown === 'layanan'}
              onClick={() =>
                setOpenDropdown(openDropdown === 'layanan' ? null : 'layanan')
              }
            >
              Layanan <span className="dropdown-arrow">▾</span>
            </button>

            {openDropdown === 'layanan' && (
              <div className="dropdown-menu">
                <a href="/generator" onClick={() => setOpenDropdown(null)}>
                  Generator Logo SLHS
                </a>
              </div>
            )}
          </div>

          <a href="#kontak" onClick={() => setOpenDropdown(null)}>
            Kontak
          </a>

          <a
            href="/generator"
            className="nav-cta"
            onClick={() => setOpenDropdown(null)}
          >
            Buat Logo SLHS <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="beranda">
          <div className="hero-content">
            <span className="eyebrow">
              Portal informasi SLHS
              <br />
              Suku Dinas Kesehatan Jakarta Selatan
            </span>

            <h1>Selamat datang!</h1>

            <p>
              Akses informasi mengenai SLHS, persyaratan dan panduan pengajuan
              SLHS, serta pembuatan logo SLHS.
            </p>

            <div className="hero-actions">
              <a href="/generator" className="button-primary">
                Generator Logo SLHS <span aria-hidden="true">→</span>
              </a>

              <a
                href="https://oss.go.id/"
                className="button-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Pengajuan SLHS (OSS)
              </a>

              <a href="#tentang" className="button-secondary">
                Pelajari SLHS
              </a>
            </div>
          </div>
        </section>

        <section className="about-section" id="tentang">
          <div className="about-heading">
            <h2>Tentang SLHS</h2>
            <p>
              Informasi dasar untuk mengenal Sertifikat Laik Higiene Sanitasi.
            </p>
          </div>

          <div className="about-list">
            <article className="about-row">
              <span className="about-number">01</span>
              <div className="about-copy">
                <h3>Apa itu SLHS?</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </p>
              </div>
            </article>

            <article className="about-row" id="persyaratan">
              <span className="about-number">02</span>
              <div className="about-copy">
                <h3>Siapa saja yang perlu memiliki SLHS?</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
            </article>

            <article className="about-row" id="faq">
              <span className="about-number">03</span>
              <div className="about-copy">
                <h3>Bagaimana mengajukan SLHS?</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Duis aute irure dolor in reprehenderit in voluptate velit
                  esse.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="generator-banner" id="generator">
          <div className="generator-content">
            <span className="eyebrow">UNTUK PEMEGANG SLHS</span>
            <h2>Sudah memiliki SLHS? Lengkapi dengan logo SLHS.</h2>
            <p>
              Gunakan Generator Logo SLHS untuk membantu menyiapkan logo bagi
              usaha Anda yang telah memiliki Sertifikat Laik Higiene Sanitasi.
            </p>
            <a href="/generator" className="button-light">
              Buat Logo SLHS <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer id="kontak">
        <a href="#beranda" className="brand footer-brand">
          <span className="brand-icon">S</span>
          <span>SLHS JAKSEL</span>
        </a>

      

        <span className="footer-note">
          Informasi resmi akan dilengkapi setelah sumber dan ketentuan
          diverifikasi.
        </span>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generator" element={<Generator />} />
    </Routes>
  )
}

export default App
