import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <nav className="flex justify-between items-center py-6 px-10 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-visco-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">V</div>
        <span className="text-2xl font-bold text-slate-900 tracking-tight italic">VISCOSITY.</span>
      </div>
      <div className="hidden md:flex items-center space-x-10 font-bold text-slate-600">
        <a href="#about" className="hover:text-visco-blue transition-colors">Tentang Kami</a>
        <a href="#innovation" className="hover:text-visco-blue transition-colors">Inovasi</a>
        <a href="#screening" className="bg-visco-blue text-white px-8 py-3 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">Mulai Screening</a>
      </div>
      <button className="md:hidden text-slate-900"><Menu /></button>
    </nav>
  );
}