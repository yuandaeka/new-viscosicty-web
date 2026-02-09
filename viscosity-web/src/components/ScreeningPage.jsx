import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';

const genAI = new GoogleGenerativeAI("AIzaSyBwCHEWa3W7BsOln6otyKHGwZDeOOm4Gs");

const questions = [
  { id: 1, label: "Walking Reflex", desc: "Anak melangkah 1 kaki dalam 3 detik saat diberdirikan[cite: 300]." },
  { id: 2, label: "Positioning Reflex", desc: "Refleks posisi kepala saat telentang (ATNR)[cite: 308]." },
  { id: 3, label: "Landau Reaction", desc: "Mengangkat kepala dan punggung saat posisi telungkup horisontal[cite: 319]." },
  { id: 4, label: "Protective Reaction (Forward)", desc: "Meluruskan lengan ke depan saat akan jatuh[cite: 329]." },
  { id: 5, label: "Protective Reaction (Side)", desc: "Meluruskan lengan ke samping saat duduk[cite: 336]." },
  { id: 6, label: "Rolling Back to Side", desc: "Mampu berguling dari telentang ke samping[cite: 378]." },
  { id: 7, label: "Extending Arms & Legs", desc: "Meluruskan tangan & kaki dalam 5 detik[cite: 378]." },
  { id: 8, label: "Extension Trunk", desc: "Mengangkat kepala & badan 45 derajat (Prone)[cite: 378]." },
  { id: 9, label: "Prop on Forearms", desc: "Menumpu pada lengan bawah selama 5 detik[cite: 378]." },
  { id: 10, label: "Pushing Up", desc: "Menumpu berat pada telapak tangan selama 5 sec[cite: 378]." },
  { id: 11, label: "Align Head (Vertical)", desc: "Menjaga kepala di garis tengah saat diangkat tegak[cite: 387]." },
  { id: 12, label: "Bearing Weight", desc: "Menumpu berat pada kaki dengan lutut fleks[cite: 387]." },
  { id: 13, label: "Align Trunk (Sitting)", desc: "Menjaga punggung melengkung 3 detik saat didudukkan[cite: 387]." },
  { id: 14, label: "Stability Trunk", desc: "Badan terangkat 30 derajat dari kaki selama 5 detik[cite: 387]." },
  { id: 15, label: "Sitting Unsupported", desc: "Duduk tanpa bantuan selama 60 detik[cite: 387]." },
  { id: 16, label: "Pulls to Stand", desc: "Menarik tubuh untuk berdiri menggunakan objek[cite: 413]." },
  { id: 17, label: "Lowering to Sit", desc: "Menurunkan badan ke posisi duduk tanpa jatuh[cite: 425]." },
  { id: 18, label: "Stand on 1 Foot (Item 23S)", desc: "Tangan di pinggang, berdiri 1 kaki 5 detik[cite: 451]." },
  { id: 19, label: "Stand on 1 Foot (Item 25S)", desc: "Berdiri 6 detik bergantian setiap kaki[cite: 451]." },
  { id: 20, label: "Stand on 1 Foot (Item 27S)", desc: "Berdiri pada satu kaki selama 10 detik[cite: 451]." },
];

export default function ScreeningPage({ onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleScore = (val) => {
    setAnswers({ ...answers, [questions[currentStep].id]: val });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const analyze = async () => {
    setLoading(true);
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Analisis skor PDMS-2 anak Cerebral Palsy. Total Skor: ${total}/40 (dari 20 soal). 
    Skor < 20 rekomendasikan Level 1 VISCOSITY, Skor >= 20 rekomendasikan Level 2. 
    Berikan laporan profesional dalam Bahasa Indonesia yang suportif[cite: 23].`;
    
    try {
      const res = await model.generateContent(prompt);
      setResult(res.response.text());
    } catch (e) { setResult("Gagal memuat analisis AI."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-visco-soft p-6 md:p-12">
      <button onClick={onBack} className="flex items-center gap-2 font-bold text-visco-blue mb-10">
        <ArrowLeft /> Kembali ke Beranda
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-card p-10 shadow-2xl shadow-visco-blue/10">
        {!result ? (
          <>
            <div className="mb-10">
              <span className="text-visco-blue font-bold tracking-widest uppercase">Langkah {currentStep + 1} dari {questions.length}</span>
              <h2 className="text-3xl font-bold mt-2">{questions[currentStep].label}</h2>
              <p className="text-slate-500 mt-2 text-lg">{questions[currentStep].desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {[0, 1, 2].map(v => (
                <button key={v} onClick={() => handleScore(v)}
                className="py-8 rounded-2xl border-2 border-slate-100 hover:border-visco-blue hover:bg-visco-soft transition-all font-bold text-2xl group">
                  Skor {v}
                  <span className="block text-sm font-normal text-slate-400 group-hover:text-visco-blue">
                    {v === 0 ? "Tidak bisa" : v === 1 ? "Bisa sebagian" : "Berhasil sempurna"}
                  </span>
                </button>
              ))}
            </div>

            {currentStep === questions.length - 1 && Object.keys(answers).length === questions.length && (
              <button onClick={analyze} className="w-full bg-visco-orange text-white py-5 rounded-2xl font-bold text-xl shadow-xl flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin"/> : <Sparkles />} Lihat Hasil Rekomendasi AI
              </button>
            )}
          </>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-visco-blue mb-6">Hasil Analisis</h2>
            <div className="prose text-slate-700 text-lg whitespace-pre-wrap leading-relaxed">{result}</div>
            <button onClick={() => window.location.reload()} className="mt-10 bg-visco-blue text-white px-8 py-4 rounded-xl font-bold">Ulangi Tes</button>
          </div>
        )}
      </div>
    </div>
  );
}