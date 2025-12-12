import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Calendar as CalendarIcon, LayoutGrid, CheckSquare, List, Plus, Home, Pencil, Inbox, Users, Package } from 'lucide-react';

export function PlanningCalendar() {
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear] = useState(2025);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'list'>('month');
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'tasks'>('tasks');
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
  
  const days = [];
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, type: 'prev' });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, type: 'current' });
  }
  // Next month days to fill the grid
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ day: i, type: 'next' });
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
  };
  
  // Mock events
  const events = [
    { day: 10, label: 'Design Review', color: 'bg-purple-500' },
    { day: 11, label: 'Presentation', color: 'bg-violet-500' },
    { day: 11, label: 'Phone Call', color: 'bg-indigo-500' },
    { day: 15, label: 'Team Meeting', color: 'bg-purple-400' },
    { day: 18, label: 'Project Deadline', color: 'bg-fuchsia-500' },
    { day: 22, label: 'Client Review', color: 'bg-purple-600' }
  ];
  
  const hasEvent = (day: number) => {
    return events.filter(e => e.day === day);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 max-w-md mx-auto">
      {/* Phone frame for better presentation */}
      <div className="bg-white/80 backdrop-blur-sm min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 px-6 py-4 shadow-lg">
          <div className="flex items-center gap-3">
            <button className="text-white/90 hover:text-white transition">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl text-white">Planily</h1>
          </div>
        </div>
        
        {/* Content with better spacing */}
        <div className="px-6 py-6 space-y-6">
          {/* My Agenda Dropdown - more spacious */}
          <button className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center justify-between hover:border-purple-300 transition shadow-sm">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-purple-600" />
              <span className="text-black">My Agenda</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
          
          {/* Dashboard/Tasks toggle - better spacing */}
          <div className="flex gap-6">
            <button
              onClick={() => setSelectedTab('dashboard')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition ${
                selectedTab === 'dashboard' 
                  ? 'border-gray-800 text-black' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setSelectedTab('tasks')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition ${
                selectedTab === 'tasks' 
                  ? 'border-purple-600 text-purple-600' 
                  : 'border-transparent text-gray-500'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Tasks</span>
            </button>
          </div>
          
          {/* View mode selector - improved spacing and design */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('day')}
              className={`flex-1 py-2.5 px-3 rounded-lg border text-sm transition ${
                viewMode === 'day'
                  ? 'bg-white border-purple-600 text-purple-600'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`flex-1 py-2.5 px-3 rounded-lg border text-sm transition ${
                viewMode === 'week'
                  ? 'bg-white border-purple-600 text-purple-600'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`flex-1 py-2.5 px-3 rounded-lg border text-sm transition ${
                viewMode === 'month'
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Month
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 py-2.5 px-3 rounded-lg border text-sm transition ${
                viewMode === 'list'
                  ? 'bg-white border-purple-600 text-purple-600'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <List className="w-4 h-4 inline mr-1" />
              List
            </button>
          </div>
        </div>
        
        {/* Calendar section with better padding */}
        <div className="px-6 pb-24">
          <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 rounded-2xl p-5 shadow-2xl">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handlePrevMonth}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-white">{months[currentMonth]} {currentYear}</span>
              <button 
                onClick={handleNextMonth}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Calendar grid */}
            <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-inner">
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-purple-700 text-xs py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days with better spacing */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((dayObj, index) => {
                  const dayEvents = dayObj.type === 'current' ? hasEvent(dayObj.day) : [];
                  const isToday = dayObj.day === 12 && dayObj.type === 'current';
                  const hasEvents = dayEvents.length > 0;
                  
                  return (
                    <div
                      key={index}
                      className={`
                        relative aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200
                        ${dayObj.type === 'current' ? 'text-gray-900' : 'text-gray-300'}
                        ${isToday ? 'bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg scale-105' : ''}
                        ${hasEvents && !isToday ? 'bg-gradient-to-br from-purple-100 to-violet-100 ring-2 ring-purple-300' : ''}
                        ${!isToday && !hasEvents ? 'hover:bg-purple-50 cursor-pointer' : ''}
                      `}
                    >
                      <span className={`${hasEvents && !isToday ? 'font-semibold' : ''}`}>{dayObj.day}</span>
                      {hasEvents && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                          <span className="text-white text-[9px]">{dayEvents.length}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom navigation - fixed with proper spacing */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200">
          <div className="flex justify-around items-center py-3 px-4">
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-purple-600 transition">
              <CheckSquare className="w-5 h-5" />
              <span className="text-xs">Planily</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition">
              <Pencil className="w-5 h-5" />
              <span className="text-xs">Publish</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition">
              <Inbox className="w-5 h-5" />
              <span className="text-xs">Inbox</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition">
              <Users className="w-5 h-5" />
              <span className="text-xs">Teams</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 transition">
              <Package className="w-5 h-5" />
              <span className="text-xs">Storage</span>
            </button>
          </div>
        </div>
        
        {/* Floating Action Button */}
        <button className="fixed bottom-24 right-8 w-14 h-14 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all hover:scale-110">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}