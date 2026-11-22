export function OperationHighlight({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <p className="mt-4 inline-block -rotate-1 rounded-[0.7rem_1.1rem_0.8rem_1.2rem] border-2 border-ink bg-paper px-4 py-2 font-mono text-lg font-black tracking-wide text-ink shadow-hard">
      {text}
    </p>
  );
}
