export function OperationHighlight({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <p className="mt-4 inline-block rounded-xl border border-white/80 bg-white/80 px-4 py-2 font-mono text-lg font-black tracking-wide text-slate-800 shadow-sm">
      {text}
    </p>
  );
}
