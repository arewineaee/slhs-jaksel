import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Generator from './Generator'
import './App.css'
import PersyaratanProsedur from "./PersyaratanProsedur";


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
                  Berdasarkan Peraturan Pemerintah RI Nomor 28 Tahun 2025 dan Peraturan Menteri Kesehatan RI Nomor 11 Tahun 2025,
                  Sertifikat Laik Higiene Sanitasi (SLHS) adalah bukti tertulis keamanan pangan untuk pemenuhan standar baku mutu
                  dan persyaratan kesehatan pangan olahan siap saji.
                </p>

                <p>
                  SLHS merupakan salah satu Perizinan Berusaha untuk Menunjang Kegiatan Usaha (PB UMKU) pada sektor kesehatan.
                  PB UMKU adalah perizinan yang diperlukan bagi pelaku usaha untuk menunjang pelaksanaan kegiatan usaha dan/atau produk pada tahap operasional dan/atau komersial.
                  Melalui sertifikat ini, pemerintah memastikan bahwa Tempat Pengelolaan Pangan (TPP) telah menerapkan prinsip higiene dan sanitasi serta memenuhi persyaratan
                  keamanan pangan sehingga pangan yang diolah dan disajikan aman untuk dikonsumsi masyarakat.
                </p>
              </div>
            </article>

            <article className="about-row" id="persyaratan">
              <span className="about-number">02</span>
              <div className="about-copy">
                <h3>Siapa saja yang perlu memiliki SLHS?</h3>
                <p>
                  Kewajiban kepemilikan SLHS ditentukan berdasarkan jenis kegiatan usaha, klasifikasi KBLI, tingkat risiko, dan skala usaha. Beberapa kategori yang tercakup dalam ketentuan antara lain restoran, kedai makanan tertentu, jasa boga, rumah minum atau kafe, serta depot air minum. Pelaku usaha perlu memeriksa persyaratan yang sesuai dengan kategori usahanya.
                </p>
                <Link to="/persyaratan-prosedur" className="learn-more">
                  Pelajari selengkapnya <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <article className="about-row" id="faq">
              <span className="about-number">03</span>
              <div className="about-copy">
                <h3>Bagaimana mengajukan SLHS?</h3>
                <p>
                  Pelaku usaha perlu menyiapkan dokumen perizinan, hasil pemeriksaan mandiri melalui Inspeksi Kesehatan Lingkungan (IKL), sertifikat pelatihan keamanan pangan, dokumen kesehatan penjamah pangan, serta hasil uji laboratorium sesuai persyaratan. Permohonan diajukan melalui OSS pada menu PB UMKU untuk selanjutnya melalui proses verifikasi administrasi dan lapangan oleh petugas berwenang.
                </p>
                <Link to="/persyaratan-prosedur" className="learn-more">
                  Pelajari selengkapnya <span aria-hidden="true">→</span>
                </Link>
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
      <Route
        path="/persyaratan-prosedur"
        element={<PersyaratanProsedur />}
      />
    </Routes>
  )
}

export default App
