import useCounter from '../hooks/useCounter.js';

export default function CounterCard({ value, suffix, label }) {
  const numericValue = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value;
  const count = useCounter(numericValue);
  const displaySuffix = suffix || (typeof value === 'string' ? value.replace(/[0-9]/g, '').trim() : '');
  return (
    <div className="glass rounded-2xl p-5 shadow-premium">
      <div className="text-3xl font-black text-primary dark:text-white">{count}{displaySuffix}</div>
      <div className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-300">{label}</div>
    </div>
  );
}
