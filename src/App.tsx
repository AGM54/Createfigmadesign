import { Calendar } from './components/Calendar';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-blue-400 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative bubbles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl"></div>
      <div className="absolute top-20 right-20 w-48 h-48 bg-cyan-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-400/25 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-cyan-300/20 rounded-full blur-2xl"></div>
      
      <Calendar />
    </div>
  );
}
