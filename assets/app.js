/* Aktaklik funnel showcase. Static, works from file:// */
(function () {
  const WA_NUMBER = ''; // isi nomor WhatsApp tim, contoh: '6281234567890'
  const qs = new URLSearchParams(location.search);
  const page = document.body.dataset.page;
  const src = document.body.dataset.lp || qs.get('src') || '1';
  const nama = (qs.get('nama') || '').trim();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const has = typeof gsap !== 'undefined';
  if (has && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const withParams = (url, extra = {}) => {
    const p = new URLSearchParams({ src, ...(nama ? { nama } : {}), ...extra });
    return `${url}?${p.toString()}`;
  };

  const ICON = {
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.5 1.5L7.5 5M3.5 12l1.5 1.5L7.5 11M3.5 18l1.5 1.5L7.5 17"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    id: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M15 10h3M15 13h3"/>',
    check: '<path d="m5 12 5 5 9-10"/>'
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;

  const HERO = {
    1: { h: ['Buat Draft Akta', 'Cuma <em>3 Menit</em>'], s: 'Upload dokumen klien. AI isi aktanya. Anda tinggal cek.' },
    2: { h: ['Stop Ketik Ulang', '<em>Dokumen Klien</em>'], s: 'Upload KTP & akta lama. AI isi draft akta RUPS Anda otomatis.' },
    3: { h: ['Kerja Cepat,', 'Kantor <em>Tetap Aman</em>'], s: 'Drafting lebih cepat, cek KTP & PMPJ tetap jalan.' }
  };
  const LPS = {
    1: { short: 'Draft 3 Menit', eb: 'DRAFTING AKTA LEBIH CEPAT', a: 'Draft Akta Selesai', b: 'dalam 3 Menit',
      sub: 'Upload dokumen klien, AI membaca datanya lalu mengisi template akta kantor Anda. Lebih sedikit salah ketik, lebih banyak waktu untuk klien.',
      chips: ['Ekstraksi data otomatis', 'Minim salah input', 'Output PDF & Word'],
      cE: 'KENAPA AKTAKLIK', cA: 'Kerja Notaris Bukan Cuma', cB: 'Drafting Akta', cSub: 'Waktu yang biasanya habis untuk ketik ulang bisa dipakai untuk klien dan due diligence yang lebih dalam.',
      cards: [['file', 'Data terisi otomatis', 'Nama, NIK, alamat, dan data lain diambil langsung dari dokumen klien.'], ['list', 'Kurangi salah input', 'Tidak perlu ketik ulang satu per satu, jadi risiko salah digit lebih kecil.'], ['user', 'Fokus ke klien', 'Drafting lebih singkat, Anda bisa fokus ke kebutuhan klien dan due diligence.']],
      steps: [['Upload dokumen klien', 'KTP, sertifikat, atau dokumen lain yang dibutuhkan akta.'], ['AI ekstrak datanya', 'Data dibaca dan dipetakan ke template akta kantor Anda.'], ['Review & unduh', 'Cek hasilnya, sesuaikan, lalu unduh draft dalam Word atau PDF.']] },
    2: { short: 'Tanpa Input Manual', eb: 'AKTA RUPS & PERUBAHAN', a: 'Banyak Dokumen Klien?', b: 'Tak Perlu Input Manual',
      sub: 'KTP, akta perubahan sebelumnya, dan keputusan RUPS dibaca otomatis oleh AI. Datanya langsung masuk ke draft akta, lebih cepat dan lebih sedikit salah.',
      chips: ['Baca banyak dokumen sekaligus', 'Kurangi error', 'Draft siap review'],
      cE: 'YANG DIBACA AKTAKLIK', cA: 'Semua Dokumen,', cB: 'Satu Kali Upload', cSub: 'Tidak perlu lagi bolak-balik membuka dokumen klien dan mengetik ulang datanya ke akta.',
      cards: [['id', 'KTP pemegang saham', 'Nama, NIK, dan alamat terbaca otomatis dari KTP setiap pihak.'], ['layers', 'Akta perubahan sebelumnya', 'Data perseroan dan susunan pengurus diambil dari akta lama.'], ['list', 'Keputusan RUPS', 'Isi keputusan dipetakan ke bagian akta yang sesuai.']],
      steps: [['Upload dokumen RUPS', 'KTP, akta perubahan terakhir, dan keputusan yang diberikan klien.'], ['AI ekstrak & petakan', 'Data dari semua dokumen dikumpulkan ke template akta RUPS.'], ['Review draft akta', 'Cek hasilnya dari dokumen asli, lalu unduh draft akta.']] },
    3: { short: 'Due Diligence', eb: 'EFISIEN & TETAP TELITI', a: 'Efisiensi Penting,', b: 'Due Diligence Wajib',
      sub: 'Aktaklik bukan cuma mempercepat drafting akta. Aktaklik juga membantu kantor Anda menjalankan due diligence supaya tetap terlindungi.',
      chips: ['Cek data KTP', 'Bantu PMPJ', 'Dokumen pendukung otomatis'],
      cE: 'DUE DILIGENCE LEBIH MUDAH', cA: 'Lebih Cepat,', cB: 'Kantor Tetap Terlindungi', cSub: 'Tugas due diligence yang biasanya manual kini tersusun dalam satu alur bersama drafting akta.',
      cards: [['shield', 'Cek keaslian KTP', 'Data KTP klien dicek ke Dukcapil sebelum dipakai di akta.'], ['list', 'Bantu PMPJ', 'Informasi klien untuk PMPJ ditanyakan dan tercatat dengan rapi.'], ['file', 'Dokumen pendukung', 'Surat pernyataan setor modal, kesanggupan NPWP & SPT, dan pemilik manfaat dibuat sekalian.']],
      steps: [['Upload dokumen klien', 'Dokumen yang dibutuhkan untuk akta dan due diligence.'], ['Cek & lengkapi', 'KTP dicek, data PMPJ dilengkapi, dokumen pendukung disiapkan.'], ['Draft akta jadi', 'Draft akta dan dokumen pendukung siap direview tim notaris.']] }
  };
  const PARTS = [
    { t: 'Buat Berkas & Atur Struktur Akta', d: 'Pilih jenis akta, isi nama berkas, lalu atur strukturnya: PT biasa atau PMA, jumlah pendiri, dan kuasa.' },
    { t: 'Kumpulkan Dokumen Klien', d: 'Kirim link upload ke klien atau upload sendiri sekaligus. AI membaca semua dokumen dalam 20 sampai 30 detik.' },
    { t: 'Cek Hasil Ekstraksi & Lengkapi Data', d: 'Lihat data yang diekstrak beserta tingkat keyakinannya, lalu lengkapi KBLI, modal, direksi, dan saksi.' },
    { t: 'Generate Minuta & Dokumen Pendukung', d: 'Generate minuta, salinan, dan dokumen pendukung sekaligus. Hasil minuta keluar dalam sekitar 10 detik.' }
  ];
  const START_PART = { 1: 0, 2: 1, 3: 0 };

  /* ---------- demo bar ---------- */
  function demoBar() {
    const bar = document.createElement('div');
    bar.className = 'demobar';
    const lpBtn = (n) => `<a href="lp-${n}.html" class="${page === 'lp' && src == n ? 'on' : ''}">LP ${n} · ${LPS[n].short}</a>`;
    bar.innerHTML = `<div class="db-in">
      <a class="db-brand" href="index.html">AKTAKLIK FUNNEL <span>SHOWCASE</span></a>
      <nav>${[1, 2, 3].map(lpBtn).join('')}<i></i>
        <a href="${withParams('video.html')}" class="${page === 'video' ? 'on' : ''}">Video</a>
        <a href="${withParams('jadwal.html')}" class="${page === 'jadwal' ? 'on' : ''}">Jadwal Call</a></nav>
      <div class="db-right"><button data-hide title="Sembunyikan bar (tekan B)">✕</button></div></div>`;
    document.body.prepend(bar);
    document.body.classList.add('has-demobar');
    const toggle = () => { const h = document.body.classList.toggle('demobar-hidden'); $('[data-hide]', bar).textContent = h ? '▾ Showcase' : '✕'; };
    $('[data-hide]', bar).onclick = toggle;
    document.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'b' && !/input/i.test(e.target.tagName)) toggle(); });
  }

  /* ---------- shared bits ---------- */
  const navHTML = (cta = true) => `<header class="nav"><div class="container">
      <a class="logo" href="${page === 'lp' ? '#' : `lp-${src}.html`}"><img src="assets/logo.svg" alt="Aktaklik"></a>
      ${cta ? '<button class="btn btn-primary btn-sm" data-open>Pelajari Caranya</button>' : `<a class="btn btn-secondary btn-sm" href="lp-${src}.html">← Kembali</a>`}
    </div></header>`;
  const footHTML = `<footer><div class="foot"><div class="cols">
      <div><h4>Aktaklik</h4><ul><li>About Us</li><li>Our Mission</li><li>Career</li></ul></div>
      <div><h4>Solutions</h4><ul><li>Drafting Akta</li><li>Ekstraksi Dokumen</li><li>Template Kantor</li></ul></div>
      <div><h4>Resources</h4><ul><li>Blog</li><li>FAQ</li><li>Partner with us</li></ul></div>
      <div><h4>Contact</h4><ul><li>Email Support</li><li>Social Media</li><li>aktaklik.id</li></ul></div></div>
      <div class="bottom"><img src="assets/logo-white.svg" alt="Aktaklik"><small>© 2026 Aktaklik · powered by Sopan</small></div></div></footer>`;

  /* ---------- LP page ---------- */
  function renderLP() {
    const d = LPS[src];
    document.title = `Aktaklik · ${d.a} ${d.b}`;
    $('#app').innerHTML = `${navHTML()}
    <section class="hero hero2"><div class="container">
      <h1 class="big" data-a>${HERO[src].h.map((l) => `<span>${l}</span>`).join('')}</h1>
      <p class="simple" data-a>${HERO[src].s}</p>
      <div class="cta-wrap" data-a><button class="btn-glow" data-open data-breathe>Pelajari Caranya <span class="arrow">→</span></button>
        <span class="free">Gratis · cuma 1 menit</span></div>
      <div class="next" data-a><span class="next-label">Setelah klik tombol di atas:</span>
        <ol><li><b>1</b><span>Isi data singkat<small>1 menit</small></span></li><li class="ar">→</li><li><b>2</b><span>Tonton video cara kerja<small>langsung diputar</small></span></li><li class="ar">→</li><li><b>3</b><span>Konsultasi gratis<small>kalau mau</small></span></li></ol></div>
      <div class="visual visual2" data-visual><img src="assets/hero-${src}.png" alt="" onerror="this.parentNode.classList.add('missing')"><div class="ph">Taruh gambar di assets/hero-${src}.png</div></div>
    </div></section>
    <section class="block bg-soft"><div class="container">
      <div class="head" data-reveal><span class="eyebrow-plain">${d.cE}</span><h2>${d.cA} <b>${d.cB}</b></h2><p>${d.cSub}</p></div>
      <div class="grid3">${d.cards.map(([i, t, p]) => `<div class="card" data-card><div class="ic">${svg(i)}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div>
    </div></section>
    <section class="block" style="padding-bottom:64px"><div class="container">
      <div class="head" data-reveal><span class="eyebrow-plain">CARA KERJA</span><h2>Cukup <b>3 Langkah</b></h2></div>
      <div class="grid3">${d.steps.map(([t, p], k) => `<div class="card step" data-card><div class="num">${k + 1}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div>
    </div></section>
    <section class="block" style="padding-top:48px"><div class="container"><div class="cta-band" data-band>
      <h2>Lihat Sendiri <b>Cara Kerjanya</b></h2>
      <p>Isi form singkat, lalu tonton video cara kerjanya atau konsultasi gratis 15 menit dengan tim Aktaklik.</p>
      <button class="btn-glow white" data-open data-breathe>Pelajari Caranya <span class="arrow">→</span></button><span class="free light">Langkah berikutnya: isi data 1 menit, lalu tonton video.</span></div></div></section>
    ${footHTML}`;
    buildModal();
    animateLP();
  }

  function breathe() {
    $$('[data-breathe]').forEach((b) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.2 });
      tl.to(b, { scale: 1.045, boxShadow: '0 0 0 10px rgba(58,162,56,.18), 0 0 60px 14px rgba(58,162,56,.55), 0 14px 30px rgba(58,162,56,.35)', duration: 1.1, ease: 'sine.inOut' });
      b.addEventListener('mouseenter', () => tl.pause()); b.addEventListener('mouseleave', () => tl.resume());
    });
  }
  function animateLP() {
    if (!has) return;
    gsap.from('[data-a]', { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.1 });
    gsap.from('[data-visual]', { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.45 });
    breathe();
    gsap.to('[data-visual] img', { y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('[data-visual]', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    $$('[data-reveal]').forEach((el) => gsap.from(el.children, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 82%' } }));
    ScrollTrigger.batch('[data-card]', { start: 'top 88%', onEnter: (els) => gsap.from(els, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }) });
    $$('.step .num').forEach((n) => gsap.from(n, { scale: 0, duration: 0.6, ease: 'back.out(2.2)', scrollTrigger: { trigger: n, start: 'top 88%' } }));
    gsap.from('[data-band]', { scale: 0.94, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-band]', start: 'top 85%' } });
    gsap.from('.foot', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.foot', start: 'top 95%' } });
  }

  /* ---------- modal (2 steps) ---------- */
  const Q = [
    { k: 'volume', label: 'Volume akta per bulan', opts: ['0-20', '20-50', '50-100', '100+'], single: true },
    { k: 'akta', label: 'Akta yang paling sering dibuat', hint: 'boleh lebih dari satu', opts: ['Pendirian/perubahan PT', 'CV', 'Yayasan', 'Fidusia', 'AJB', 'PPJB', 'APHT', 'SKMHT', 'RUPS', 'Lainnya'] },
    { k: 'kendala', label: 'Kendala paling sering saat drafting', hint: 'boleh lebih dari satu', opts: ['Salah input data klien', 'Waktu habis untuk input manual', 'Lupa dokumen pendukung', 'Lupa daftar dokumen dari klien', 'Due diligence / PMPJ', 'Lainnya'] },
    { k: 'minat', label: 'Ingin meningkatkan efisiensi kantor?', opts: ['Iya', 'Biasa saja, hanya penasaran', 'Tidak, ingin tingkatkan due diligence', 'Tidak tertarik'], single: true }
  ];
  let modal, overlay, step = 1;
  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `<div class="modal" role="dialog" aria-modal="true"></div>`;
    document.body.appendChild(overlay);
    modal = $('.modal', overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });
    $$('[data-open]').forEach((b) => b.addEventListener('click', openModal));
  }
  function chips(name, opts, single) {
    return `<div class="chipset" data-name="${name}" data-single="${single ? 1 : 0}">${opts.map((o) => `<button type="button" class="chip">${o}</button>`).join('')}</div>`;
  }
  function wireChips(root) {
    $$('.chipset', root).forEach((set) => set.addEventListener('click', (e) => {
      const c = e.target.closest('.chip'); if (!c) return;
      if (set.dataset.single === '1') $$('.chip', set).forEach((x) => x !== c && x.classList.remove('on'));
      c.classList.toggle('on');
      const holder = set.closest('.q, .field'); if (holder) holder.classList.remove('err');
      if (has) gsap.fromTo(c, { scale: 0.94 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' });
    }));
  }
  const progress = (n) => `<div class="m-top"><ol class="stepper">${['Data Anda', '4 Pertanyaan', 'Tonton Video'].map((t, i) => `<li class="${i + 1 < n ? 'done' : i + 1 === n ? 'now' : ''}"><b>${i + 1 < n ? '✓' : i + 1}</b><span>${t}</span></li>`).join('<i></i>')}</ol><button class="close" data-close aria-label="Tutup">✕</button></div>`;
  function step1() {
    modal.classList.remove('wide');
    modal.innerHTML = `${progress(1)}<div class="m-body"><span class="m-step">LANGKAH 1 DARI 2</span><h3>Isi data Anda dulu</h3><p class="sub">Kurang dari 1 menit. <b>Setelah ini:</b> 4 pertanyaan singkat, lalu video cara kerja langsung diputar.</p>
      <form novalidate>
      <div class="field" data-f="nama"><label>Nama lengkap</label><div class="input"><input name="nama" placeholder="Contoh: Budi Santoso" autocomplete="off"></div><div class="msg">Nama wajib diisi.</div></div>
      <div class="field" data-f="wa"><label>Nomor WhatsApp</label><div class="input"><span class="pre">+62</span><input name="wa" inputmode="numeric" placeholder="812 3456 7890" autocomplete="off"></div><div class="msg">Masukkan nomor WhatsApp yang valid.</div></div>
      <div class="field" data-f="email"><label>Email</label><div class="input"><input name="email" type="email" placeholder="nama@kantor.com" autocomplete="off"></div><div class="msg">Masukkan email yang valid.</div></div>
      <div class="field" data-f="praktik"><label>Anda berpraktik sebagai</label>${chips('praktik', ['Notaris', 'PPAT', 'Notaris & PPAT', 'Lainnya'], true)}<div class="msg">Pilih salah satu.</div></div>
      <div class="field" data-f="kota"><label>Kota</label><div class="input"><input name="kota" placeholder="Contoh: Bandung" autocomplete="off"></div><div class="msg">Kota wajib diisi.</div></div>
      <div class="m-foot"><button class="btn-glow btn-block" type="submit">Lanjut ke Langkah 2 <span class="arrow">→</span></button>
      <p class="secure">Data Anda aman dan tidak diperjualbelikan.</p></div></form></div>`;
    wireChips(modal);
    $('[data-close]', modal).onclick = closeModal;
    $$('input', modal).forEach((i) => i.addEventListener('input', () => i.closest('.field').classList.remove('err')));
    $('form', modal).onsubmit = (e) => {
      e.preventDefault();
      const f = e.target; let ok = true;
      const bad = (k) => { $(`[data-f="${k}"]`, modal).classList.add('err'); ok = false; };
      if (!f.nama.value.trim()) bad('nama');
      if (f.wa.value.replace(/\D/g, '').length < 9) bad('wa');
      if (!/^\S+@\S+\.\S+$/.test(f.email.value.trim())) bad('email');
      if (!$('[data-name="praktik"] .on', modal)) bad('praktik');
      if (!f.kota.value.trim()) bad('kota');
      if (!ok) { if (has) gsap.fromTo(modal, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' }); return; }
      state.nama = f.nama.value.trim();
      goStep(2);
    };
    if (has) { gsap.from($$('.m-body > *, form > *', modal), { y: 14, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.04, delay: 0.1, clearProps: 'transform' }); breathe(); }
  }
  function step2() {
    modal.classList.add('wide');
    modal.innerHTML = `${progress(2)}<div class="m-body"><span class="m-step">LANGKAH 2 DARI 2 · TERAKHIR</span><h3>Terima kasih${state.nama ? ', ' + state.nama.split(' ')[0] : ''}! Tinggal 4 pertanyaan</h3>
      <p class="sub">Klik jawaban yang paling cocok. <b>Setelah ini:</b> video cara kerja langsung diputar.</p>
      ${Q.map((q, i) => `<div class="q" data-q="${q.k}"><span class="q-label"><em>${i + 1}.</em>${q.label}${q.hint ? `<small>(${q.hint})</small>` : ''}</span>${chips(q.k, q.opts, q.single)}</div>`).join('')}
      <div class="m-foot"><button class="btn-glow btn-block" data-next>Tonton Video Sekarang <span class="arrow">▶</span></button><p class="secure">Video langsung diputar setelah klik. Gratis.</p></div></div>`;
    wireChips(modal);
    $('[data-close]', modal).onclick = closeModal;
    $('[data-next]', modal).onclick = () => {
      let ok = true;
      Q.forEach((q) => { if (!$(`[data-name="${q.k}"] .on`, modal)) { $(`[data-q="${q.k}"]`, modal).classList.add('err'); ok = false; } });
      if (!ok) { if (has) gsap.fromTo(modal, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' }); return; }
      const btn = $('[data-next]', modal); btn.innerHTML = 'Memutar video…';
      const go = () => { location.href = `video.html?${new URLSearchParams({ src, nama: state.nama || '' })}`; };
      if (has) gsap.to(overlay, { opacity: 0, duration: 0.45, delay: 0.25, ease: 'power2.in', onComplete: go }); else go();
    };
    if (has) gsap.from($$('.m-body > *', modal), { y: 14, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05, delay: 0.1, clearProps: 'transform' });
  }
  const state = { nama: '' };
  function goStep(n) {
    step = n;
    if (!has) { n === 1 ? step1() : step2(); return; }
    gsap.to(modal, { opacity: 0, x: -30, duration: 0.25, ease: 'power2.in', onComplete: () => {
      n === 1 ? step1() : step2();
      gsap.fromTo(modal, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
      gsap.from($$('.stepper li.done b', modal), { scale: 0.4, duration: 0.5, ease: 'back.out(3)' }); breathe();
    } });
  }
  function openModal() {
    step = 1; step1();
    overlay.classList.add('open'); document.body.style.overflow = 'hidden';
    if (has) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(modal, { y: 40, scale: 0.96, opacity: 0, x: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' });
    }
  }
  function closeModal() {
    const done = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
    if (!has) return done();
    gsap.to(modal, { y: 30, opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: done });
  }

  /* ---------- video page ---------- */
  function renderVideo() {
    let cur = START_PART[src] ?? 0;
    $('#app').innerHTML = `${navHTML(false)}
    <main class="page-body"><div class="container">
      <div class="vid-head" data-a><span class="eyebrow-plain" data-ptag></span><h1>${nama ? `Halo, ${nama.split(' ')[0]}! ` : ''}<b data-ptitle></b></h1></div>
      <div class="vid-main">
        <div data-a><div class="player"><video data-main controls playsinline preload="metadata"></video></div>
          <div class="nextstep"><span class="ns-label"><b>→</b> LANGKAH BERIKUTNYA · GRATIS</span>
            <a class="btn-glow btn-block" data-breathe href="${withParams('jadwal.html')}">Jadwalkan Konsultasi 15 Menit <span class="arrow">→</span></a>
            <a class="ns-alt" target="_blank" href="${waLink('Halo tim Aktaklik, saya ingin tahu lebih lanjut tentang Aktaklik.')}">atau chat tim via WhatsApp</a></div>
          <p class="vid-desc" data-pdesc></p></div>
        <aside class="panel" data-panel><span class="badge">LANGKAH BERIKUTNYA · GRATIS</span><h3>Mau lihat langsung untuk kantor Anda?</h3>
          <p>Call singkat 15 menit dengan tim Aktaklik. Demo sesuai jenis akta Anda, tanpa komitmen.</p>
          <a class="btn-glow btn-block" data-breathe href="${withParams('jadwal.html')}">Konsultasi Gratis 15 Menit <span class="arrow">→</span></a>
          <a class="btn btn-secondary btn-block" target="_blank" href="${waLink('Halo tim Aktaklik, saya ingin tahu lebih lanjut tentang Aktaklik.')}">Hubungi Tim Kami</a>
          <hr><a class="link" href="https://aktaklik.id" target="_blank">Sudah yakin? Pakai Aktaklik sekarang →</a></aside>
      </div>
      <div class="more-h" data-reveal><h2>Semua video cara kerja</h2><button class="btn btn-secondary btn-sm" data-nextpart>Putar berikutnya <span class="arrow">→</span></button></div>
      <div class="thumbs">${PARTS.map((p, i) => `<button class="thumb" data-part="${i}" data-card><div class="tv"><video src="videos/part-${i + 1}.mp4#t=${[14, 6, 20, 10][i]}" preload="metadata" muted playsinline></video><span class="play"></span></div><small>PART ${i + 1}</small><strong>${p.t}</strong></button>`).join('')}</div>
    </div></main>${footHTML}<div class="toast" data-toast></div>`;
    const v = $('[data-main]');
    const set = (i, play) => {
      cur = (i + PARTS.length) % PARTS.length;
      v.src = `videos/part-${cur + 1}.mp4#t=0.6`;
      $('[data-ptag]').textContent = `VIDEO ${cur + 1} DARI ${PARTS.length} · CARA KERJA AKTAKLIK`;
      $('[data-ptitle]').textContent = PARTS[cur].t;
      $('[data-pdesc]').textContent = PARTS[cur].d;
      $$('.thumb').forEach((t) => t.classList.toggle('active', +t.dataset.part === cur));
      if (play) v.play().catch(() => {});
      if (has) gsap.fromTo(['[data-ptitle]', '[data-pdesc]'], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 });
    };
    set(cur, false);
    $$('.thumb').forEach((t) => t.onclick = () => { set(+t.dataset.part, true); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('[data-nextpart]').onclick = () => { set(cur + 1, true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    v.addEventListener('ended', () => {
      if (cur >= PARTS.length - 1) return;
      const t = $('[data-toast]'); t.textContent = `Selanjutnya: Part ${cur + 2} · ${PARTS[cur + 1].t}`; t.classList.add('show');
      setTimeout(() => { t.classList.remove('show'); set(cur + 1, true); }, 2200);
    });
    if (has) {
      gsap.from('[data-a]', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 });
      gsap.from('[data-panel] > *', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.3, clearProps: 'transform', onComplete: breathe });
      if (window.innerWidth <= 1100) breathe();
      $$('[data-reveal]').forEach((el) => gsap.from(el, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
      ScrollTrigger.batch('[data-card]', { start: 'top 92%', onEnter: (els) => gsap.from(els, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }) });
    }
  }

  /* ---------- booking page ---------- */
  function renderJadwal() {
    const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const SLOTS = ['10.00', '10.30', '11.00', '11.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30', '17.00'];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let view = new Date(today.getFullYear(), today.getMonth(), 1), selDate = null, selTime = null;
    $('#app').innerHTML = `${navHTML(false)}
    <main class="page-body"><div class="container" data-wrap>
      <div class="head" data-a style="margin-bottom:40px"><span class="eyebrow-plain">KONSULTASI GRATIS</span><h2>Call Singkat <b style="color:var(--primary)">15 Menit</b></h2>
        <p>Pilih tanggal dan jam yang paling pas. Tim Aktaklik akan menghubungi ${nama ? nama.split(' ')[0] : 'Anda'} di waktu yang dipilih.</p></div>
      <div class="book" data-a>
        <div class="info"><h3>Konsultasi Aktaklik</h3><ul style="display:flex;flex-direction:column;gap:12px"><li>15 menit</li><li>Gratis, tanpa komitmen</li><li>Jam 10.00 - 17.30 WIB</li></ul>
          <p>Yang akan dibahas: alur drafting di kantor Anda, demo singkat sesuai jenis akta, dan tanya jawab.</p></div>
        <div class="cal"><div class="cal-h"><button data-prev aria-label="Bulan sebelumnya">‹</button><strong data-month></strong><button data-nextm aria-label="Bulan berikutnya">›</button></div><div class="days" data-days></div></div>
        <div class="times"><h4 data-dlabel>Pilih tanggal dulu</h4><div class="slots" data-slots></div></div>
      </div>
      <div class="confirm" data-a><button class="btn btn-primary btn-block" data-confirm disabled>Konfirmasi Jadwal <span class="arrow">→</span></button><small data-summary>Belum ada jadwal dipilih</small></div>
    </div></main>`;
    const fmt = (d) => `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
    const summary = () => {
      $('[data-summary]').textContent = selDate ? `${fmt(selDate)}${selTime ? ` · ${selTime} WIB · 15 menit` : ' · pilih jam'}` : 'Belum ada jadwal dipilih';
      $('[data-confirm]').disabled = !(selDate && selTime);
    };
    function drawSlots() {
      const box = $('[data-slots]');
      if (!selDate) { box.innerHTML = '<p class="empty">Jam tersedia akan muncul di sini.</p>'; return; }
      $('[data-dlabel]').textContent = `${HARI[selDate.getDay()]}, ${selDate.getDate()} ${BULAN[selDate.getMonth()]}`;
      box.innerHTML = SLOTS.map((s) => `<button class="slot ${s === selTime ? 'sel' : ''}">${s}</button>`).join('');
      $$('.slot', box).forEach((b) => b.onclick = () => { selTime = b.textContent; $$('.slot', box).forEach((x) => x.classList.toggle('sel', x === b)); summary(); has && gsap.fromTo(b, { scale: 0.9 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' }); });
      if (has) gsap.from($$('.slot', box), { y: 10, opacity: 0, duration: 0.35, stagger: 0.025, ease: 'power2.out' });
    }
    function drawCal() {
      $('[data-month]').textContent = `${BULAN[view.getMonth()]} ${view.getFullYear()}`;
      const first = (view.getDay() + 6) % 7; const n = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
      let h = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((x) => `<div class="dn">${x}</div>`).join('');
      for (let i = 0; i < first; i++) h += '<div></div>';
      for (let d = 1; d <= n; d++) {
        const dt = new Date(view.getFullYear(), view.getMonth(), d); const wk = dt.getDay();
        const off = dt <= today || wk === 0 || wk === 6;
        const sel = selDate && dt.getTime() === selDate.getTime();
        h += `<div><button class="day ${off ? 'off' : 'av'} ${sel ? 'sel' : ''}" ${off ? 'disabled' : ''} data-d="${d}">${d}</button></div>`;
      }
      $('[data-days]').innerHTML = h;
      $$('.day.av').forEach((b) => b.onclick = () => { selDate = new Date(view.getFullYear(), view.getMonth(), +b.dataset.d); selTime = null; drawCal(); drawSlots(); summary(); });
      $('[data-prev]').disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
      if (has) gsap.from($$('.day', $('[data-days]')), { scale: 0.6, opacity: 0, duration: 0.35, stagger: 0.008, ease: 'back.out(2)' });
    }
    $('[data-prev]').onclick = () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); drawCal(); };
    $('[data-nextm]').onclick = () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); drawCal(); };
    drawCal(); drawSlots(); summary();
    $('[data-confirm]').onclick = () => {
      const s = `${fmt(selDate)} · ${selTime} WIB`;
      const show = () => {
        $('[data-wrap]').innerHTML = `<div class="success" data-ok><div class="ok">${svg('check')}</div><h2>Jadwal <b>Terkonfirmasi</b></h2>
          <p>Terima kasih${nama ? ', ' + nama.split(' ')[0] : ''}! Tim Aktaklik akan menghubungi Anda di waktu ini:</p><div class="sum">${s}</div>
          <div class="acts"><a class="btn btn-secondary" href="${withParams('video.html')}">Kembali ke video</a><a class="btn btn-primary" href="https://aktaklik.id" target="_blank">Kunjungi aktaklik.id</a></div></div>`;
        if (has) { gsap.from('[data-ok] > *', { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }); gsap.from('[data-ok] .ok', { scale: 0.3, duration: 0.7, ease: 'back.out(2.5)' }); }
      };
      if (has) gsap.to('[data-wrap] > *', { y: -20, opacity: 0, duration: 0.35, stagger: 0.05, ease: 'power2.in', onComplete: show }); else show();
    };
    if (has) gsap.from('[data-a]', { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
  }

  /* ---------- hub ---------- */
  function renderHub() {
    const ADS = [
      { n: 1, tag: 'LP 1 · KECEPATAN', h: 'Draft Akta Selesai dalam 3 Menit', likes: '1.284', cap: 'Notaris yang lagi cari cara mempercepat drafting akta dan mengurangi error saat input data klien? Aktaklik punya solusinya. Waktu drafting lebih singkat, Anda bisa fokus ke klien.' },
      { n: 2, tag: 'LP 2 · TANPA INPUT MANUAL', h: 'Banyak Dokumen Klien? Tak Perlu Input Manual', likes: '967', cap: 'Lagi buat Akta RUPS? KTP, akta perubahan sebelumnya, dan keputusan RUPS dibaca otomatis. Gak perlu lagi input manual, Aktaklik punya solusinya.' },
      { n: 3, tag: 'LP 3 · DUE DILIGENCE', h: 'Efisiensi Penting, Due Diligence Wajib', likes: '1.052', cap: 'Efisiensi penting, tapi due diligence wajib. Cek KTP, PMPJ, dan dokumen pendukung dalam satu alur. Aktaklik bantu efisiensi dan due diligence kantor Anda.' }
    ];
    const I = {
      heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
      chat: '<path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1.1-4A8 8 0 1 1 20 12z"/>',
      send: '<path d="M21 3 3 10l7 3 3 7z"/><path d="m10 13 4-4"/>',
      save: '<path d="M6 3h12v18l-6-5-6 5z"/>',
      home: '<path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      reels: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="m10 9 5 3-5 3z"/>', plus: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/>'
    };
    const ic = (k) => `<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;
    $('#app').innerHTML = `<div class="hub2"><div class="container">
      <div class="top" data-a><img src="assets/logo-white.svg" alt="Aktaklik"><span>FUNNEL SHOWCASE · NOV 2026</span></div>
      <div class="title" data-a><h1>3 Iklan, 3 Funnel, <b>1 Tujuan</b></h1>
        <p>Tiap iklan menyasar kebutuhan notaris yang berbeda. Klik iklannya untuk masuk ke landing page masing-masing.</p></div>
      <div class="phones">${ADS.map((a) => `<div class="ad"><div class="phone-wrap" data-phone><div class="phone"><div class="screen">
          <div class="island"></div>
          <div class="sbar"><span>9:41</span><span class="ic"><svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#111"/><rect x="5" y="5" width="3" height="6" rx="1" fill="#111"/><rect x="10" y="2.5" width="3" height="8.5" rx="1" fill="#111"/><rect x="15" y="0" width="3" height="11" rx="1" fill="#111"/></svg><svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="#111" opacity=".4"/><rect x="2" y="2" width="16" height="8" rx="1.8" fill="#111"/><rect x="22.5" y="4" width="1.8" height="4" rx="1" fill="#111" opacity=".4"/></svg></span></div>
          <div class="igtop"><strong>Beranda</strong><span class="r">${ic('heart')}${ic('send')}</span></div>
          <div class="phead"><span class="ava"><span><img src="assets/icon.svg" alt=""></span></span><span class="nm"><b>aktaklik</b><small>Bersponsor</small></span><span class="dots">···</span></div>
          <a href="lp-${a.n}.html"><img class="pimg" src="assets/creative-${a.n}.png" alt="Iklan ${a.h}"></a>
          <a class="ctabar" href="lp-${a.n}.html"><span>Pelajari Selengkapnya</span><span>›</span></a>
          <div class="acts"><span class="heart-btn">${ic('heart')}</span>${ic('chat')}${ic('send')}<span class="sp"></span>${ic('save')}</div>
          <div class="likes">${a.likes} suka</div>
          <div class="cap"><b>aktaklik</b>${a.cap.slice(0, 92)}… <span>selengkapnya</span></div>
          <div class="ignav">${ic('home')}${ic('search')}${ic('plus')}${ic('reels')}<i></i></div>
        </div></div></div>
        <div class="meta"><span class="tag">${a.tag}</span><h3>${a.h}</h3><a class="open" href="lp-${a.n}.html">Buka Landing Page <span>→</span></a></div></div>`).join('')}</div>
      <div class="flow" data-flow><div>Iklan Instagram</div><i>→</i><div>Landing page</div><i>→</i><div>Popup 1 · Kontak</div><i>→</i><div>Popup 2 · 4 pertanyaan</div><i>→</i><div>Video cara kerja</div><i>→</i><div>Konsultasi 15 menit / WhatsApp</div></div>
      <p class="foot-note">Tekan B untuk menyembunyikan bar showcase.</p>
    </div></div>`;
    $$('.heart-btn').forEach((h) => h.onclick = () => { const s = $('svg', h); s.classList.toggle('on'); s.classList.add('heart'); if (has) gsap.fromTo(s, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(4)' }); });
    if (!has) return;
    gsap.from('[data-a]', { y: 30, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
    gsap.from('[data-phone]', { y: 140, opacity: 0, rotationX: 18, duration: 1.3, stagger: 0.15, ease: 'power4.out', delay: 0.25 });
    gsap.from('.ad .meta', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.8 });
    $$('[data-phone]').forEach((p, i) => {
      gsap.to(p.querySelector('.phone'), { y: -12, duration: 2.6 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 + i * 0.4 });
      const rx = gsap.quickTo(p, 'rotationX', { duration: 0.6, ease: 'power3' }), ry = gsap.quickTo(p, 'rotationY', { duration: 0.6, ease: 'power3' });
      p.addEventListener('mousemove', (e) => { const r = p.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 14); rx(-((e.clientY - r.top) / r.height - 0.5) * 10); });
      p.addEventListener('mouseleave', () => { rx(0); ry(0); });
    });
    gsap.from('[data-flow] > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out', scrollTrigger: { trigger: '[data-flow]', start: 'top 92%' } });
  }

  demoBar();
  if (page === 'lp') renderLP();
  else if (page === 'video') renderVideo();
  else if (page === 'jadwal') renderJadwal();
  else renderHub();
})();
