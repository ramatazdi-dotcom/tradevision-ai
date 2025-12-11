import React, { useState, useRef } from 'react';
import { 
  Upload, Camera, TrendingUp, TrendingDown, Minus, AlertTriangle, 
  X, Loader2, Key, Layers, CheckSquare, Square, Info, 
  ArrowRight, BarChart3, ShieldCheck, Zap, ChevronLeft, Target, Ban, LogIn, Users, BookOpen, HelpCircle
} from 'lucide-react';

// ==========================================
// BAGIAN 1: PANDUAN PENGGUNA (Halaman Baru)
// ==========================================
const UserGuide = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Menu
        </button>
        
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          {/* Header Panduan */}
          <div className="bg-slate-900/50 p-8 border-b border-slate-700">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="text-blue-400" size={32} />
              Panduan Pengguna TradeVision AI
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Cara menggunakan asisten trading AI untuk teknikal dan bandarmology.</p>
          </div>

          <div className="p-8 space-y-10">
            {/* Step 1 */}
            <section className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg border border-blue-500/50">1</div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Persiapan Awal</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
                  <li>Klik tombol <span className="bg-slate-700 px-2 py-0.5 rounded text-white text-xs">Set API Key</span> di pojok kanan atas aplikasi.</li>
                  <li>Masukkan <strong>Google Gemini API Key</strong> Anda (Dapatkan gratis di Google AI Studio).</li>
                  <li>Jika belum punya API Key, Anda bisa mencentang kotak <strong>"Mode Demo"</strong> untuk mencoba simulasi.</li>
                </ul>
              </div>
            </section>

            {/* Step 2 */}
            <section className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg border border-purple-500/50">2</div>
              <div className="space-y-4 w-full">
                <h2 className="text-xl font-bold text-white">Pilih Mode Analisa</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-bold text-white flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-blue-400"/> Mode Teknikal (Global)</h3>
                    <p className="text-sm text-slate-400">Cocok untuk Crypto, Forex, atau Saham US. Biarkan toggle "Analisa Saham Indonesia" mati. Hanya perlu upload Chart.</p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                    <h3 className="font-bold text-white flex items-center gap-2 mb-2"><Users size={16} className="text-emerald-400"/> Mode Bandarmology (IDX)</h3>
                    <p className="text-sm text-slate-400">Khusus saham Indonesia. Aktifkan toggle hingga hijau. Anda perlu upload <strong>Chart</strong> DAN <strong>Broker Summary</strong>.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/50">3</div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Upload & Analisa</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-300 leading-relaxed">
                  <li>Pastikan screenshot chart terlihat jelas (Candle & Harga).</li>
                  <li>Pilih indikator tambahan seperti <strong>SMC</strong> atau <strong>EMA</strong> di panel preferensi.</li>
                  <li>Klik tombol besar <strong>Mulai Analisa</strong> dan tunggu hasil AI dalam hitungan detik.</li>
                </ul>
              </div>
            </section>

            {/* Step 4 */}
            <section className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg border border-orange-500/50">4</div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Membaca Hasil (Trading Plan)</h2>
                <p className="text-slate-300">AI akan memberikan rencana trading lengkap:</p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-blue-900/20 border border-blue-500/30 p-2 rounded text-center">
                    <div className="text-xs text-blue-300 font-bold mb-1">ENTRY</div>
                    <div className="text-[10px] text-slate-400">Area Masuk</div>
                  </div>
                  <div className="bg-rose-900/20 border border-rose-500/30 p-2 rounded text-center">
                    <div className="text-xs text-rose-300 font-bold mb-1">STOP LOSS</div>
                    <div className="text-[10px] text-slate-400">Batas Rugi</div>
                  </div>
                  <div className="bg-emerald-900/20 border border-emerald-500/30 p-2 rounded text-center">
                    <div className="text-xs text-emerald-300 font-bold mb-1">TAKE PROFIT</div>
                    <div className="text-[10px] text-slate-400">Target Cuan</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <div className="bg-slate-900/30 p-6 border-t border-slate-700 text-center">
            <button onClick={onBack} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
              Saya Mengerti, Mulai Trading Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// BAGIAN 2: LANDING PAGE (Updated)
// ==========================================
const LandingPage = ({ onStart, onGuide }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 12 L16 8 M16 8 L16 11 M16 8 L12 8" stroke="#22d3ee" strokeWidth="2.5" />
          </svg>
          <span className="text-xl font-bold tracking-tight">TradeVision AI</span>
        </div>
        <div className="flex gap-3">
          <button onClick={onGuide} className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
            <HelpCircle size={16} /> Panduan
          </button>
          <button onClick={onStart} className="text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 px-4 py-2 rounded-full">
            Masuk Aplikasi
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Fitur Baru: Analisa Bandarmology (Broker Summary)
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Teknikal + Bandarmology <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Dalam Satu Analisa</span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload Chart TradingView dan Broker Summary saham Indonesia Anda. 
          AI akan menggabungkan Price Action dengan pergerakan Bandar untuk akurasi maksimal.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onStart} className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2">
            Mulai Analisa Sekarang
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={onGuide} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl border border-slate-700 transition-all flex items-center gap-2">
            <BookOpen size={18} /> Baca Panduan
          </button>
        </div>
      </div>

      <footer className="py-8 text-center text-slate-600 text-xs border-t border-slate-800 mt-10">
        <p>&copy; 2025 TradeVision AI. Powered by Rama Tazdi.</p>
      </footer>
    </div>
  );
};

// ==========================================
// BAGIAN 3: APP UTAMA (Chart Analyzer Logic)
// ==========================================
const ChartAnalyzer = ({ onBack }) => {
  const [chartImage, setChartImage] = useState(null);
  const [chartPreview, setChartPreview] = useState(null);
  const [brokerImage, setBrokerImage] = useState(null);
  const [brokerPreview, setBrokerPreview] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [error, setError] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const [useBandarmology, setUseBandarmology] = useState(false);
  
  const [preferences, setPreferences] = useState({
    smc: false,
    ema: false,
    engulfing: false
  });

  const chartInputRef = useRef(null);
  const brokerInputRef = useRef(null);

  const togglePreference = (key) => setPreferences(prev => ({ ...prev, [key]: !prev[key] }));

  const handleChartUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChartImage(reader.result.split(',')[1]);
        setChartPreview(reader.result);
        setResult(null); setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrokerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrokerImage(reader.result.split(',')[1]);
        setBrokerPreview(reader.result);
        setResult(null); setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchWithRetry = async (url, options, retries = 3, backoff = 2000) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (retries > 0 && (response.status === 503 || response.status === 429)) {
           await new Promise(resolve => setTimeout(resolve, backoff));
           return fetchWithRetry(url, options, retries - 1, backoff * 1.5);
        }
        throw new Error(errData.error?.message || `HTTP Error ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      if (retries > 0) {
         await new Promise(resolve => setTimeout(resolve, backoff));
         return fetchWithRetry(url, options, retries - 1, backoff * 1.5); 
      }
      throw err;
    }
  };

  const simulateAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      const randomDecision = Math.random();
      const mockData = {
        decision: randomDecision > 0.5 ? "BUY" : "WAIT",
        confidence: 85,
        reasoning: "Chart menunjukkan pola Higher High. Bandarmology mengonfirmasi adanya AKUMULASI besar oleh broker YP dan PD di area support. Divergensi positif pada RSI.",
        support: "410", resistance: "460", trend: "Uptrend",
        entry: "412-416", stop_loss: "395", take_profit: "450-460",
        bandar_status: "Big Accumulation",
        top_buyer: "YP, PD", top_seller: "CC, NI"
      };
      setResult(mockData);
      setLoading(false);
    }, 2000);
  };

  const analyzeChart = async () => {
    if (!chartImage) {
      setError("Wajib upload gambar Chart TradingView.");
      return;
    }
    if (useBandarmology && !brokerImage) {
      setError("Anda mengaktifkan Mode Bandarmology, silakan upload gambar Broker Summary juga.");
      return;
    }
    if (isDemoMode || !apiKey) {
      if (!isDemoMode && !apiKey) { setError("Masukkan API Key atau gunakan Mode Demo."); return; }
      simulateAnalysis(); return;
    }

    setLoading(true); setError(''); setResult(null);

    try {
      let systemPrompt = `
        Bertindaklah sebagai Analis Saham Profesional (Technical & Bandarmology Expert).
        Tugas: Analisis gambar yang diberikan untuk membuat Trading Plan presisi.
        
        GAMBAR 1: Chart Trading (Candlestick).
        ${useBandarmology ? "GAMBAR 2: Tabel Broker Summary (Broxsum)." : ""}

        Instruksi Khusus:
        1. Analisa Tren & Support/Resistance dari Chart.
        ${preferences.smc ? "- Gunakan konsep Smart Money Concept (SMC)." : ""}
        ${preferences.ema ? "- Perhatikan posisi harga vs EMA." : ""}
        ${preferences.engulfing ? "- Cari pola Engulfing." : ""}
        
        ${useBandarmology ? `
        2. ANALISA BANDARMOLOGY (PENTING):
           - Baca data Top Buyer & Top Seller dari gambar Broker Summary.
           - Tentukan apakah sedang terjadi AKUMULASI (Big Player Beli) atau DISTRIBUSI (Big Player Jual).
           - Gabungkan sinyal ini dengan teknikal. Contoh: Jika Chart Support + Akumulasi = Strong BUY. Jika Chart Resistance + Distribusi = Strong SELL.
        ` : ""}

        Output JSON Only (Strict JSON format, no markdown):
        {
          "decision": "BUY/SELL/WAIT",
          "confidence": number,
          "reasoning": "Penjelasan gabungan teknikal & bandarmology (jika ada)...",
          "support": "string (angka)",
          "resistance": "string (angka)",
          "trend": "string",
          "entry": "string (angka)",
          "stop_loss": "string (angka)",
          "take_profit": "string (angka)",
          "bandar_status": "Accumulation/Distribution/Neutral (Jika mode bandarmology aktif, jika tidak isi '-')",
          "top_buyer": "Kode broker (Jika mode bandarmology aktif)",
          "top_seller": "Kode broker (Jika mode bandarmology aktif)"
        }
      `;

      const contentParts = [
        { text: systemPrompt },
        { inlineData: { mimeType: "image/jpeg", data: chartImage } }
      ];

      if (useBandarmology && brokerImage) {
        contentParts.push({ inlineData: { mimeType: "image/jpeg", data: brokerImage } });
      }

      const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: contentParts }] })
      });

      const cleanJson = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(cleanJson));
    } catch (err) {
      console.error(err);
      let msg = err.message;
      if (msg.includes('Quota exceeded')) msg = "Kuota API Gratis Habis (Limit Harian).";
      else if (msg.includes('overloaded')) msg = "Server AI sedang sibuk. Coba lagi dalam 1 menit.";
      setError(`Gagal: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-10 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg transition-colors mr-2 text-slate-400 hover:text-white flex items-center gap-1 group">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm">Kembali</span>
            </button>
            <span className="text-lg font-bold tracking-tight text-white">Ruang Analisa</span>
          </div>
          <button onClick={() => setShowApiKeyInput(!showApiKeyInput)} className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${apiKey ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
            <Key size={12} /> {apiKey ? 'API Connected' : 'Set API Key'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 flex-grow w-full">
        {showApiKeyInput && (
          <div className="mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="flex gap-2">
              <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste Gemini API Key..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
              <button onClick={() => setShowApiKeyInput(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Simpan</button>
            </div>
            <div className="mt-3 flex items-center gap-2">
               <input type="checkbox" id="demoMode" checked={isDemoMode} onChange={(e) => setIsDemoMode(e.target.checked)} className="rounded bg-slate-900 text-blue-600" />
               <label htmlFor="demoMode" className="text-sm text-slate-300 cursor-pointer">Mode Demo</label>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* KOLOM KIRI: INPUT & SETTINGS */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* TOGGLE BANDARMOLOGY */}
            <div 
              onClick={() => setUseBandarmology(!useBandarmology)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${useBandarmology ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${useBandarmology ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${useBandarmology ? 'text-emerald-300' : 'text-slate-300'}`}>Analisa Saham Indonesia</h3>
                  <p className="text-xs text-slate-500">Aktifkan input Broker Summary</p>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${useBandarmology ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${useBandarmology ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>

            {/* UPLOAD CHART (WAJIB) */}
            <div onClick={() => chartInputRef.current?.click()} className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${chartPreview ? 'border-blue-500/50 bg-slate-800/50' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}`}>
              {chartPreview ? (
                <>
                  <img src={chartPreview} alt="Chart" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-white font-medium bg-slate-900/80 px-3 py-1 rounded-full text-xs border border-slate-600 mb-2">Chart Terupload</p>
                    <Camera size={18} className="text-white"/>
                  </div>
                </>
              ) : (
                <div className="text-center p-4"><div className="bg-slate-800 p-3 rounded-full inline-block mb-2"><TrendingUp className="text-blue-500" size={24} /></div><p className="text-slate-400 text-sm font-medium">Upload Chart Saham</p></div>
              )}
              <input type="file" accept="image/*" ref={chartInputRef} onChange={handleChartUpload} className="hidden" />
            </div>

            {/* UPLOAD BROKER SUMMARY (OPSIONAL/CONDITIONAL) */}
            {useBandarmology && (
              <div onClick={() => brokerInputRef.current?.click()} className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group animate-in fade-in slide-in-from-top-2 ${brokerPreview ? 'border-emerald-500/50 bg-slate-800/50' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}`}>
                {brokerPreview ? (
                  <>
                    <img src={brokerPreview} alt="Broker" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-emerald-400 font-medium bg-slate-900/80 px-3 py-1 rounded-full text-xs border border-emerald-900 mb-2">Broxsum Terupload</p>
                      <Camera size={18} className="text-white"/>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4"><div className="bg-slate-800 p-3 rounded-full inline-block mb-2"><Users className="text-emerald-500" size={24} /></div><p className="text-slate-400 text-sm font-medium">Upload Broker Summary</p></div>
                )}
                <input type="file" accept="image/*" ref={brokerInputRef} onChange={handleBrokerUpload} className="hidden" />
              </div>
            )}

            {/* PREFERENCES */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-slate-300"><Layers size={16} /><h3 className="text-sm font-semibold">Indikator Tambahan</h3></div>
              <div className="grid grid-cols-2 gap-2">
                {[ { id: 'smc', label: 'SMC' }, { id: 'ema', label: 'EMA' }, { id: 'engulfing', label: 'Engulfing' } ].map((opt) => (
                  <button key={opt.id} onClick={() => togglePreference(opt.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all ${preferences[opt.id] ? 'bg-blue-600/20 border-blue-500/50 text-blue-200' : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-600'}`}>
                    {preferences[opt.id] ? <CheckSquare size={14} className="text-blue-400" /> : <Square size={14} />} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={analyzeChart} disabled={loading || !chartImage} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${loading ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed' : chartImage ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 scale-[1.02] hover:scale-[1.03]' : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'}`}>
              {loading ? <><Loader2 className="animate-spin" /> Menganalisis...</> : "Mulai Analisa"}
            </button>
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in"><X size={16} /> {error}</div>}
          </div>

          {/* KOLOM KANAN: HASIL */}
          <div className="lg:col-span-7 bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col min-h-[500px] shadow-xl relative overflow-hidden">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2 flex justify-between items-center"><span>Hasil Analisis</span>{result && <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">AI Generated</span>}</h2>
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4 flex-grow">
                {/* Decision Block */}
                <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div><span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Rekomendasi</span><div className={`text-4xl font-black mt-1 flex items-center gap-3 ${result.decision === 'BUY' ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]' : result.decision === 'SELL' ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'text-slate-200'}`}>{result.decision} {result.decision === 'BUY' ? <TrendingUp size={32}/> : result.decision === 'SELL' ? <TrendingDown size={32}/> : <Minus size={32}/>}</div></div>
                  <div className="text-right"><span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Keyakinan</span><div className="text-2xl font-bold text-white mt-1">{result.confidence}%</div></div>
                </div>
                
                {/* BANDARMOLOGY INFO (Hanya Muncul jika Mode Aktif) */}
                {useBandarmology && result.bandar_status && (
                  <div className="grid grid-cols-2 gap-3 animate-in fade-in">
                    <div className="bg-emerald-900/20 p-3 rounded-xl border border-emerald-500/30">
                      <span className="text-xs text-emerald-400 uppercase font-bold flex items-center gap-1"><Users size={12}/> Bandar Status</span>
                      <div className="text-white font-bold text-sm mt-1">{result.bandar_status}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50">
                      <span className="text-xs text-slate-400 uppercase font-bold">Top Action</span>
                      <div className="text-slate-300 text-xs mt-1">Buy: {result.top_buyer || '-'} <br/> Sell: {result.top_seller || '-'}</div>
                    </div>
                  </div>
                )}

                {/* Trading Plan */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><LogIn size={10}/> Entry</span>
                    <div className="text-blue-300 font-bold text-sm mt-1 break-words">{result.entry || "-"}</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 hover:border-rose-500/50 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><Ban size={10}/> SL</span>
                    <div className="text-rose-400 font-bold text-sm mt-1 break-words">{result.stop_loss || "-"}</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><Target size={10}/> TP</span>
                    <div className="text-emerald-400 font-bold text-sm mt-1 break-words">{result.take_profit || "-"}</div>
                  </div>
                </div>

                {/* Levels & Trend */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><span className="text-xs text-slate-400 uppercase font-bold">Support</span><div className="text-slate-200 font-medium text-sm mt-1">{result.support}</div></div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><span className="text-xs text-slate-400 uppercase font-bold">Resist</span><div className="text-slate-200 font-medium text-sm mt-1">{result.resistance}</div></div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50"><span className="text-xs text-slate-400 uppercase font-bold">Trend</span><div className="text-blue-300 font-medium text-sm mt-1">{result.trend}</div></div>
                </div>

                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-700/30"><span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-2 mb-2"><Info size={12}/> Analisa Lengkap</span><p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{result.reasoning}</p></div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 opacity-50"><div className="w-20 h-20 rounded-full bg-slate-700/50 mb-6 flex items-center justify-center shadow-inner"><TrendingUp size={40} /></div><p className="text-base font-medium">Hasil analisis akan muncul di sini</p><p className="text-sm">Upload chart & broker summary</p></div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-12 py-6 text-center text-slate-500 text-xs border-t border-slate-800 px-4">
        <p>© 2025 TradeVision AI. Powered by Rama Tazdi.</p>
        <div className="mt-3 max-w-2xl mx-auto p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 font-medium">Disclaimer</p>
          <p className="mt-1 text-slate-500 leading-relaxed">Aplikasi ini hanya alat bantu. Keputusan trading dan risiko sepenuhnya ada di tangan Anda.</p>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// BAGIAN 4: MAIN APP (Pengatur Halaman)
// ==========================================
const App = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'app', 'guide'

  return (
    <>
      {currentView === 'landing' && <LandingPage onStart={() => setCurrentView('app')} onGuide={() => setCurrentView('guide')} />}
      {currentView === 'app' && <ChartAnalyzer onBack={() => setCurrentView('landing')} />}
      {currentView === 'guide' && <UserGuide onBack={() => setCurrentView('landing')} />}
    </>
  );
};

export default App;