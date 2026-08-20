import React, { useState } from 'react';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: { text: string; tag: string }) => void;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote
}) => {
  const [noteText, setNoteText] = useState('');
  const [tag, setTag] = useState('LEAD');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote({ text: noteText, tag });
    setNoteText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 rounded-3xl max-w-md w-full border border-white/10 shadow-2xl p-6 animate-fade-in">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-400">edit_note</span>
            <h4 className="font-bold text-base text-white">Add Investigation Note</h4>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-400 block mb-2">Tag / Category</label>
            <div className="flex flex-wrap gap-2">
              {['LEAD', 'FLAGGED', 'EVIDENCE', 'SURVEILLANCE'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                    tag === t
                      ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/20'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-400 block mb-2">Note Content</label>
            <textarea
              required
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Record forensic observation, correlation lead, or warrant details..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-white placeholder:text-slate-500 leading-relaxed resize-none text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-full font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-xs shadow-xl transition-all"
            >
              Save to Case Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
