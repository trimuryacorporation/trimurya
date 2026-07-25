import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-4 w-[min(92vw,360px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-premium dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-black text-primary dark:text-white">Trimurya AI Assistant</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Online for service guidance</p>
            </div>
            <button className="focus-ring rounded-lg p-2" onClick={() => setOpen(false)} aria-label="Close chat"><FiX /></button>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Hello. I can help you explore AI, software, hiring, BPO, telecom, and media solutions. Share your requirement and our team will respond quickly.
          </div>
          <input className="focus-ring mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-950" placeholder="Type your question..." />
        </div>
      )}
      <button onClick={() => setOpen((value) => !value)} className="focus-ring grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/30" aria-label="Open AI chat assistant">
        AI
      </button>
    </div>
  );
}
