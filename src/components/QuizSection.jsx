import { useState } from 'react';

export default function QuizSection({ quiz, onPass }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const q = quiz[currentQ];
  const isCorrect = selected === q.answer;

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      onPass(); 
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-3">📝 快速验证 ({currentQ + 1}/{quiz.length})</h3>
      <p className="text-slate-700 mb-4">{q.q}</p>
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => { setSelected(idx); setShowResult(true); }}
            disabled={showResult}
            className={`w-full text-left p-3 rounded-lg border transition ${
              showResult 
                ? (idx === q.answer ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : (idx === selected ? 'bg-red-100 border-red-300 text-red-800' : 'bg-white border-slate-200'))
                : 'bg-white border-slate-200 hover:border-indigo-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className={`p-3 rounded-lg mb-4 text-sm ${isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {isCorrect ? '✅ 正确！' : '❌ 错误。'} {q.explain}
        </div>
      )}

      {showResult && (
        isCorrect ? (
          <button onClick={handleNext} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            {currentQ < quiz.length - 1 ? '下一题' : '完成验证'}
          </button>
        ) : (
          <button onClick={handleRetry} className="w-full bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 transition">
            🔄 重新尝试
          </button>
        )
      )}
    </div>
  );
}
