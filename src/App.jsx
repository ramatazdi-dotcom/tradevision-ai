import React, { useState, useRef } from 'react';
import { Upload, Camera, TrendingUp, TrendingDown, Minus, AlertTriangle, X, Loader2, Key, Layers, CheckSquare, Square, Info } from 'lucide-react';

const App = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [error, setError] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // State untuk preferensi indikator
  const [preferences, setPreferences] = useState({
    smc: false,
    ema: false,
    engulfing: false
  });

  const fileInputRef = useRef(null);

  const togglePreference = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
          support: "1920.50",
          resistance: "1950.00",
          trend: "Uptrend"
        };
      } else if (randomDecision > 0.3) {
        mockResult = {
          decision: "SELL",
          confidence: 78,
          reasoning: "Gagal menembus supply zone." + extraReasoning + " Indikasi pelemahan tren dominan.",
          support: "1880.00",
          resistance: "1910.00",
          trend: "Downtrend"
        };
      } else {
        mockResult = {
          decision: "WAIT",
          confidence: 60,
          reasoning: "Pasar ranging. Belum ada konfirmasi arah yang jelas." + extraReasoning,
          support: "1900.00",
          resistance: "1915.00",
          trend: "Sideways"
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
      if (preferences.smc) {
        additionalInstructions += "- Analisis menggunakan konsep Smart Money Concept (SMC): Cari Order Blocks, Fair Value Gaps (FVG), Break of Structure (BOS), dan Change of Character (CHoCH).\n";
      }
      if (preferences.ema) {
        additionalInstructions += "- Perhatikan posisi harga terhadap Exponential Moving Average (EMA) 10, 20, 50, 100, atau 200. Apakah harga sedang di atas/bawah EMA kunci tersebut?\n";
      }
      if (preferences.engulfing) {
        additionalInstructions += "- Prioritaskan pencarian pola candlestick Bullish Engulfing atau Bearish Engulfing sebagai sinyal konfirmasi.\n";
      }

      const prompt = `
        Bertindaklah sebagai analis teknikal pasar keuangan profesional.
        Analisis gambar chart TradingView ini secara mendalam.
        
        INSTRUKSI KHUSUS:
        ${additionalInstructions}

        Tugas Utama:
        1. Identifikasi Tren (Uptrend/Downtrend/Sideways).
        2. Tentukan Level Support & Resistance.
        3. Berikan Keputusan: "BUY", "SELL", atau "WAIT".
        
        Format JSON (Hanya JSON, tanpa markdown):
        {
          "decision": "BUY/SELL/WAIT",
          "confidence": 80,
          "reasoning": "Analisis lengkap...",
          "support": "Level harga",
          "resistance": "Level harga",
          "trend": "Arah tren"
        }
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: image
                }
              }
            ]
          }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      const cleanJson = textResponse.replace(/```json|```/g, '').trim();
      const jsonResult = JSON.parse(cleanJson);
      
      setResult(jsonResult);

    } catch (err) {
      console.error(err);
      setError("Gagal menganalisis. Cek API Key atau coba gambar lain.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-10 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
              {/* Logo Baru TradeVision AI */}
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                {/* Bagian Mata (Vision) */}
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
  
                {/* Bagian Chart (Trade) - Panah Naik Petir */}
                <path d="M12 12 L16 8 L16 11 L20 7" stroke="cyan" strokeWidth="2.5" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">TradeVision AI</h1>
                <span className="bg-slate-800 border border-slate-700 text-xs px-2 py-0.5 rounded-full text-slate-400">v1.0</span>
              </div>
              <p className="text-xs text-slate-400">Technical Analysis Assistant</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5
              ${apiKey 
                ? 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
          >
            <Key size={14} />
            {apiKey ? 'API Connected' : 'Set API Key'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 mt-8 flex-grow w-full">
        
        {/* Settings Panel */}
        {showApiKeyInput && (
          <div className="mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-top-4 shadow-xl">
            <h3 className="text-sm font-semibold mb-2 text-slate-300">System Configuration</h3>
            <div className="flex gap-2">
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste Gemini API Key here..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
              />
              <button 
                onClick={() => setShowApiKeyInput(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-700/50">
               <input 
                type="checkbox" 
                id="demoMode"
                checked={isDemoMode}
                onChange={(e) => setIsDemoMode(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 w-4 h-4"
               />
               <label htmlFor="demoMode" className="text-sm text-slate-300 cursor-pointer select-none">
                 Enable Demo Mode (Simulated Data)
               </label>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 mb-6 flex items-start gap-3">
          <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-blue-200/80 leading-relaxed">
            <strong>Siap Menganalisis:</strong> Upload screenshot chart TradingView Anda. Pastikan candle, indikator, dan harga terlihat jelas agar AI bekerja maksimal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column: Inputs */}
          <div className="space-y-4">
            {/* Upload Box */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden group
                ${previewUrl 
                  ? 'border-blue-500/50 bg-slate-800/50' 
                  : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'}
              `}
            >
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Chart Preview" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <p className="text-white font-medium flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-600">
                      <Camera size={18} /> Ganti Foto
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="bg-slate-800 p-4 rounded-full inline-block mb-3 group-hover:scale-110 transition-transform shadow-lg">
                    <Upload className="text-blue-500" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-200">Upload Chart</h3>
                  <p className="text-slate-500 text-sm mt-1">Klik atau tarik gambar ke sini</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </div>

            {/* Analysis Options */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 text-slate-300">
                <Layers size={16} />
                <h3 className="text-sm font-semibold">Preferensi Analisis</h3>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'smc', label: 'Smart Money Concept (SMC)' },
                  { id: 'ema', label: 'EMA 10/20/50/200' },
                  { id: 'engulfing', label: 'Pola Candlestick Engulfing' }
                ].map((opt) => (
                  <button 
                    key={opt.id}
                    onClick={() => togglePreference(opt.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all border ${preferences[opt.id] ? 'bg-blue-600/20 border-blue-500/50 text-blue-200' : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:border-slate-600'}`}
                  >
                    {preferences[opt.id] ? <CheckSquare size={18} className="text-blue-400" /> : <Square size={18} />}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={analyzeChart}
              disabled={loading || !image}
              className={`
                w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
                ${loading 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700' 
                  : image 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 scale-[1.02] hover:scale-[1.03]' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Menganalisis...
                </>
              ) : (
                <>
                  Analisis Market
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
                <X size={16} /> {error}
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col min-h-[500px] shadow-xl relative overflow-hidden">
            <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2 flex justify-between items-center">
              <span>Hasil Analisis</span>
              {result && <span className="text-xs font-normal text-slate-400 px-2 py-1 bg-slate-700 rounded">AI Generated</span>}
            </h2>
            
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 flex-grow">
                
                {/* Main Decision */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div>
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Rekomendasi</span>
                    <div className={`text-4xl font-black mt-1 flex items-center gap-3
                      ${result.decision === 'BUY' ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]' : 
                        result.decision === 'SELL' ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'text-slate-200'}
                    `}>
                      {result.decision}
                      {result.decision === 'BUY' && <TrendingUp size={32} />}
                      {result.decision === 'SELL' && <TrendingDown size={32} />}
                      {result.decision === 'WAIT' && <Minus size={32} />}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Keyakinan</span>
                    <div className="text-2xl font-bold text-white mt-1">{result.confidence}%</div>
                  </div>
                </div>

                {/* Technical Levels */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <span className="text-slate-400 text-xs uppercase font-bold">Support</span>
                    <div className="text-emerald-400 font-mono font-bold text-xl mt-1">{result.support}</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <span className="text-slate-400 text-xs uppercase font-bold">Resistance</span>
                    <div className="text-rose-400 font-mono font-bold text-xl mt-1">{result.resistance}</div>
                  </div>
                </div>
                
                {/* Trend Info */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700/50">
                   <span className="text-slate-400 text-xs uppercase font-bold">Deteksi Tren</span>
                   <div className="text-blue-300 font-medium text-lg mt-1 flex items-center gap-2">
                      {result.trend.includes('Up') ? <TrendingUp size={18} /> : result.trend.includes('Down') ? <TrendingDown size={18} /> : <Minus size={18} />}
                      {result.trend}
                   </div>
                </div>

                {/* Reasoning Text */}
                <div className="bg-slate-900/30 rounded-xl border border-slate-700/30 p-4">
                  <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 mb-2">
                    <Info size={12} /> Alasan AI
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-light">
                    {result.reasoning}
                  </p>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 opacity-50">
                <div className="w-20 h-20 rounded-full bg-slate-700/50 mb-6 flex items-center justify-center shadow-inner">
                   <TrendingUp size={40} />
                </div>
                <p className="text-base font-medium">Hasil analisis akan muncul di sini</p>
                <p className="text-sm">Upload chart untuk memulai</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-slate-500 text-xs border-t border-slate-800 px-4">
        <p>© 2025 TradeVision AI. Powered by RAMA TAZDI and Google Gemini 2.5 Flash.</p>
        <div className="mt-3 max-w-2xl mx-auto p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <p className="text-slate-400 font-medium">Disclaimer</p>
          <p className="mt-1 text-slate-500 leading-relaxed">
            Aplikasi ini hanya merupakan alat bantu tambahan untuk analisis. Keputusan transaksi (jual/beli) dan tanggung jawab atas risiko sepenuhnya ada di tangan trader.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;