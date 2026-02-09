export default function Hero({ onStartScreening }) {
  return (
    <section className="relative bg-white pt-20 pb-32 px-6 overflow-hidden">
      {/* Background Decor ala Startup */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-visco-soft rounded-l-[10rem] -z-0"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 space-y-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-visco-blue/10 rounded-full text-visco-blue font-bold text-sm shadow-sm">
            ✨ SOLUSI REHABILITASI CERREBRAL PALSY 2026
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
            We Prepare Your <br/> <span className="text-visco-blue italic underline decoration-visco-orange/30">Child For Life.</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-lg leading-relaxed font-medium">
            VISCOSITY hadir sebagai program latihan berbasis VR untuk meningkatkan fungsi motorik tangan melalui aktivitas harian yang menyenangkan[cite: 1, 18].
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={onStartScreening}
              className="bg-visco-orange text-white px-10 py-5 rounded-button font-bold text-lg shadow-2xl hover:scale-105 transition-all active:scale-95">
              Mulai Screening Sekarang
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center">
          <div className="relative w-full max-w-md h-[500px]">
            <div className="absolute inset-0 bg-visco-blue rounded-card rotate-6 shadow-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?auto=format&fit=crop&q=80&w=800" 
              alt="Anak VR" 
              className="absolute inset-0 w-full h-full object-cover rounded-card -rotate-3 border-8 border-white shadow-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}