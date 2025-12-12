import { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, User, Mail, MapPin, Plane, BarChart3 } from 'lucide-react';

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear] = useState(2021);
  
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
  };
  
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone mockup */}
      <div className="bg-white/20 backdrop-blur-md rounded-[3rem] p-6 shadow-2xl border border-white/30">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          {/* Header */}
          <h1 className="text-center text-blue-600">LOREM IPSUM</h1>
          
          {/* Event items */}
          <div className="space-y-2">
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between border border-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-400/30 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-blue-700">Lorem</span>
              </div>
              <span className="text-blue-600">23.01.2021</span>
            </div>
            
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between border border-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-400/30 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-blue-700">Ipsum</span>
              </div>
              <span className="text-blue-600">28.01.2021</span>
            </div>
          </div>
          
          {/* Month selector */}
          <div className="bg-gradient-to-r from-cyan-300 to-blue-400 rounded-2xl p-3 flex items-center justify-between">
            <button 
              onClick={handlePrevMonth}
              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white tracking-wider">{months[currentMonth]}</span>
            <button 
              onClick={handleNextMonth}
              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Calendar */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                <div key={day} className="text-center text-blue-700 text-xs py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg
                    ${day ? 'text-blue-700 hover:bg-blue-400/30 cursor-pointer transition' : ''}
                    ${day === 23 || day === 28 ? 'bg-blue-400/40 font-semibold' : ''}
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom button */}
          <button className="w-full bg-gradient-to-r from-cyan-300 to-blue-400 text-white py-3 rounded-2xl shadow-lg hover:shadow-xl transition">
            LOREM IPSUM
          </button>
        </div>
        
        {/* Bottom navigation */}
        <div className="flex justify-around items-center mt-6 pt-4 border-t border-white/20">
          <button className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition">
            <Mail className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition">
            <MapPin className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-white transition">
            <Plane className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition">
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
