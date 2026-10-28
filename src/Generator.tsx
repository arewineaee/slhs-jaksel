
import { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase.ts'
import './Generator.css'

const LOGO_URL = '/images/logo-slhs.svg'
const CANVAS_SIZE = 1000

type Certificate = {
  certificate_number: string
  business_name: string
  business_address: string
  business_type: string | null
  status: 'active' | 'inactive' | 'expired'
  issued_at: string | null
  expires_at: string | null
}

function drawCurvedText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  fontSize: number,
) {
  const chars = [...text]
  context.save()
  context.font = `800 ${fontSize}px Arial, sans-serif`
  context.fillStyle = '#ffffff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.shadowColor = 'rgba(0,0,0,0.12)'
  context.shadowBlur = 1

  const widths = chars.map((char) => context.measureText(char).width + 1)
  const totalAngle = widths.reduce((sum, width) => sum + width / radius, 0)
  let angle = Math.PI / 2 + totalAngle / 2

  chars.forEach((char, index) => {
    const advance = widths[index] / radius
    angle -= advance / 2
    context.save()
    context.translate(
      centerX + Math.cos(angle) * radius,
      centerY + Math.sin(angle) * radius,
    )
    context.rotate(angle - Math.PI / 2)
    context.fillText(char, 0, 0)
    context.restore()
    angle -= advance / 2
  })
  context.restore()
}

function renderLogo(canvas: HTMLCanvasElement, number: string) {
  const context = canvas.getContext('2d')
  if (!context) return

  const image = new Image()

  image.onload = () => {
    canvas.width = CANVAS_SIZE
    canvas.height = CANVAS_SIZE
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    context.drawImage(image, 0, 0, CANVAS_SIZE, CANVAS_SIZE)

    const line = `NO. SERTIFIKAT ${number}`.toUpperCase()
    drawCurvedText(context, line, 500, 440, 355, 22)
  }

  image.onerror = () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#687a72'
    context.font = '18px Arial, sans-serif'
    context.textAlign = 'center'
    context.fillText(
      'Logo gagal dimuat. Pastikan file tersedia di public/images/logo-slhs.svg',
      canvas.width / 2,
      canvas.height / 2,
    )
  }

  image.src = LOGO_URL
}

function formatDate(date: string | null) {
  if (!date) return '-'

  const parsed = new Date(`${date.slice(0, 10)}T00:00:00`)

  if (Number.isNaN(parsed.getTime())) return date

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

function getStatusLabel(status: Certificate['status']) {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'inactive':
      return 'Tidak aktif'
    case 'expired':
      return 'Kedaluwarsa'
  }
}

function Generator() {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [message, setMessage] = useState('')
  const [step, setStep] = useState<'input' | 'confirm' | 'generated'>('input')
  const [business, setBusiness] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (step === 'generated' && canvasRef.current && business) {
      renderLogo(canvasRef.current, business.certificate_number)
    }
  }, [step, business])

  async function handleLookup() {
    const number = certificateNumber.trim()

    if (!number) {
      setMessage('Masukkan nomor sertifikat SLHS terlebih dahulu.')
      setStep('input')
      setBusiness(null)
      return
    }

    setLoading(true)
    setMessage('')
    setBusiness(null)
    setStep('input')

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select(
          'certificate_number, business_name, business_address, business_type, status, issued_at, expires_at',
        )
        .eq('certificate_number', number)
        .maybeSingle()

      if (error) throw error

      if (!data) {
        setMessage(
          'Nomor sertifikat tidak ditemukan. Periksa kembali nomor yang dimasukkan.',
        )
        return
      }

      const certificate = data as Certificate
      setBusiness(certificate)
      setStep('confirm')
      setMessage('Data ditemukan. Periksa informasi usaha sebelum melanjutkan.')
    } catch (error) {
      console.error('Gagal mencari sertifikat:', error)
      setMessage(
        'Data sertifikat gagal diambil. Periksa koneksi Supabase dan kebijakan akses database.',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleConfirmation(isCorrect: boolean) {
    if (!isCorrect) {
      setCertificateNumber('')
      setBusiness(null)
      setStep('input')
      setMessage('Silakan periksa kembali nomor sertifikat yang dimasukkan.')
      return
    }

    if (!business || business.status !== 'active') {
      setMessage(
        'Sertifikat tidak berstatus aktif. Logo tidak dapat dibuat melalui alur ini.',
      )
      return
    }

    setStep('generated')
    setMessage(
      'Data berhasil diambil dari database. Pastikan data yang tersimpan memang resmi dan telah diverifikasi.',
    )
  }

  function downloadLogo() {
    const canvas = canvasRef.current
    if (!canvas || !business) return

    const link = document.createElement('a')
    link.download = `logo-slhs-${business.certificate_number.replace(
      /[^a-zA-Z0-9_-]/g,
      '-',
    )}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <main className="generator-page">
      <section className="generator-heading">
        <a href="/" className="back-home">
          ← Kembali ke Beranda
        </a>
        <span className="eyebrow">LAYANAN DIGITAL</span>
        <h1>Generator Logo SLHS</h1>
        <p>
          Periksa informasi usaha terlebih dahulu sebelum membuat logo.
          <br />
          Informasi sertifikat diambil dari database Supabase.
        </p>
      </section>

      <section className="generator-layout">
        <div className="generator-panel">
          <div className="generator-step">
            <span className="step-number">01</span>
            <div>
              <h2>Verifikasi Informasi Usaha</h2>
              <p>
                Masukkan nomor sertifikat untuk mencari informasi usaha dan
                memastikan datanya sesuai.
              </p>
            </div>
          </div>

          <label htmlFor="certificate-number">Nomor sertifikat SLHS</label>
          <input
            id="certificate-number"
            type="text"
            value={certificateNumber}
            autoComplete="off"
            placeholder="Masukkan nomor sertifikat"
            onChange={(event) => {
              setCertificateNumber(event.target.value)
              setMessage('')
              setBusiness(null)
              setStep('input')
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !loading) {
                void handleLookup()
              }
            }}
          />

          <button
            type="button"
            className="verify-button"
            onClick={() => void handleLookup()}
            disabled={loading}
          >
            {loading ? 'Memeriksa...' : 'Periksa Sertifikat'}
            <span aria-hidden="true">→</span>
          </button>

          {message && (
            <div className="verification-message" role="status">
              {message}
            </div>
          )}

          {business && step !== 'input' && (
            <>
              <div className="business-info">
                <h3>Informasi Umum</h3>

                <dl>
                  <div>
                    <dt>Nama Usaha:</dt>
                    <dd>{business.business_name}</dd>
                  </div>
                  <div>
                    <dt>Jenis Usaha:</dt>
                    <dd>{business.business_type || '-'}</dd>
                  </div>
                  <div>
                    <dt>No. Sertifikat:</dt>
                    <dd>{business.certificate_number}</dd>
                  </div>
                  <div>
                    <dt>Tanggal Terbit:</dt>
                    <dd>{formatDate(business.issued_at)}</dd>
                  </div>
                  <div>
                    <dt>Sertifikat Berakhir:</dt>
                    <dd>{formatDate(business.expires_at)}</dd>
                  </div>
                  <div>
                    <dt>Status Database:</dt>
                    <dd>{getStatusLabel(business.status)}</dd>
                  </div>
                  <div>
                    <dt>Alamat:</dt>
                    <dd>{business.business_address}</dd>
                  </div>
                </dl>

                
              </div>

              {step === 'confirm' && (
                <div className="confirm-question">
                  <h3>Apakah informasi usaha ini sudah sesuai?</h3>
                  <p>
                    Pastikan nomor sertifikat dan informasi usaha sesuai
                    sebelum membuat logo.
                  </p>
                  <div className="confirm-actions">
                    <button
                      type="button"
                      className="confirm-yes"
                      onClick={() => handleConfirmation(true)}
                      disabled={business.status !== 'active'}
                    >
                      Ya, sudah sesuai
                    </button>
                    <button
                      type="button"
                      className="confirm-no"
                      onClick={() => handleConfirmation(false)}
                    >
                      Tidak sesuai
                    </button>
                  </div>
                  {business.status !== 'active' && (
                    <p>
                      Sertifikat tidak aktif. Pembuatan logo dinonaktifkan.
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          <div className="generator-notice">
            <span className="notice-icon">i</span>
            <p>
              <strong>Informasi database</strong>
              <br />
              Data yang ditampilkan berasal dari Supabase. Data contoh tetap
              merupakan data simulasi, bukan sertifikat resmi.
            </p>
          </div>
        </div>

        <section className="logo-preview-panel" aria-live="polite">
          <div className="preview-heading">
            <span className="step-number">02</span>
            <div>
              <h2>Pratinjau Logo</h2>
              <p>Logo dibuat setelah informasi usaha dikonfirmasi.</p>
            </div>
          </div>

          {step === 'generated' && business ? (
            <>
              <div className="logo-preview">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  aria-label={`Pratinjau logo SLHS nomor ${business.certificate_number}`}
                />
              </div>
              <button
                type="button"
                className="download-button"
                onClick={downloadLogo}
              >
                Unduh Logo PNG <span aria-hidden="true">↓</span>
              </button>
              <button
                type="button"
                className="confirm-no back-to-check"
                onClick={() => setStep('confirm')}
              >
                Kembali ke informasi usaha
              </button>
            </>
          ) : (
            <div className="preview-empty">
              <div className="preview-empty-icon">SLHS</div>
              <p>
                Pratinjau logo akan muncul setelah Anda mengonfirmasi informasi
                usaha.
              </p>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default Generator
