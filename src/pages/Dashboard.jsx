import { Link } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import { chemistryData } from '../data/chemistryData';

export default function Dashboard() {
  const smartTodos = useProgressStore(state => state.getSmartTodos());
  const masteredIds = useProgressStore(state => state.masteredIds);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Study Bridge</h1>
        <p className="text-slate-500 mt-2">你的专属学习急救包</p>
      </header>

      <section className="mb-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
          智能待办 (Smart Todos)
        </h2>
        {smartTodos.length === 0 ? (
          <p className="text-slate-500 text-center py-4">🎉 太棒了！你已经掌握了所有前置知识。</p>
        ) : (
          <div className="space-y-2">
            {smartTodos.slice(0, 3).map(card => (
              <Link 
                key={card.id} 
                to={`/card/${card.id}`}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 transition"
              >
                <div>
                  <p className="font-medium text-slate-800">{card.title}</p>
                  <p className="text-xs text-slate-500">{card.chapter}</p>
                </div>
                <span className="text-indigo-600 text-sm font-medium">去补漏 →</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">全局进度</h2>
        <div className="flex items-center mb-2">
          <span className="text-sm text-slate-600 mr-3">已掌握 {masteredIds.length} / {chemistryData.length}</span>
          <div className="flex-1 bg-slate-100 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${(masteredIds.length / chemistryData.length) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          {chemistryData.map(card => (
            <Link 
              key={card.id} 
              to={`/card/${card.id}`}
              className={`flex items-center justify-between p-3 rounded-lg border transition ${masteredIds.includes(card.id) ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}
            >
              <span className={`font-medium ${masteredIds.includes(card.id) ? 'text-emerald-700' : 'text-slate-700'}`}>
                {masteredIds.includes(card.id) ? '✅' : '⬜'} {card.title}
              </span>
              <span className="text-xs text-slate-400">{card.chapter}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
