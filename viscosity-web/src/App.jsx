import React, { useState, useEffect } from 'react';
import { Target, Activity, Zap, BarChart3, ArrowLeft, Heart, Shield, Star, CheckCircle2, Trophy, ChevronRight, Globe, Download, Play, RefreshCw, Send } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ViscoLogo from './assets/viscocity.png';

const content = {
  id: {
    nav: { home: "Beranda", about: "Tentang", innovation: "Inovasi", start: "Mulai Screening" },
    hero: {
      tag: "Terapi VR Adaptif Pertama di Indonesia",
      title: "Kami Menyiapkan Anak Anda Untuk Hidup.",
      desc: "VISCOSITY meningkatkan fungsi motorik ekstremitas atas melalui simulasi VR yang adaptif dan menyenangkan.",
      btn: "Mulai Screening Sekarang"
    },
    about: {
      title: "Misi Kami: Kepatuhan Latihan",
      desc: '"Hanya 33.9% anak CP yang patuh pada program latihan konvensional. Kami hadir mengubahnya menjadi petualangan imersif."',
      card1: { title: "Empati", desc: "Dirancang khusus untuk kenyamanan rehabilitasi anak." },
      card2: { title: "Klinis", desc: "Sesuai standar medis internasional PDMS-2." }
    },
    innovation: {
      title: "Teknologi Inovatif",
      adaptive: { title: "Adaptif", desc: "Kesulitan menyesuaikan performa motorik anak." },
      clinical: { title: "Klinis", desc: "Berdasarkan instrumen medis nyata PDMS-2." },
      immersive: { title: "Imersif", desc: "Visual 3D & audio untuk memotivasi anak." },
      realtime: { title: "Real-time", desc: "Umpan balik instan pada setiap gerakan." }
    },
    footer: {
      newsletter: "Berlangganan Newsletter Kami",
      placeholder: "Masukkan email Anda",
      desc: "Inovasi rehabilitasi VR masa depan untuk kemandirian motorik anak.",
      rights: "© 2026 VISCOSITY PROJECT TEAM • UNIVERSITAS MUHAMMADIYAH SURAKARTA • ALL RIGHTS RESERVED"
    },
    screening: {
      back: "Kembali", progress: "Kemajuan", score0: "Belum Mampu", score1: "Bisa Sebagian", score2: "Sangat Mampu",
      resultBtn: "Ulangi Screening", gameBtn: "Buka Game VR", pdfBtn: "Unduh Hasil PDF"
    }
  },
  en: {
    nav: { home: "Home", about: "About", innovation: "Innovation", start: "Start Screening" },
    hero: {
      tag: "First Adaptive VR Therapy in Indonesia",
      title: "We Prepare Your Child For Life.",
      desc: "VISCOSITY improves upper extremity motor function through adaptive and fun VR simulations.",
      btn: "Start Screening Now"
    },
    about: {
      title: "Our Mission: Exercise Adherence",
      desc: '"Only 33.9% of children with CP adhere to conventional exercise. We are here to transform it into an immersive adventure."',
      card1: { title: "Empathy", desc: "Specially designed for the comfort of child rehabilitation." },
      card2: { title: "Clinical", desc: "In accordance with international medical standards PDMS-2." }
    },
    innovation: {
      title: "Innovative Technology",
      adaptive: { title: "Adaptive", desc: "Difficulty adjusts to child's motor performance." },
      clinical: { title: "Clinical", desc: "Based on real PDMS-2 medical instruments." },
      immersive: { title: "Immersive", desc: "3D Visuals & audio to boost motivation." },
      realtime: { title: "Real-time", desc: "Instant feedback on every motor movement." }
    },
    footer: {
      newsletter: "Subscribe to Our Newsletter",
      placeholder: "Enter your email",
      desc: "Future VR rehabilitation innovation for child motor independence.",
      rights: "© 2026 VISCOSITY PROJECT TEAM • UMS • ALL RIGHTS RESERVED"
    },
    screening: {
      back: "Back", progress: "Progress", score0: "Unable", score1: "Partial", score2: "Mastered",
      resultBtn: "Repeat Screening", gameBtn: "Open VR Game", pdfBtn: "Download PDF Result"
    }
  }
};

const pdmsQuestions = [
  // Subscale A: Reflexes (Halaman 1)
  { id: 1, label: { id: "Walking Reflex", en: "Walking Reflex" }, desc: { id: "Diberdirikan tegak: Melangkah 1 kaki kemudian kaki lainnya dalam 3 detik.", en: "Held standing: Steps 1 foot then other within 3 seconds." } },
  { id: 2, label: { id: "Positioning Reflex", en: "Positioning Reflex" }, desc: { id: "Telentang: Tidak ada gerakan abnormal lengan/kaki saat kepala di midline.", en: "Supine: No arm or leg movement when head held in midline." } },
  { id: 3, label: { id: "Landau Reaction", en: "Landau Reaction" }, desc: { id: "Horisontal: Mengangkat kepala, meluruskan badan, angkat pinggul & kaki.", en: "Horizontal suspended: Raises head, extends trunk, raises hips/legs." } },
  { id: 4, label: { id: "Protecting Forward", en: "Protecting Forward" }, desc: { id: "Tengkurap horisontal: Meluruskan lengan, siku, menumpu pada tangan.", en: "Suspended horizontal: Extends arms, elbows & bears weight on hands." } },
  { id: 5, label: { id: "Protective Side", en: "Protective Side" }, desc: { id: "Duduk: Meluruskan lengan dan menumpu berat ke samping.", en: "Sitting: Extends arm & bears weight to side when tilted." } },
  { id: 6, label: { id: "Protective Forward (Sit)", en: "Protective Forward (Sit)" }, desc: { id: "Duduk: Menahan jatuh dengan 1 atau 2 lengan.", en: "Sitting: Breaks fall with 1 or 2 arms." } },
  { id: 7, label: { id: "Righting Forward", en: "Righting Forward" }, desc: { id: "Duduk: Mendukung diri sendiri selama 2 detik.", en: "Sitting: Supports self for 2 seconds." } },
  { id: 8, label: { id: "Protecting Backward", en: "Protecting Backward" }, desc: { id: "Duduk: Berhenti dengan meluruskan lengan & menumpu berat.", en: "Sitting: Stops by extending arms & supporting weight." } },
  
  // Subscale B: Supine (Halaman 2)
  { id: 9, label: { id: "Rot Head", en: "Rotation Head" }, desc: { id: "Telentang: Mengangkat atau memutar kepala ke kanan & kiri secara mandiri.", en: "Supine: Lift or turn head Right and Left independently." } },
  { id: 10, label: { id: "Thrust Legs", en: "Thrust Legs" }, desc: { id: "Telentang: Menggerakkan kaki secara bersamaan saat posisi telentang.", en: "Supine: Moves legs together while supine." } },
  { id: 11, label: { id: "Side to Back", en: "Side to Back" }, desc: { id: "Berguling dari samping ke punggung (kedua sisi).", en: "Supine: Rolls to back both sides." } },
  { id: 12, label: { id: "Thrust Arms", en: "Thrust Arms" }, desc: { id: "Telentang: Menekuk dan meluruskan lengan sebanyak minimal 2 kali.", en: "Supine: Bend and straight arms 2x." } },
  { id: 13, label: { id: "Symmetry Midline", en: "Symmetry Midline" }, desc: { id: "Telentang: Membawa kedua tangan dan kepala tepat ke garis tengah tubuh.", en: "Supine: Hands and head to midline." } },
  { id: 14, label: { id: "Rolling Back to Stomach", en: "Rolling Back to Stomach" }, desc: { id: "Berguling dari punggung ke tengkurap pada kedua sisi.", en: "Supine: Rolls back to stomach both sides." } },
  { id: 15, label: { id: "Raise to Sit", en: "Raise to Sit" }, desc: { id: "Menarik diri ke posisi duduk menggunakan kursi/pegangan.", en: "Supine: Pulls to sit using chair." } },

  // Subscale C: Prone (Halaman 2)
  { id: 16, label: { id: "Ext. Trunk", en: "Ext. Trunk" }, desc: { id: "Tengkurap: Mengangkat kepala & dada setinggi 45 derajat selama 3 detik.", en: "Prone: Lift head and trunk 45° for 3 seconds." } },
  { id: 17, label: { id: "Prop on Forearms", en: "Prop on Forearms" }, desc: { id: "Tengkurap: Menumpu pada lengan bawah selama 5 detik.", en: "Prone: Head and trunk 45° for 5 seconds." } },
  { id: 18, label: { id: "Ext Arms & Legs", en: "Ext Arms & Legs" }, desc: { id: "Tengkurap: Meluruskan lengan dan kaki selama 3 detik.", en: "Prone: Extends arms and legs for 3 seconds." } },
  { id: 19, label: { id: "Pushing Up", en: "Pushing Up" }, desc: { id: "Tengkurap: Menumpu berat pada telapak tangan selama 5 detik.", en: "Prone: Weight bearing on palms for 5 seconds." } },
  { id: 20, label: { id: "Raise to Hands & Knees", en: "Raise to Hands & Knees" }, desc: { id: "Mengangkat tubuh ke posisi merangkak dan bergoyang.", en: "Prone: Raise to hands and knees, rocks." } },

  // Subscale D: Vertical Hold (Halaman 3)
  { id: 21, label: { id: "Held Vertical Head", en: "Held Vertical Head" }, desc: { id: "Diberdirikan tegak: Menjaga kepala di garis tengah selama 3 detik.", en: "Held vertical: Head to midline 3 seconds." } },
  { id: 22, label: { id: "Align Head Bouncing", en: "Align Head Bouncing" }, desc: { id: "Kepala tetap di garis tengah saat anak dipantulkan di bahu.", en: "Hold child at shoulder, bounce, head in midline." } },
  { id: 23, label: { id: "Bearing Weight Vertical", en: "Bearing Weight Vertical" }, desc: { id: "Menumpu berat pada kaki dengan kaki rata selama 3 detik.", en: "Bears weight; feet flat for 3 seconds." } },

  // Subscale E: Sitting (Halaman 3)
  { id: 24, label: { id: "Align Trunk Sit", en: "Align Trunk Sit" }, desc: { id: "Duduk: Punggung tetap melengkung selama 3 detik.", en: "Sitting: Back held rounded 3 seconds." } },
  { id: 25, label: { id: "Stab Trunk Sitting", en: "Stab Trunk Sitting" }, desc: { id: "Duduk: Tubuh terangkat 30 derajat dari kaki selama 5 detik.", en: "Sitting: Trunk 30° off legs for 5 seconds." } },
  { id: 26, label: { id: "Sitting Unsupported 60s", en: "Sitting Unsupported 60s" }, desc: { id: "Duduk mandiri tanpa bantuan selama minimal 60 detik secara stabil.", en: "Sitting unsupported for 60 seconds." } },
  { id: 27, label: { id: "Sitting Balance Reach", en: "Sitting Balance Reach" }, desc: { id: "Duduk mandiri selama 8 detik sambil meraih mainan di depannya.", en: "Balance 8 sec, reach for toy." } },
  { id: 28, label: { id: "Scooting Sitting", en: "Scooting Sitting" }, desc: { id: "Duduk: Bergeser sejauh 3 kaki menggunakan tangan & kaki.", en: "Sitting: Scoot 3 ft using hands and legs." } },
  { id: 29, label: { id: "Pivoting Sitting", en: "Pivoting Sitting" }, desc: { id: "Duduk: Berputar 90 derajat pada bokong ke kedua sisi.", en: "Sitting: Turns 90° on bottom." } },

  // Subscale F: Hands and Knees (Halaman 4)
  { id: 30, label: { id: "Reciprocal Creeping", en: "Reciprocal Creeping" }, desc: { id: "Merangkak secara timbal balik sejauh 5 kaki.", en: "Reciprocal creep 5 feet." } },
  { id: 31, label: { id: "Creep over Legs", en: "Creep over Legs" }, desc: { id: "Merangkak melewati atau naik ke atas kaki pemeriksa.", en: "Creeps over or onto legs." } },
  { id: 32, label: { id: "Creep Stairs Up", en: "Creep Stairs Up" }, desc: { id: "Merangkak naik minimal 2 anak tangga.", en: "Creeps up 2 steps." } },

  // Subscale G: Kneeling (Halaman 4)
  { id: 33, label: { id: "Tall Kneel Head Rot", en: "Tall Kneel Head Rot" }, desc: { id: "Berlutut tegak selama 5 detik sambil menolehkan kepala.", en: "Tall kneel 5 sec while rot head." } },

  // Subscale H: Standing (Halaman 4)
  { id: 34, label: { id: "Pulls to Stand Chair", en: "Pulls to Stand Chair" }, desc: { id: "Menarik diri untuk berdiri pada objek atau kursi.", en: "Pulls to stand at object." } },
  { id: 35, label: { id: "Bouncing Stand", en: "Bouncing Stand" }, desc: { id: "Berpantul (bouncing) sebanyak 3 kali saat dipegang tangan.", en: "Hold hands, bounce 3x." } },
  { id: 36, label: { id: "Cruising Sideways", en: "Cruising Sideways" }, desc: { id: "Berjalan menyamping 4 langkah dengan berpegangan.", en: "Standing: 4 steps sideways holding furniture." } },
  { id: 37, label: { id: "Lowering to Sit Cont.", en: "Lowering to Sit Cont." }, desc: { id: "Menurunkan tubuh ke posisi duduk secara terkontrol.", en: "Lowers to sit no fall." } },
  { id: 38, label: { id: "Supported Stepping", en: "Supported Stepping" }, desc: { id: "Berjalan 4 langkah bergantian saat didukung di trunk.", en: "Supported at trunk, 4 alt. steps." } },
  { id: 39, label: { id: "Standing Unsupported 5s", en: "Standing Unsupported 5s" }, desc: { id: "Berdiri tanpa bantuan selama minimal 5 detik secara stabil.", en: "Stands unsupported for 5 seconds." } },

  // Subscale: Ambulation & Gait (Halaman 5-51)
  { id: 40, label: { id: "Walk Unaided 5 steps", en: "Walk Unaided 5 steps" }, desc: { id: "Berjalan tanpa bantuan minimal sebanyak 5 langkah.", en: "Walk unaided 5 steps." } },
  { id: 41, label: { id: "Walk Stairs support", en: "Walk Stairs support" }, desc: { id: "Naik 4 tangga dengan bantuan dinding atau pegangan.", en: "Walk up 4 steps with wall/rail support." } },
  { id: 42, label: { id: "Walk Stairs Unaided 4", en: "Walk Stairs Unaided 4" }, desc: { id: "Naik 4 tangga tanpa bantuan sama sekali.", en: "Walk 4 steps unaided." } },
  { id: 43, label: { id: "Walk Backward 5", en: "Walk Backward 5" }, desc: { id: "Berjalan mundur sebanyak minimal 5 langkah.", en: "Walk backward 5 steps." } },
  { id: 44, label: { id: "Walk Sideways 10ft", en: "Walk Sideways 10ft" }, desc: { id: "Berjalan menyamping 10 kaki dengan pola kaki yang sama.", en: "Walk sideways 10ft." } },
  { id: 45, label: { id: "Walk Line 6ft", en: "Walk Line 6ft" }, desc: { id: "Berjalan 6 kaki tepat di atas garis lurus.", en: "Walk 6ft on a line." } },
  { id: 46, label: { id: "Running 10ft", en: "Running 10ft" }, desc: { id: "Mampu berlari sejauh minimal 10 kaki secara stabil.", en: "Runs 10 feet." } },
  { id: 47, label: { id: "Jump Forward 4in", en: "Jump Forward 4in" }, desc: { id: "Melompat ke depan sejauh 4 inci dengan keseimbangan.", en: "Jump 4in forward with balance." } },
  { id: 48, label: { id: "Jump Up 2in", en: "Jump Up 2in" }, desc: { id: "Melompat ke atas setinggi 2 inci dengan kaki rapat.", en: "Jump up 2in with feet together." } },
  { id: 49, label: { id: "Jump Down 7in", en: "Jump Down 7in" }, desc: { id: "Melompat turun dari ketinggian 7 inci tanpa bantuan.", en: "Jump down 7in unaided." } },
  { id: 50, label: { id: "Walk Line Hips 8ft", en: "Walk Line Hips 8ft" }, desc: { id: "Berjalan 8 kaki di garis, tangan di pinggang, tanpa keluar garis.", en: "8ft on line, hands on hips." } },
  { id: 51, label: { id: "Galloping 10ft", en: "Galloping 10ft" }, desc: { id: "Berlari derap (galloping) sejauh 10 kaki secara ritmis.", en: "Galloping 10ft." } },
  { id: 52, label: { id: "Skipping 8 steps", en: "Skipping 8 steps" }, desc: { id: "Melompat-lompat (skipping) minimal 8 langkah secara bergantian.", en: "Skips 8 steps." } },
  { id: 53, label: { id: "Hopping 5 times", en: "Hopping 5 times" }, desc: { id: "Melompat dengan satu kaki (hopping) sebanyak 5 kali.", en: "Hops 5 times on 1 foot." } },
  { id: 54, label: { id: "Walk Tiptoes 5 steps", en: "Walk Tiptoes 5 steps" }, desc: { id: "Berjalan dengan ujung jari (jinjit) sebanyak 5 langkah.", en: "Walk on tiptoes 5 steps." } },
  { id: 55, label: { id: "Forward Roll", en: "Forward Roll" }, desc: { id: "Melakukan guling depan (forward roll) secara terkontrol.", en: "Completes forward roll." } },
  { id: 56, label: { id: "Sit-ups 3 in 30s", en: "Sit-ups 3 in 30s" }, desc: { id: "Melakukan minimal 3 sit-up dalam waktu 30 detik.", en: "3 sit-ups in 30 sec." } },
  { id: 57, label: { id: "Push-ups 8 in 20s", en: "Push-ups 8 in 20s" }, desc: { id: "Melakukan minimal 8 push-up dalam waktu 20 detik.", en: "8 push-ups in 20 sec." } },
  { id: 58, label: { id: "Catch Ball straddle", en: "Catch Ball straddle" }, desc: { id: "Menangkap bola yang digelindingkan saat duduk mengangkang.", en: "Catching ball rolled while sitting." } },
  { id: 59, label: { id: "Toss Ball 5ft", en: "Toss Ball 5ft" }, desc: { id: "Menangkap bola yang dilempar dari jarak 5 kaki.", en: "Catch ball tossed from 5ft." } },
  { id: 60, label: { id: "Throw Ball 3ft air", en: "Throw Ball 3ft air" }, desc: { id: "Melempar bola sejauh 3 kaki melalui udara.", en: "Throw ball 3ft in air." } },
  { id: 61, label: { id: "Kick Ball contact", en: "Kick Ball contact" }, desc: { id: "Mampu melakukan kontak kaki dan menendang bola di depan.", en: "Kicks ball contact." } },
  { id: 62, label: { id: "Kick Ball 3ft", en: "Kick Ball 3ft" }, desc: { id: "Menendang bola sejauh 3 kaki ke arah depan.", en: "Kicks ball 3ft forward." } },
  { id: 63, label: { id: "Walk Line backward", en: "Walk Line backward" }, desc: { id: "Berjalan mundur 4 kaki tepat di atas garis lurus.", en: "Walk line backward 4ft." } },

  // Item Halaman 51 (Final Standing Series)
  { id: 64, label: { id: "Stand on 1 Foot (23S)", en: "Stand on 1 Foot (23S)" }, desc: { id: "Tangan di pinggang, goyangan < 20°, berdiri selama 5 detik.", en: "Hands on hips, < 20° sway, 5 sec." } },
  { id: 65, label: { id: "Stand on 1 Foot (25S)", en: "Stand on 1 Foot (25S)" }, desc: { id: "Berdiri 1 kaki bergantian masing-masing 6 detik secara stabil.", en: "1 foot then other, 6 sec ea foot." } },
  { id: 66, label: { id: "Stand on 1 Foot (27S)", en: "Stand on 1 Foot (27S)" }, desc: { id: "Setiap kaki, goyangan < 20°, berdiri tenang selama 10 detik.", en: "Each foot, < 20° sway, 10 sec." } }
];

function App() {
  const [lang, setLang] = useState('id');
  const [page, setPage] = useState('landing');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finalResult, setFinalResult] = useState(null);

  const t = content[lang];

  useEffect(() => {
    AOS.init({ duration: 1200, once: false, mirror: true });
  }, []);

  const resetScreening = () => {
    setFinalResult(null);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleScore = (val) => {
    const newAnswers = { ...answers, [pdmsQuestions[currentStep].id]: val };
    setAnswers(newAnswers);
    if (currentStep < pdmsQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const total = Object.values(newAnswers).reduce((a, b) => a + b, 0);
      // LOGIKA IF-ELS SKOR 70
      if (total < 70) {
        setFinalResult({
          level: 1, score: total,
          idTitle: "Mulai dari Level 1", enTitle: "Start Level 1",
          idMsg: "Hasil screening menunjukkan perlunya stimulasi motorik dasar. Fokus pada Level 1 untuk membangun kekuatan ekstremitas atas.",
          enMsg: "Screening results indicate the need for basic motor stimulation. Focus on Level 1 to build upper extremity strength."
        });
      } else {
        setFinalResult({
          level: 2, score: total,
          idTitle: "Siap ke Level 2", enTitle: "Ready for Level 2",
          idMsg: "Luar biasa! Progres motorik stabil. Anak siap untuk simulasi VR aktivitas harian yang lebih kompleks (ADL).",
          enMsg: "Excellent! Stable motor progress. Child is ready for more complex daily activity (ADL) VR simulations."
        });
      }
    }
  };

  if (page === 'screening') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
        <nav className="max-w-4xl mx-auto mb-10 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <button onClick={() => {setPage('landing'); resetScreening();}} className="flex items-center gap-2 font-bold text-indigo-600 hover:-translate-x-2 transition-transform uppercase text-sm tracking-tighter">
            <ArrowLeft size={18} /> {t.screening.back}
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} className="bg-slate-50 px-4 py-2 rounded-xl shadow-inner font-black text-xs flex items-center gap-2 uppercase text-indigo-600 border border-slate-200">
              <Globe size={14} /> {lang}
            </button>
            <div className="bg-white px-6 py-2 rounded-full shadow-sm font-black text-slate-400 text-xs uppercase tracking-widest border border-slate-100">
              {t.screening.progress}: {Math.round(((currentStep + 1) / pdmsQuestions.length) * 100)}%
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl border border-white relative overflow-hidden text-center text-slate-900">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[5rem] -z-0 opacity-50"></div>
          {!finalResult ? (
            <div key={currentStep} className="animate-fade-in relative z-10">
              <span className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full font-black text-xs tracking-widest uppercase italic">Medical Scale PDMS-2</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-8 mb-6 tracking-tighter uppercase leading-tight">{pdmsQuestions[currentStep].label[lang]}</h2>
              <p className="text-slate-500 text-xl md:text-2xl font-medium mb-16 italic max-w-3xl mx-auto leading-relaxed">"{pdmsQuestions[currentStep].desc[lang]}"</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[0, 1, 2].map(v => (
                  <button key={v} onClick={() => handleScore(v)} className="group p-10 rounded-[3rem] border-4 border-slate-50 bg-slate-50 hover:border-indigo-600 hover:bg-white hover:shadow-2xl transition-all duration-300">
                    <span className="text-6xl md:text-8xl font-black block mb-4 text-slate-200 group-hover:text-indigo-600 transition-colors uppercase">{v}</span>
                    <span className="text-xl font-black text-slate-600 uppercase tracking-tighter">{t.screening[`score${v}`]}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in relative z-10 py-10">
              <Trophy className="mx-auto mb-8 text-indigo-600" size={120} />
              <h2 className="text-6xl font-black text-indigo-600 tracking-tighter uppercase mb-6">
                {lang === 'id' ? finalResult.idTitle : finalResult.enTitle}
              </h2>
              <p className="text-4xl font-black text-slate-300 mb-8 italic uppercase tracking-widest">Score: {finalResult.score} / 132</p>
              <p className="text-2xl font-bold text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12 italic">
                "{lang === 'id' ? finalResult.idMsg : finalResult.enMsg}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <button className="bg-orange-500 text-white px-8 py-5 rounded-[2rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-all"><Download size={24} /> {t.screening.pdfBtn}</button>
                <button className="bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-all"><Play size={24} /> {t.screening.gameBtn}</button>
                <button onClick={resetScreening} className="md:col-span-2 lg:col-span-1 bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all">
                   <RefreshCw size={24} /> {t.screening.resultBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white selection:bg-indigo-600 selection:text-white overflow-x-hidden font-sans text-slate-900">
      <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-3xl border-b border-slate-100 py-6 px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-900">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">V</div>
            <span className="text-3xl font-black tracking-tighter italic uppercase">VISCOSITY.</span>
          </div>
          <div className="hidden md:flex items-center gap-10 font-extrabold text-slate-400 uppercase text-[10px] tracking-[0.3em]">
            <a href="#" className="hover:text-indigo-600 transition-colors">{t.nav.home}</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors">{t.nav.about}</a>
            <a href="#innovation" className="hover:text-indigo-600 transition-colors">{t.nav.innovation}</a>
            <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} className="bg-slate-100 text-slate-900 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-200 transition-all border border-slate-200 uppercase tracking-widest">
              <Globe size={16} /> {lang}
            </button>
            <button onClick={() => setPage('screening')} className="bg-orange-500 text-white px-8 py-4 rounded-full shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all">
              {t.nav.start}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center px-10 pt-32 pb-20 max-w-7xl mx-auto overflow-hidden text-slate-900">
        <div className="grid md:grid-cols-12 gap-10 items-center w-full">
          <div className="md:col-span-7 space-y-10 relative z-10" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-orange-50 rounded-full text-orange-500 font-black text-xs tracking-widest uppercase border border-orange-100 shadow-sm">
              <Star size={14} fill="currentColor" /> {t.hero.tag}
            </div>
            <h1 className="text-6xl lg:text-[105px] font-black leading-[0.85] tracking-tighter uppercase">
              {lang === 'id' ? "Kami" : "We"} <br/> 
              <span className="text-indigo-600 italic underline decoration-orange-500/20 decoration-[16px] underline-offset-[12px]">
                {lang === 'id' ? "Menyiapkan" : "Prepare"}
              </span> <br/> 
              {lang === 'id' ? "Anak Anda." : "Your Child."}
            </h1>
            <p className="text-2xl text-slate-500 font-bold max-w-2xl leading-relaxed italic opacity-80 uppercase tracking-tighter border-l-8 border-indigo-100 pl-6">
              {t.hero.desc}
            </p>
            <button onClick={() => setPage('screening')} className="bg-indigo-600 text-white px-14 py-8 rounded-[3rem] font-black text-3xl shadow-2xl hover:scale-110 transition-all flex items-center gap-5 group uppercase">
              {t.hero.btn} <ChevronRight size={32} className="group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
          <div className="md:col-span-5 relative group" data-aos="zoom-in" data-aos-delay="400">
            <div className="absolute inset-0 bg-indigo-600 rounded-[6rem] rotate-12 shadow-2xl -z-10 scale-95 opacity-10 group-hover:rotate-6 transition-transform duration-1000"></div>
            <img src={ViscoLogo} className="rounded-[6rem] shadow-2xl border-[20px] border-white -rotate-6 hover:rotate-0 transition-transform duration-1000 h-[680px] w-full object-cover bg-white shadow-indigo-100" alt="Innovation" />
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-50 py-44 px-10 overflow-hidden text-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-32 items-center text-center md:text-left text-slate-900">
          <div className="grid grid-cols-2 gap-10" data-aos="fade-up">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-50 hover:-translate-y-4 transition-transform duration-500">
              <Heart className="text-orange-500 mb-8 mx-auto md:mx-0 drop-shadow-md" size={60} />
              <h3 className="text-3xl font-black mb-4 italic tracking-tighter uppercase leading-none">{t.about.card1.title}</h3>
              <p className="text-slate-500 font-black text-sm uppercase tracking-widest">{t.about.card1.desc}</p>
            </div>
            <div className="bg-indigo-600 text-white p-12 rounded-[4rem] shadow-2xl border border-white/10 mt-16 hover:-translate-y-4 transition-transform duration-500">
              <Shield className="mb-8 mx-auto md:mx-0 drop-shadow-lg" size={60} />
              <h3 className="text-3xl font-black mb-4 italic tracking-tighter uppercase leading-none text-white">{t.about.card2.title}</h3>
              <p className="opacity-80 font-black text-sm uppercase tracking-widest text-white">{t.about.card2.desc}</p>
            </div>
          </div>
          <div className="space-y-12" data-aos="fade-left">
            <h2 className="text-7xl md:text-[90px] font-black leading-[0.8] tracking-tighter uppercase drop-shadow-sm italic">{t.about.title}</h2>
            <p className="text-3xl text-slate-600 leading-relaxed font-black italic opacity-80 uppercase tracking-tighter">{t.about.desc}</p>
          </div>
        </div>
      </section>

      <section id="innovation" className="py-44 px-10 max-w-7xl mx-auto text-center text-slate-900">
        <h2 className="text-7xl md:text-[95px] font-black mb-32 tracking-tighter uppercase italic leading-none" data-aos="fade-down">{t.innovation.title}</h2>
        <div className="grid md:grid-cols-4 gap-10 text-left">
          {["adaptive", "clinical", "immersive", "realtime"].map((key, i) => (
            <div key={key} data-aos="zoom-in-up" data-aos-delay={i * 200} className="p-16 rounded-[4.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] transition-all duration-500 group text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              <div className={`w-24 h-24 mx-auto rounded-[2.5rem] mb-12 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-500 ${key === 'adaptive' ? 'bg-blue-500' : key === 'clinical' ? 'bg-orange-500' : key === 'immersive' ? 'bg-purple-500' : 'bg-green-500'}`}>
                {key === 'adaptive' ? <Zap size={45} /> : key === 'clinical' ? <CheckCircle2 size={45} /> : key === 'immersive' ? <Activity size={45} /> : <Target size={45} />}
              </div>
              <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-6">{t.innovation[key].title}</h3>
              <p className="text-slate-400 text-sm font-black leading-relaxed uppercase tracking-widest italic">{t.innovation[key].desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER DESAIN ULANG - MINIMALIS & MODERN */}
      <footer className="bg-white pt-24 pb-12 px-10 border-t border-slate-50 relative overflow-hidden text-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-20 items-center mb-20">
          <div className="md:col-span-5 space-y-8" data-aos="fade-right">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">V</div>
                <span className="text-2xl font-black tracking-tighter italic uppercase leading-none">VISCOSITY.</span>
             </div>
             <p className="text-slate-400 font-bold text-sm italic uppercase tracking-widest leading-relaxed max-w-sm">
                {t.footer.desc}
             </p>
          </div>
          
          <div className="md:col-span-7" data-aos="fade-left">
             <div className="bg-slate-50 p-10 md:p-14 rounded-[3.5rem] border border-white shadow-sm flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-slate-900">
                   <h4 className="text-2xl font-black tracking-tighter uppercase italic mb-2 leading-none">{t.footer.newsletter}</h4>
                   <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Dapatkan kabar terbaru mengenai riset VR kami.</p>
                </div>
                <div className="w-full md:w-auto relative flex items-center group">
                   <input type="text" placeholder={t.footer.placeholder} className="bg-white border-none rounded-2xl px-8 py-5 w-full md:w-80 text-xs font-bold italic shadow-sm focus:ring-2 focus:ring-indigo-600 transition-all text-slate-900" />
                   <button className="absolute right-3 p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform active:scale-95">
                      <Send size={18} />
                   </button>
                </div>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-900">
           <p className="text-slate-300 font-black tracking-[0.2em] uppercase text-[9px] italic order-2 md:order-1 text-center md:text-left">
              {t.footer.rights}
           </p>
           <div className="flex gap-10 font-black text-slate-400 uppercase text-[9px] tracking-[0.3em] order-1 md:order-2">
              <a href="#" className="hover:text-indigo-600 transition-colors uppercase">{t.nav.home}</a>
              <a href="#about" className="hover:text-indigo-600 transition-colors uppercase">{t.nav.about}</a>
              <a href="#innovation" className="hover:text-indigo-600 transition-colors uppercase">{t.nav.innovation}</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;