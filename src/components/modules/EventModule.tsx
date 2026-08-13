import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Ticket, 
  Plus, 
  Search, 
  Filter, 
  X, 
  CheckCircle, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { QRCodePass } from '../common/QRCodePass';
import { CampusEvent } from '../../types';

export const EventModule: React.FC = () => {
  const { currentUser } = useAuth();
  const { events, eventRegistrations, createEvent, registerForEvent, cancelEventRegistration } = useData();

  const isCoordinatorOrAdmin = currentUser?.role === 'coordinator' || currentUser?.role === 'admin';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Create Event State
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('Main Auditorium & Innovation Lab');
  const [date, setDate] = useState('2026-09-01');
  const [time, setTime] = useState('10:00 AM');
  const [category, setCategory] = useState<CampusEvent['category']>('Hackathon');
  const [deadline, setDeadline] = useState('2026-08-30');
  const [seats, setSeats] = useState(250);
  const [speakers, setSpeakers] = useState('Dr. Vikramaditya Rao, Sonia Kapoor');
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000');

  // Active Ticket Pass State
  const [passData, setPassData] = useState<{
    eventTitle: string;
    venue: string;
    date: string;
    time: string;
    studentName: string;
    studentEmail: string;
    ticketCode: string;
  } | null>(null);

  const categories = ['All', 'Hackathon', 'Workshop', 'Cultural', 'Sports', 'Seminar'];

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent({
      title,
      description,
      venue,
      date,
      time,
      category,
      deadline,
      seats,
      speakers: speakers.split(',').map(s => s.trim()),
      banner,
      organizerId: currentUser?.uid || 'coord-1',
      organizerName: currentUser?.name || 'Coordinator',
      isRegistrationOpen: true
    });
    setIsCreating(false);
    setTitle('');
    setDescription('');
  };

  const handleRegister = (evt: CampusEvent) => {
    if (!currentUser) return;
    const success = registerForEvent(evt.id, currentUser.uid, currentUser.name, currentUser.email);
    if (success) {
      const reg = eventRegistrations.find(r => r.eventId === evt.id && r.studentId === currentUser.uid);
      setPassData({
        eventTitle: evt.title,
        venue: evt.venue,
        date: evt.date,
        time: evt.time,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        ticketCode: reg?.ticketCode || `CC-${evt.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`
      });
    } else {
      alert('Registration closed or event seats full!');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            <span>Campus Events & Hackathons</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse upcoming workshops, cultural festivals, tech summits, and generate instant entry passes
          </p>
        </div>

        {isCoordinatorOrAdmin && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/20 transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campus Event</span>
          </button>
        )}
      </div>

      {/* QR Ticket Pass Modal */}
      {passData && <QRCodePass {...passData} onClose={() => setPassData(null)} />}

      {/* Create Event Form Modal */}
      {isCreating && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-purple-500 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Organize New Event</h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateEvent} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. HackCampus 2026"
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                >
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Details, prize pool, schedule..."
                required
                className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={e => setVenue(e.target.value)}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date & Time</label>
                <div className="grid grid-cols-2 gap-1">
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    className="py-2 px-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    required
                    className="py-2 px-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Seats</label>
                <input
                  type="number"
                  value={seats}
                  onChange={e => setSeats(Number(e.target.value))}
                  required
                  className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-xl text-xs font-bold shadow-md transition"
              >
                Publish Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events, venue..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(evt => {
          const isRegistered = eventRegistrations.some(r => r.eventId === evt.id && r.studentId === currentUser?.uid);
          const regRecord = eventRegistrations.find(r => r.eventId === evt.id && r.studentId === currentUser?.uid);
          const isFull = evt.registeredCount >= evt.seats;

          return (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-44 overflow-hidden">
                  <img src={evt.banner} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                    {evt.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">{evt.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">{evt.description}</p>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>{evt.date} at {evt.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      <span>{evt.registeredCount} / {evt.seats} Seats Registered</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                {isRegistered ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        setPassData({
                          eventTitle: evt.title,
                          venue: evt.venue,
                          date: evt.date,
                          time: evt.time,
                          studentName: currentUser?.name || 'Student',
                          studentEmail: currentUser?.email || 'email@edu',
                          ticketCode: regRecord?.ticketCode || 'CC-TICKET-99'
                        })
                      }
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-1"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>View QR Pass</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRegister(evt)}
                    disabled={isFull}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                      isFull
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20'
                    }`}
                  >
                    {isFull ? 'Seats Full' : 'Register Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
