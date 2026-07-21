import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { chemistryData } from '../data/chemistryData';
import { useProgressStore } from '../store/progressStore';
import DependencyGate from '../components/DependencyGate';
import QuizSection from '../components/QuizSection';

export default function CardDetail() {
  const { cardId } = useParams();
  const card = chemistryData.find(c => c.id === cardId);
  const { masteredIds, toggleMastered } = useProgressStore();
  const [quizPassed, setQuizPassed] = useState(false);
  
  const isMastered = masteredIds.includes(cardId);

  if (!card) return <div className="p-8 text-center">卡片不存在</div>;

  return (
    // 添加 key={cardId}：切换卡片时强制重新挂载组件并重置 quizPassed 状态
    <div key={cardId} className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/" className="text-indigo-600 hover:underline text-sm mb-4 inline-block">← 返回主页</Link>
      
      <DependencyGate cardId={cardId}>
        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <header className="mb-6">
            <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded mb-2 inline-block">{card.chapter}</span>
            <h1 className="text-2xl font-bold text-slate-800">{card.title}</h1>
          </header>

          {card.formula && (
            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-center">
              <span className="text-xl font-mono font-bold text-indigo-700">{card.formula}</span>
              {card.unit && <span className="block text-sm text-slate-500 mt-1">单位: {card.unit}</span>}
            </div>
          )}

          {card.symbols && card.symbols.length > 0 && (
            <div className="mb-6 space-y-2">
              {card.symbols.map((sym, i) => (
                <div key={i} className="flex items-baseline">
                  <span className="font-mono font-bold text-indigo-600 w-12">{sym.symbol}</span>
                  <span className="text-slate-600 text-sm">{sym.meaning}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
            <p className="text-xs font-bold text-emerald-700 mb-1">💡 人话版</p>
            <p className="text-sm text-slate-700">{card.humanLang}</p>
          </div>

          <div className="mb-6 p-4 bg-amber-50 rounded-lg">
            <p className="text-xs font-bold text-amber-700 mb-1">⚠️ 考点预判</p>
            <p className="text-sm text-slate-700">{card.examFocus}</p>
          </div>

          {!isMastered && (
            <QuizSection quiz={card.quiz} onPass={() => setQuizPassed(true)} />
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button 
              onClick={() => toggleMastered(cardId)}
              disabled={!isMastered && !quizPassed && card.quiz && card.quiz.length > 0}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition ${
                isMastered 
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                  : (quizPassed || !card.quiz || card.quiz.length === 0)
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isMastered ? '✅ 已掌握 (点击重置)' : '标记为已掌握'}
            </button>
          </div>
        </article>
      </DependencyGate>
    </div>
  );
}
