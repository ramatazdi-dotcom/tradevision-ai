import React, { useState, useRef } from 'react';
import { 
  Upload, Camera, TrendingUp, TrendingDown, Minus, AlertTriangle, 
  X, Loader2, Key, Layers, CheckSquare, Square, Info, 
  ArrowRight, BarChart3, ShieldCheck, Zap, ChevronLeft, Target, Ban, LogIn
} from 'lucide-react';

// ==========================================
// BAGIAN 1: LANDING PAGE (Halaman Depan)
// ==========================================
const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Logo Mata SVG */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 12 L16 8 M16 8 L16 11 M16 8 L12 8" stroke="#22d3ee" strokeWidth="2.5" />
          </svg>
          <span className="text-xl font-bold tracking-tight">TradeVision AI</span>
        </div>
        <button 
          onClick={onStart}
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-4 py-2 rounded-full"
        >
          Masuk Aplikasi
        </button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-medium mb-6 animate-pulse">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Fitur Baru: Smart Retry System (Anti Gagal)
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Analisis Chart Trading <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Dengan Kekuatan AI</span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Dapatkan "Second Opinion" instan untuk setiap setup trading Anda. 
          TradeVision AI menentukan Tren, Entry, Stop Loss, dan Take Profit dalam hitungan detik.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            Mulai Analisa Sekarang
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-slate-800/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/30 transition-colors group">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analisis Kilat</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Upload screenshot chart Anda dan dapatkan analisis teknikal komprehensif dalam waktu kurang dari 5 detik.</p>
            </div>
            
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Trading Plan</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Dapatkan rekomendasi titik Entry, Take Profit, dan Stop Loss yang terukur untuk setiap peluang.</p>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-colors group">
              <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Manajemen Risiko</h3>
              <p className="text-slate-400 text-sm leading-relaxed">AI kami membantu menentukan area support & resistance krusial untuk penempatan SL/TP yang aman.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-slate-600 text-xs border-t border-slate-800 mt-10">
        <p>&copy; 2025 TradeVision AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

// ==========================================
// BAGIAN 2: APP UTAMA (Chart Analyzer Logic)
// ==========================================
const ChartAnalyzer = ({ onBack }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [error, setError] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const [preferences, setPreferences] = useState({
    smc: false,
    ema: false,
    engulfing: false
  });

  const fileInputRef = useRef(null);

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.split(',')[1]);
        setPreviewUrl(reader.result);
        setResult(null);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi helper untuk retry otomatis jika server sibuk
  const fetchWithRetry = async (url, options, retries = 3, backoff = 3000) => {
    try {
      const response = await fetch(url, options);
      
      // Jika status 429 (Too Many Requests) atau 503 (Service Unavailable)
      if (response.status === 429 || response.status === 503) {
         if (retries > 0) {
           console.warn(`Server sibuk (Status ${response.status}), mencoba lagi dalam ${backoff}ms...`);
           await new Promise(resolve => setTimeout(resolve, backoff));
           // Tambah backoff time (exponential backoff)
           return fetchWithRetry(url, options, retries - 1, backoff * 1.5);
         }
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP Error ${response.status}`);
      }

      const data = await response.json();
      
      // Cek error dalam body JSON (Gemini API spesifik)
      if (data.error) {
        // Kode 429 atau pesan overloaded -> Retry
        if (retries > 0 && (data.error.code === 429 || data.error.code === 503 || data.error.message.toLowerCase().includes('overloaded') || data.error.message.toLowerCase().includes('quota'))) {
           console.warn(`API Error: ${data.error.message}. Retrying...`);
           await new Promise(resolve => setTimeout(resolve, backoff));
           return fetchWithRetry(url, options, retries - 1, backoff * 1.5);
        }
        throw new Error(data.error.message);
      }
      
      return data;
    } catch (err) {
      // Jika error network fetch gagal total -> Retry
      if (retries > 0 && (err.message.includes('Failed to fetch') || err.message.includes('overloaded'))) {
         console.warn(`Network Error. Retrying...`);
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
      let mockResult;
      
      let extraReasoning = "";
      if (preferences.smc) extraReasoning += " Terdeteksi Order Block valid di area demand.";
      if (preferences.ema) extraReasoning += " Harga memantul tepat di EMA 50.";
      if (preferences.engulfing) extraReasoning += " Konfirmasi pola Bullish Engulfing terlihat jelas.";

      if (randomDecision > 0.6) {
        mockResult = {
          decision: "BUY",
          confidence: 85,
          reasoning: "Terbentuk struktur market bullish (HH/HL)." + extraReasoning + " Momentum positif terlihat kuat.",
          support: "410 (Kritis), 400 (Psikologis)",
          resistance: "440 (Resistensi konsolidasi), 460 (Swing High)",
          trend: "Uptrend",
          entry: "412 - 415",
          stop_loss: "395",
          take_profit: "440 - 450"
        };
      } else if (randomDecision > 0.3) {
        mockResult = {
          decision: "SELL",
          confidence: 78,
          reasoning: "Gagal menembus supply zone." + extraReasoning + " Indikasi pelemahan tren dominan.",
          support: "380 (Low sebelumnya)",
          resistance: "420 (EMA 50)",
          trend: "Downtrend",
          entry: "415 - 418",
          stop_loss: "425",
          take_profit: "385 - 390"
        };
      } else {
        mockResult = {
          decision: "WAIT",
          confidence: 60,
          reasoning: "Pasar ranging. Belum ada konfirmasi arah yang jelas." + extraReasoning,
          support: "400",
          resistance: "430",
          trend: "Sideways",
          entry: "Tunggu Breakout",
          stop_loss: "-",
          take_profit: "-"
        };
      }
      setResult(mockResult);
      setLoading(false);
    }, 2000);
  };

  const analyzeChart = async () => {
    if (!image) {
      setError("Silakan upload gambar chart terlebih dahulu.");
      return;
    }
    if (isDemoMode || !apiKey) {
      if (!isDemoMode && !apiKey) {
        setError("Masukkan API Key atau gunakan Mode Demo.");
        return;
      }
      simulateAnalysis();
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      let additionalInstructions = "";
      if (preferences.smc) additionalInstructions += "- Gunakan konsep Smart Money Concept (SMC): Cari Order Blocks, FVG, BOS, CHoCH.\n";
      if (preferences.ema) additionalInstructions += "- Perhatikan posisi harga terhadap EMA 10, 20, 50, 100, 200.\n";
      if (preferences.engulfing) additionalInstructions += "- Cari pola Engulfing.\n";

      const prompt = `
        Bertindaklah sebagai analis teknikal pasar keuangan profesional.
        Analisis gambar chart TradingView ini.
        ${additionalInstructions}
        
        Tugas Utama:
        1. Identifikasi Tren, Support/Resistance.
        2. Tentukan Setup Trading (Plan) yang ideal: Entry Point, Stop Loss (untuk pembatasan risiko), dan Take Profit (Target).
        3. Berikan Keputusan: BUY, SELL, atau WAIT.
        
        PENTING: 
        - Pastikan Support, Resistance, Entry, SL, dan TP mencantumkan ANGKA harga yang terlihat di sumbu kanan chart.
        - Jika teks penjelasannya panjang, tolong persingkat.
        
        Format JSON (Hanya JSON, tanpa markdown):
        {
          "decision": "BUY/SELL/WAIT",
          "confidence": number,
          "reasoning": "string",
          "support": "string",
          "resistance": "string",
          "trend": "string",
          "entry": "string",
          "stop_loss": "string",
          "take_profit": "string"
        }
      `;

      // KEMBALI KE MODEL 2.5 FLASH (Model yang didukung lingkungan ini)
      // Menggunakan fetchWithRetry untuk menangani error overload/quota
      const data = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: image } }] }]
        })
      });

      const cleanJson = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(cleanJson));
    } catch (err) {
      console.error(err);
      
      let msg = err.message;
      // Menerjemahkan error teknis ke bahasa manusia
      if (msg.includes('Quota exceeded')) msg = "Kuota API Gratis Habis. Mohon tunggu beberapa saat sebelum mencoba lagi.";
      else if (msg.includes('overloaded')) msg = "Server AI sedang sangat sibuk. Sedang mencoba ulang...";
      else if (msg.includes('not found')) msg = "Model AI tidak ditemukan. Gunakan model 2.5 Flash.";
      
      setError(`Gagal: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-10 flex flex-col">
      {/* Header App */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg transition-colors mr-2 text-slate-400 hover:text-white flex items-center gap-1 group">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> <span className="text-sm">Kembali</span>
            </button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 12 L16 8 M16 8 L16 11 M16 8 L12 8" stroke="#22d3ee" strokeWidth="2.5" />
            </svg>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Ruang Analisa</h1>
            </div>
          </div>
          
          <button 
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5
              ${apiKey ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}
            `}
          >
            <Key size={12} /> {apiKey ? 'API Connected' : 'Set API Key'}
          </button>
        </div>
      </header>

      {/* Main Content App */}
      <main className="max-w-3xl mx-auto px-4 mt-8 flex-grow w-full">
        {showApiKeyInput && (
          <div className="mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-sm font-semibold mb-2 text-slate-300">Konfigurasi API</h3>
            <div className="flex gap-2">
              <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste Gemini API Key..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
              <button onClick={() => setShowApiKeyInput(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Simpan</button>
            </div>
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-700/50">
               <input type="checkbox" id="demoMode" checked={isDemoMode} onChange={(e) => setIsDemoMode(e.target.checked)} className="rounded bg-slate-900 text-blue-600 focus:ring-blue-500" />
               <label htmlFor="demoMode" className="text-sm text-slate-300 cursor-pointer">Gunakan Mode Demo (Gratis)</label>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${previewUrl ? 'border-blue-500/50 bg-slate-800/50' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}`}>
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"><p className="text-white bg-slate-900/80 px-4 py-2 rounded-full flex gap-2 border border-slate-600"><Camera size={18}/> Ganti Foto</p></div>
                </>
              ) : (
                <div className="text-center p-6"><div className="bg-slate-800 p-4 rounded-full inline-block mb-3 shadow-lg group-hover:scale-110 transition-transform"><Upload className="text-blue-500" size={32} /></div><h3 className="text-lg font-medium text-slate-200">Upload Chart</h3><p className="text-slate-500 text-sm mt-1">Klik atau tarik gambar ke sini</p></div>
              )}
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-slate-300"><Layers size={16} /><h3 className="text-sm font-semibold">Preferensi Analisis</h3></div>
              <div className="space-y-2">
                {[ { id: 'smc', label: 'Smart Money Concept (SMC)' }, { id: 'ema', label: 'Strategi EMA' }, { id: 'engulfing', label: 'Pola Candlestick Engulfing' } ].map((opt) => (
                  <button key={opt.id} onClick={() => togglePreference(opt.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm border transition-all ${preferences[opt.id] ? 'bg-blue-600/20 border-blue-500/50 text-blue-200' : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-600'}`}>
                    {preferences[opt.id] ? <CheckSquare size={18} className="text-blue-400" /> : <Square size={18} />} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={analyzeChart} disabled={loading || !image} className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${loading ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed' : image ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 scale-[1.02] hover:scale-[1.03]' : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'}`}>
              {loading ? <><Loader2 className="animate-spin" /> Menganalisis...</> : "Mulai Analisa"}
            </button>
            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in"><X size={16} /> {error}</div>}
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col min-h-[500px] shadow-xl relative overflow-hidden">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2 flex justify-between items-center"><span>Hasil Analisis</span>{result && <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">AI Generated</span>}</h2>
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 flex-grow">
                {/* Decision Block */}
                <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div><span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Rekomendasi</span><div className={`text-4xl font-black mt-1 flex items-center gap-3 ${result.decision === 'BUY' ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]' : result.decision === 'SELL' ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'text-slate-200'}`}>{result.decision} {result.decision === 'BUY' ? <TrendingUp size={32}/> : result.decision === 'SELL' ? <TrendingDown size={32}/> : <Minus size={32}/>}</div></div>
                  <div className="text-right"><span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Keyakinan</span><div className="text-2xl font-bold text-white mt-1">{result.confidence}%</div></div>
                </div>
                
                {/* === TRADING PLAN (ENTRY - SL - TP) === */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Entry Box */}
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><LogIn size={10}/> Entry</span>
                    <div className="text-blue-300 font-bold text-sm mt-1 break-words">
                      {result.entry || "-"}
                    </div>
                  </div>
                  {/* SL Box */}
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 hover:border-rose-500/50 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><Ban size={10}/> SL</span>
                    <div className="text-rose-400 font-bold text-sm mt-1 break-words">
                      {result.stop_loss || "-"}
                    </div>
                  </div>
                  {/* TP Box */}
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-1"><Target size={10}/> TP</span>
                    <div className="text-emerald-400 font-bold text-sm mt-1 break-words">
                      {result.take_profit || "-"}
                    </div>
                  </div>
                </div>

                {/* Support & Resistance */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold">Support</span>
                    <div className="text-slate-200 font-medium text-base mt-1 break-words leading-snug">
                      {result.support}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <span className="text-xs text-slate-400 uppercase font-bold">Resistance</span>
                    <div className="text-slate-200 font-medium text-base mt-1 break-words leading-snug">
                      {result.resistance}
                    </div>
                  </div>
                </div>
                
                {/* Trend Info */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700/50">
                   <span className="text-slate-400 text-xs uppercase font-bold">Deteksi Tren</span>
                   <div className="text-blue-300 font-medium text-lg mt-1 flex items-center gap-2">
                      {result.trend && result.trend.includes('Up') ? <TrendingUp size={18} /> : result.trend && result.trend.includes('Down') ? <TrendingDown size={18} /> : <Minus size={18} />}
                      {result.trend}
                   </div>
                </div>

                {/* Reasoning */}
                <div className="bg-slate-900/30 p-4 rounded-xl border border-slate-700/30"><span className="text-xs text-slate-400 uppercase font-bold flex items-center gap-2 mb-2"><Info size={12}/> Penjelasan AI</span><p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{result.reasoning}</p></div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 opacity-50"><div className="w-20 h-20 rounded-full bg-slate-700/50 mb-6 flex items-center justify-center shadow-inner"><TrendingUp size={40} /></div><p className="text-base font-medium">Hasil analisis akan muncul di sini</p><p className="text-sm">Upload chart untuk memulai</p></div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="mt-12 py-6 text-center text-slate-500 text-xs border-t border-slate-800 px-4">
        <p>© 2025 TradeVision AI. Powered by Google Gemini.</p>
        <div className="mt-3 max-w-2xl mx-auto p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 font-medium">Disclaimer</p>
          <p className="mt-1 text-slate-500 leading-relaxed">Aplikasi ini hanya alat bantu. Keputusan trading dan risiko ada di tangan Anda.</p>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// BAGIAN 3: MAIN APP (Pengatur Halaman)
// ==========================================
const App = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' atau 'app'

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onStart={() => setCurrentView('app')} />
      ) : (
        <ChartAnalyzer onBack={() => setCurrentView('landing')} />
      )}
    </>
  );
};

export default App;