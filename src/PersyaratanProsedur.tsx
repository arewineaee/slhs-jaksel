import { Link } from "react-router-dom";
import "./PersyaratanProsedur.css";

const jenisTPP = [
  {
    kbli: "56101",
    nama: "Restoran",
    mikro: "Menengah Rendah — SLHS",
    kecil: "Menengah Tinggi — SLHS",
    menengah: "Menengah Tinggi — SLHS",
    besar: "Menengah Tinggi — SLHS",
  },
  {
    kbli: "56103",
    nama: "Kedai Makanan",
    mikro: "Menengah Rendah — Label HSP",
    kecil: "Menengah Rendah — SLHS",
    menengah: "—",
    besar: "—",
  },
  {
    kbli: "56210",
    nama: "Jasa Boga untuk Suatu Event Tertentu",
    mikro: "Menengah Rendah — Label HSP",
    kecil: "Menengah Rendah — Label HSP",
    menengah: "Menengah Tinggi — SLHS",
    besar: "Menengah Tinggi — SLHS",
  },
  {
    kbli: "56290",
    nama: "Penyediaan Jasa Boga Periode Tertentu",
    mikro: "Menengah Rendah — Label HSP",
    kecil: "Menengah Rendah — Label HSP",
    menengah: "Menengah Tinggi — SLHS",
    besar: "Menengah Tinggi — SLHS",
  },
  {
    kbli: "56303",
    nama: "Rumah Minum/Kafe",
    mikro: "Menengah Rendah — Label HSP",
    kecil: "Menengah Rendah — SLHS",
    menengah: "Menengah Rendah — SLHS",
    besar: "Menengah Rendah — SLHS",
  },
  {
    kbli: "68120",
    nama: "Kawasan Pariwisata",
    mikro: "—",
    kecil: "—",
    menengah: "Tinggi — SLHS",
    besar: "Tinggi — SLHS",
  },
  {
    kbli: "11052",
    nama: "Industri Air Minum Isi Ulang (Depot Air Minum)",
    mikro: "—",
    kecil: "Menengah Tinggi — SLHS",
    menengah: "Menengah Tinggi — SLHS",
    besar: "Menengah Tinggi — SLHS",
  },
];

const persyaratan = [
  {
    nomor: "01",
    judul: "Dokumen perizinan berusaha",
    deskripsi:
      "Siapkan dokumen perizinan berusaha sesuai ketentuan, seperti Nomor Induk Berusaha (NIB), Sertifikat Standar, dan/atau izin yang dipersyaratkan.",
  },
  {
    nomor: "02",
    judul: "Pemeriksaan mandiri melalui IKL",
    deskripsi:
      "Lengkapi formulir Inspeksi Kesehatan Lingkungan (IKL) sesuai jenis TPP. Artikel Dinkes DKI Jakarta mencantumkan nilai hasil IKL minimal 80.",
  },
  {
    nomor: "03",
    judul: "Pelatihan keamanan pangan",
    deskripsi:
      "Siapkan sertifikat pelatihan Keamanan Pangan Siap Saji (KPSS) atau sertifikat kompetensi yang sesuai bagi pengelola, penanggung jawab, dan penjamah pangan.",
  },
  {
    nomor: "04",
    judul: "Hasil pemeriksaan laboratorium",
    deskripsi:
      "Siapkan hasil pemeriksaan laboratorium sesuai persyaratan dan jenis TPP. Untuk Depot Air Minum (DAM), terdapat persyaratan khusus terkait air baku dan kualitas air minum.",
  },
];

const prosedur = [
  {
    nomor: "01",
    judul: "Periksa kategori dan persyaratan usaha",
    deskripsi:
      "Pastikan KBLI, skala usaha, tingkat risiko, dan jenis sertifikasi yang dibutuhkan sesuai ketentuan yang berlaku.",
  },
  {
    nomor: "02",
    judul: "Lengkapi dokumen dan persyaratan teknis",
    deskripsi:
      "Siapkan dokumen perizinan, hasil IKL, sertifikat pelatihan, serta hasil laboratorium apabila dipersyaratkan.",
  },
  {
    nomor: "03",
    judul: "Ajukan melalui OSS",
    deskripsi:
      "Ajukan permohonan pada sistem Online Single Submission (OSS) melalui menu Perizinan Berusaha untuk Menunjang Kegiatan Usaha (PB UMKU), sesuai prosedur yang tersedia.",
  },
  {
    nomor: "04",
    judul: "Jalani proses verifikasi",
    deskripsi:
      "Petugas berwenang melakukan verifikasi administrasi dan verifikasi lapangan sesuai ketentuan. Pelaku usaha perlu menindaklanjuti apabila ada dokumen atau kondisi yang harus diperbaiki.",
  },
  {
    nomor: "05",
    judul: "Penerbitan sertifikat",
    deskripsi:
      "Setelah persyaratan terpenuhi dan proses verifikasi selesai, rekomendasi diterbitkan oleh instansi berwenang sebagai dasar penerbitan SLHS sesuai prosedur yang berlaku.",
  },
];

function PersyaratanProsedur() {
  return (
    <main className="slhs-guide">
      <header className="guide-hero">
        <Link to="/" className="guide-back">
          <span aria-hidden="true">←</span> Kembali ke Beranda
        </Link>

        <span className="guide-eyebrow">PANDUAN PELAKU USAHA</span>

        <h1>Persyaratan dan Prosedur SLHS</h1>

        <p>
          Kenali jenis usaha, persyaratan, dan tahapan pengajuan
          Sertifikat Laik Higiene Sanitasi untuk mendukung keamanan pangan.
        </p>
      </header>

      <section className="guide-section">
        <div className="guide-section-heading">
          <span className="guide-section-number">01</span>
          <div>
            <h2>Jenis TPP dan Kewajiban Sertifikasi</h2>
            <p>
              Kebutuhan sertifikasi ditentukan berdasarkan KBLI, skala
              usaha, dan tingkat risiko usaha.
            </p>
          </div>
        </div>

        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>KBLI</th>
                <th>Jenis Usaha</th>
                <th>Mikro</th>
                <th>Kecil</th>
                <th>Menengah</th>
                <th>Besar</th>
              </tr>
            </thead>

            <tbody>
              {jenisTPP.map((item) => (
                <tr key={item.kbli}>
                  <td className="guide-kbli">{item.kbli}</td>
                  <td className="guide-business-name">{item.nama}</td>
                  <td>{item.mikro}</td>
                  <td>{item.kecil}</td>
                  <td>{item.menengah}</td>
                  <td>{item.besar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="guide-note">
          <strong>Perlu diperhatikan</strong>
          <p>
            Label HSP adalah Label Higiene Sanitasi Pangan. Tanda "—"
            berarti tidak ada kategori yang dicantumkan pada tabel acuan
            Dinkes DKI Jakarta, bukan berarti usaha tersebut otomatis
            bebas dari seluruh kewajiban higiene sanitasi.
          </p>
          <p>
            Tabel ini mengikuti publikasi Dinkes DKI Jakarta. Pastikan
            kembali klasifikasi KBLI, skala usaha, dan persyaratan terbaru
            melalui OSS sebelum mengajukan permohonan.
          </p>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading">
          <span className="guide-section-number">02</span>
          <div>
            <h2>Persyaratan Pengajuan</h2>
            <p>
              Persiapkan dokumen berikut dengan menyesuaikannya pada
              kategori usaha dan ketentuan yang berlaku.
            </p>
          </div>
        </div>

        <div className="guide-requirements">
          {persyaratan.map((item) => (
            <article className="guide-requirement" key={item.nomor}>
              <span className="guide-card-number">{item.nomor}</span>
              <div>
                <h3>{item.judul}</h3>
                <p>{item.deskripsi}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading">
          <span className="guide-section-number">03</span>
          <div>
            <h2>Prosedur Pengajuan</h2>
            <p>
              Berikut gambaran umum tahapan pengajuan SLHS melalui sistem
              perizinan berusaha.
            </p>
          </div>
        </div>

        <div className="guide-timeline">
          {prosedur.map((item) => (
            <article className="guide-step" key={item.nomor}>
              <span className="guide-step-number">{item.nomor}</span>
              <div>
                <h3>{item.judul}</h3>
                <p>{item.deskripsi}</p>
              </div>
            </article>
          ))}
        </div>

        <a
          className="guide-primary-button"
          href="https://oss.go.id/"
          target="_blank"
          rel="noreferrer"
        >
          Buka Portal OSS <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="guide-section">
        <div className="guide-section-heading">
          <span className="guide-section-number">04</span>
          <div>
            <h2>Masa Berlaku SLHS</h2>
            <p>
              Berdasarkan informasi Dinkes DKI Jakarta, SLHS berlaku
              selama lima tahun sejak diterbitkan. Pengajuan perpanjangan
              disebutkan paling lambat tiga bulan sebelum masa berlaku
              berakhir. Konfirmasikan kembali ketentuan yang berlaku
              kepada instansi berwenang.
            </p>
          </div>
        </div>
      </section>

      <section className="guide-legal">
        <span className="guide-eyebrow">REFERENSI REGULASI</span>
        <h2>Dasar Hukum</h2>
        <p>
          Informasi pada halaman ini merujuk pada publikasi Dinkes DKI
          Jakarta dan regulasi perizinan subsektor kesehatan.
        </p>

        <a
          href="https://peraturan.bpk.go.id/Details/319773/pp-no-28-tahun-2025"
          target="_blank"
          rel="noreferrer"
          className="guide-legal-link"
        >
          PP Nomor 28 Tahun 2025
          <span aria-hidden="true">↗</span>
        </a>

        <a
          href="https://jdih.kemkes.go.id/documents/peraturan-menteri-kesehatan-nomor-11-tahun-2025"
          target="_blank"
          rel="noreferrer"
          className="guide-legal-link"
        >
          Permenkes Nomor 11 Tahun 2025
          <span aria-hidden="true">↗</span>
        </a>

        <a
          href="https://dinkes.jakarta.go.id/index.php/berita/read/sertifikat-laik-higiene-sanitasi-slhs-bukti-tertulis-keamanan-pangan"
          target="_blank"
          rel="noreferrer"
          className="guide-legal-link"
        >
          Artikel SLHS — Dinkes DKI Jakarta
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="guide-footer">
        <h2>Masih memiliki pertanyaan?</h2>
        <p>
          Untuk informasi dan pendampingan, pelaku usaha dapat berkonsultasi
          dengan Puskesmas setempat atau Suku Dinas Kesehatan sesuai wilayah
          usaha.
        </p>

        <Link to="/" className="guide-secondary-button">
          Kembali ke Beranda
        </Link>
      </footer>
    </main>
  );
}

export default PersyaratanProsedur;