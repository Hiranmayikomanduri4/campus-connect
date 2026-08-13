import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, MapPin, Clock, Ticket, CheckCircle, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRCodePassProps {
  eventTitle: string;
  venue: string;
  date: string;
  time: string;
  studentName: string;
  studentEmail: string;
  ticketCode: string;
  onClose: () => void;
}

export const QRCodePass: React.FC<QRCodePassProps> = ({
  eventTitle,
  venue,
  date,
  time,
  studentName,
  studentEmail,
  ticketCode,
  onClose
}) => {
  React.useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        {/* Pass Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white text-center relative">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Official Event Pass</span>
          </div>
          <h3 className="text-xl font-bold leading-tight line-clamp-2">{eventTitle}</h3>
          <p className="text-xs text-indigo-100 mt-1">CampusConnect Digital E-Ticket</p>
        </div>

        {/* Ticket Details */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-slate-700/50 rounded-2xl border border-indigo-100 dark:border-slate-600">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Attendee Name</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white">{studentName}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{studentEmail}</p>
            </div>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 space-x-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 rounded-lg">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Confirmed</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>{time}</span>
            </div>
            <div className="col-span-2 flex items-center space-x-2 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span className="truncate">{venue}</span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="p-3 bg-white rounded-xl shadow-md mb-2">
              <QRCodeSVG
                value={`CAMPUSCONNECT-TICKET:${ticketCode}:${eventTitle}:${studentName}`}
                size={140}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
              {ticketCode}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Scan at entry gate for verification</p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => alert(`Ticket pass code ${ticketCode} saved!`)}
              className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition"
            >
              <Download className="w-4 h-4" />
              <span>Save Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
