import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Plus, Home, CheckSquare, Edit3, MessageCircle, Users, Archive, MoreHorizontal, Menu, Calendar, LayoutGrid, List, Columns, BarChart3, Table2, Clock, AlertCircle, Check, Circle, Flag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
  id: number;
  title: string;
  date: string;
  status: 'done' | 'todo';
  assignees: number;
  gradient: string;
  category: 'overdue' | 'tomorrow';
  daysOverdue?: number;
}

export function PlanningCalendar() {
  const [viewMode, setViewMode] = useState<'month' | 'list' | 'kanban' | 'gantt' | 'table'>('list');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks'>('tasks');
  
  const tasksByCategory = {
    overdue: [
      {
        id: 1,
        title: 'd',
        date: '12/10/2025',
        status: 'done' as const,
        assignees: 0,
        gradient: 'from-emerald-400 to-teal-500',
        category: 'overdue' as const,
        daysOverdue: 5
      },
      {
        id: 2,
        title: 'Prueba1',
        date: '12/10/2025',
        status: 'done' as const,
        assignees: 1,
        gradient: 'from-emerald-400 to-teal-500',
        category: 'overdue' as const,
        daysOverdue: 5
      },
      {
        id: 3,
        title: 'prueba 4',
        date: '12/11/2025',
        status: 'todo' as const,
        assignees: 1,
        gradient: 'from-rose-400 to-pink-500',
        category: 'overdue' as const,
        daysOverdue: 4
      }
    ],
    tomorrow: [
      {
        id: 4,
        title: 'nuueva',
        date: '12/16/2025',
        status: 'todo' as const,
        assignees: 1,
        gradient: 'from-orange-400 to-rose-400',
        category: 'tomorrow' as const
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-purple-600 uppercase tracking-wider">Workspace</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 group"
              >
                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Astrid's Workspace
                </span>
                <ChevronDown className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition" />
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-300 hover:shadow-xl hover:shadow-purple-400 transition-all"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
          
          <h1 className="text-3xl text-gray-900 mb-4">Planily</h1>
          
          {/* My Agenda Dropdown */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition border border-purple-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">My Agenda</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
        
        {/* Tabs */}
        <div className="px-5 py-3 bg-white border-b border-gray-100">
          <div className="flex gap-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 pb-2 relative transition-colors ${
                activeTab === 'dashboard' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm">Dashboard</span>
              {activeTab === 'dashboard' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                />
              )}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 pb-2 relative transition-colors ${
                activeTab === 'tasks' ? 'text-purple-600' : 'text-gray-400'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span className="text-sm">Tasks</span>
              {activeTab === 'tasks' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* View Mode Selector */}
        <div className="px-5 py-4 bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'month', label: 'Month', icon: Calendar },
              { id: 'list', label: 'List', icon: List },
              { id: 'kanban', label: 'Kanban', icon: Columns },
              { id: 'gantt', label: 'Gantt', icon: BarChart3 },
              { id: 'table', label: 'Table', icon: Table2 }
            ].map((mode) => (
              <motion.button
                key={mode.id}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setViewMode(mode.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  viewMode === mode.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-300'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <mode.icon className="w-4 h-4" />
                <span className="text-sm">{mode.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Tasks Content */}
        <div className="px-5 py-6 pb-32 space-y-8">
          {/* Overdue Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-md shadow-red-200">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg text-gray-900">Overdue</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              <span className="text-xs text-gray-500 bg-red-50 px-3 py-1 rounded-full">
                {tasksByCategory.overdue.length}
              </span>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {tasksByCategory.overdue.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${task.gradient} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all relative overflow-hidden`}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }} />
                      </div>
                      
                      {/* Overdue badge */}
                      {task.daysOverdue && task.status === 'todo' && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                            <span className="text-xs text-white">-{task.daysOverdue}d</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="relative z-10 flex items-start gap-3">
                        {/* Checkbox */}
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className={`w-7 h-7 rounded-xl border-2 border-white flex items-center justify-center cursor-pointer flex-shrink-0 mt-0.5 shadow-md ${
                            task.status === 'done' ? 'bg-white' : 'bg-white/20 backdrop-blur-sm'
                          }`}
                        >
                          {task.status === 'done' && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                            >
                              <Check className={`w-4 h-4 ${
                                task.status === 'done' && task.gradient.includes('emerald')
                                  ? 'text-emerald-600'
                                  : 'text-rose-600'
                              }`} />
                            </motion.div>
                          )}
                        </motion.div>
                        
                        {/* Task content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-white mb-2 ${
                            task.status === 'done' ? 'line-through opacity-80' : ''
                          }`}>
                            {task.title}
                          </h3>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-white/90">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="text-sm">{task.date}</span>
                            </div>
                            
                            {task.assignees > 0 && (
                              <div className="flex items-center gap-1.5 text-white/90">
                                <User className="w-3.5 h-3.5" />
                                <span className="text-sm">{task.assignees}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Status badge */}
                        <div className={`px-3 py-1 rounded-full text-xs backdrop-blur-md border border-white/30 ${
                          task.status === 'done'
                            ? 'bg-white/30 text-white'
                            : 'bg-white/20 text-white'
                        }`}>
                          {task.status === 'done' ? 'Done' : 'To Do'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Tomorrow Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md shadow-orange-200">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg text-gray-900">Tomorrow</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              <span className="text-xs text-gray-500 bg-orange-50 px-3 py-1 rounded-full">
                {tasksByCategory.tomorrow.length}
              </span>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {tasksByCategory.tomorrow.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${task.gradient} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all relative overflow-hidden`}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }} />
                      </div>
                      
                      <div className="relative z-10 flex items-start gap-3">
                        {/* Checkbox */}
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className="w-7 h-7 rounded-xl border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer flex-shrink-0 mt-0.5 shadow-md"
                        >
                        </motion.div>
                        
                        {/* Task content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white mb-2">{task.title}</h3>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-white/90">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="text-sm">{task.date}</span>
                            </div>
                            
                            {task.assignees > 0 && (
                              <div className="flex items-center gap-1.5 text-white/90">
                                <User className="w-3.5 h-3.5" />
                                <span className="text-sm">{task.assignees}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Status badge */}
                        <div className="px-3 py-1 rounded-full text-xs bg-white/20 backdrop-blur-md text-white border border-white/30">
                          To Do
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl">
          <div className="flex justify-around items-center py-2.5 px-2">
            {[
              { icon: Home, label: 'Home', active: false },
              { icon: CheckSquare, label: 'Planify', active: true },
              { icon: Edit3, label: 'Publish', active: false },
              { icon: MessageCircle, label: 'Inbox', active: false },
              { icon: Users, label: 'Teams', active: false },
              { icon: Archive, label: 'Storage', active: false }
            ].map((item, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1 min-w-0 relative"
              >
                <motion.div 
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                    item.active 
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                {item.active && (
                  <motion.div
                    layoutId="activeNav"
                    className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* FAB */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 z-50"
        >
          <Plus className="w-7 h-7 text-white" />
        </motion.button>
      </div>
    </div>
  );
}