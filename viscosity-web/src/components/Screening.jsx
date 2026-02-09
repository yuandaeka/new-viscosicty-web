import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';

const genAI = new GoogleGenerativeAI("AIzaSyBwCHEWa3W7BsOln6otyKHGwZDeOOm4Gs");

export default function Screening() {
  const [scores, setScores] = useState({ item1: 0, item2: 0, item3: 0 });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeAI = async () => {
    setLoading(true);
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analisis skor PDMS-2 motorik kasar anak Cerebral Palsy. Total Skor: ${total}/132. 
    [cite_start]Berdasarkan paper VISCOSITY, jika skor < 70 rekomendasikan Level 1 (Fokus stimulasi visual), jika >= 70 rekomendasikan Level 2 (Fokus koordinasi ADL)[cite: 259, 329]. 
    Berikan narasi evaluasi yang sangat profesional, suportif, dan inspiratif dalam Bahasa Indonesia.`;
    
    try {
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) { setResult("Gagal menghubungi asisten AI. Silakan periksa koneksi anda."); }
    setLoading(false);
  };

  return (
    <section id="screening" className="py-24 px-10 bg-white">
      <div className="max-w-5xl mx-auto bg-visco-bg p-10 md:p-20 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10"><BrainCircuit size={120} /></div>
        
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">AI Motoric Assessment</h2>
          [cite_start]<p className="text-slate-500 text-lg">Menganalisis tingkat kemampuan motorik berdasarkan standar klinis PDMS-2[cite: 267].</p>
        </div>

        <div className="space-y-12 relative z-10">
          {[
            { id: 'item1', label: '1. Reach (Meraih Objek)', desc: 'Kemampuan meraih dan memindahkan objek virtual.' },
            { id: 'item2', label: '2. Pushing Up (Menumpu)', desc: 'Kemampuan menumpu berat badan pada telapak tangan.' },
            { id: 'item3', label: '3. Grasping (Menggenggam)', desc: 'Kekuatan genggaman pada kontroler VR.' }
          ].map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-50">
              <p className="text-xl font-bold text-slate-800 mb-2 italic">{item.label}</p>
              <p className="text-slate-500 mb-6">{item.desc}</p>
              <div className="flex gap-4">
                {[0, 1, 2].map(v => (
                  <button key={v} onClick={() => setScores({...scores, [item.id]: v})} 
                  className={`w-16 h-16 rounded-2xl font-bold text-xl transition-all ${scores[item.id] === v ? 'bg-visco-blue text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>{v}</button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={analyzeAI} disabled={loading}
          className="w-full bg-visco-blue text-white py-6 rounded-3xl font-bold text-2xl hover:shadow-2xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {loading ? "AI Sedang Menghitung..." : "Analisis Hasil Sekarang"}
          </button>

          {result && (
            <div className="mt-12 p-8 bg-indigo-50 rounded-[2.5rem] border-l-[12px] border-visco-blue animate-fade-in-up">
              <h3 className="text-2xl font-bold text-visco-blue mb-6">Laporan Evaluasi VISCOSITY:</h3>
              <p className="text-slate-700 leading-relaxed text-lg italic whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}