import { Link } from 'react-router-dom';
import {
  Dumbbell,
  TrendingUp,
  Zap,
  ShieldCheck,
  Footprints,
  Heart,
  Activity,
  PersonStanding,
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const categories = [
  { name: 'Picioare', icon: Footprints, desc: 'Genuflexiuni, presă, fandări' },
  { name: 'Piept', icon: Dumbbell, desc: 'Împins, flotări, fluturări' },
  { name: 'Spate', icon: Activity, desc: 'Tracțiuni, ramat, hyperextensii' },
  { name: 'Umeri', icon: PersonStanding, desc: 'Împins, ridicări, face pull' },
  { name: 'Brațe', icon: Zap, desc: 'Biceps, triceps, dips' },
  { name: 'Cardio', icon: Heart, desc: 'Alergare, ciclism, înot' },
];

function Landing() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const username = useAuthStore((state) => state.username);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#F5F5F4]">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <span className="text-xl font-black tracking-tight">
          FIT<span className="text-[#FF6B1A]">TRACK</span>
        </span>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm text-[#A1A1AA] hover:text-white transition"
            >
              Salut,{' '}
              <span className="text-white font-semibold">{username}</span>
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-semibold px-5 py-2.5 rounded bg-[#FF6B1A] text-[#0E0E10] hover:bg-[#ff7f3d] transition flex items-center gap-2"
            >
              Dashboard →
            </Link>
            <button
              onClick={logout}
              className="text-sm text-[#A1A1AA] hover:text-white transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-[#A1A1AA] hover:text-white transition px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold px-5 py-2.5 rounded bg-[#FF6B1A] text-[#0E0E10] hover:bg-[#ff7f3d] transition"
            >
              Înregistrare
            </Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#FF6B1A] text-sm font-bold tracking-widest uppercase mb-4">
            Antrenamentul tău, măsurat
          </p>
          <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
            CORP PUTERNIC
            <br />
            PROGRES REAL
          </h1>
          <p className="mt-6 text-[#A1A1AA] text-lg max-w-md">
            Notează antrenamentele, urmărește greutățile ridicate în timp și
            vezi-ți evoluția în grafice clare — nu în impresii vagi.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="px-7 py-3.5 rounded bg-[#FF6B1A] text-[#0E0E10] font-bold hover:bg-[#ff7f3d] transition flex items-center gap-2"
            >
              {isAuthenticated ? 'Mergi la Dashboard' : 'Începe acum'} →
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rotate-45 border-2 border-[#FF6B1A] rounded-3xl" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#1F1F23] to-[#0E0E10] border border-[#2A2A2E] flex items-center justify-center">
            <Dumbbell
              className="w-28 h-28 md:w-36 md:h-36 text-[#FF6B1A]"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </section>

      {/* DE CE FITTRACK */}
      <section className="bg-[#141416] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[#FF6B1A] text-sm font-bold tracking-widest uppercase mb-2">
            Avantaje
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            DE CE FITTRACK?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-[#1F1F23] flex items-center justify-center shrink-0">
                <Dumbbell className="w-6 h-6 text-[#FF6B1A]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Antrenamente complete</h3>
                <p className="text-[#A1A1AA] text-sm">
                  Seturi, repetări, greutăți — pentru exerciții de forță sau
                  cardio.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-[#1F1F23] flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#FF6B1A]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Progres vizual</h3>
                <p className="text-[#A1A1AA] text-sm">
                  Grafice cu evoluția greutății ridicate și frecvența
                  antrenamentelor.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-[#1F1F23] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#FF6B1A]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Datele tale, private</h3>
                <p className="text-[#A1A1AA] text-sm">
                  Fiecare cont vede doar propriile antrenamente. Nimic partajat.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded bg-[#1F1F23] flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#FF6B1A]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Simplu și rapid</h3>
                <p className="text-[#A1A1AA] text-sm">
                  Deschizi, notezi antrenamentul, închizi. Fără complicații.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORII */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-[#FF6B1A] text-sm font-bold tracking-widest uppercase mb-2">
            Ce poți urmări
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            CATEGORII DE ANTRENAMENT
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="bg-[#141416] border border-[#2A2A2E] rounded-lg p-6 hover:border-[#FF6B1A] transition"
                >
                  <div className="w-12 h-12 rounded bg-[#1F1F23] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#FF6B1A]" />
                  </div>
                  <h3 className="font-bold mb-1">{cat.name}</h3>
                  <p className="text-[#A1A1AA] text-sm">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
