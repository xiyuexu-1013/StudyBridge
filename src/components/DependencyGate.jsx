import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/progressStore';
import { chemistryData } from '../data/chemistryData';

export default function DependencyGate({ cardId, children }) {
  const navigate = useNavigate();
  // 优化：分开提取函数，避免对象引用变化触发重复渲染
  const checkDependencies = useProgressStore(state => state.checkDependencies);
  const { ready, missing } = checkDependencies(cardId);

  if (ready) return children;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 rounded-2xl border border-amber-200">
        <div className="text-amber-600 text-xl font-bold mb-2">🚧 前置知识未解锁</div>
        <p className="text-slate-600 text-center mb-4">请先掌握以下知识点：</p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {missing.map(depId => {
            const depCard = chemistryData.find(c => c.id === depId);
            return (
              <button 
                key={depId}
                onClick={() => navigate(`/card/${depId}`)}
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-2 px-4 rounded-lg transition"
              >
                👉 去学：{depCard ? depCard.title : depId}
              </button>
            );
          })}
        </div>
      </div>
      <div className="filter blur-sm pointer-events-none select-none opacity-50">
        {children}
      </div>
    </div>
  );
}
