import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chemistryData } from '../data/chemistryData';

export const useProgressStore = create(
  persist(
    (set, get) => ({
      masteredIds: [], // 已掌握的 ID 列表
      
      toggleMastered: (id) => {
        const current = get().masteredIds;
        if (current.includes(id)) {
          set({ masteredIds: current.filter(i => i !== id) });
        } else {
          set({ masteredIds: [...current, id] });
        }
      },

      // 智能待办：找出前置依赖已满足，但自己还没掌握的卡片
      getSmartTodos: () => {
        const mastered = get().masteredIds;
        return chemistryData.filter(card => {
          if (mastered.includes(card.id)) return false; 
          const depsReady = card.dependencies.every(depId => mastered.includes(depId));
          return depsReady;
        });
      },

      // 检查某张卡片的依赖是否满足
      checkDependencies: (cardId) => {
        const card = chemistryData.find(c => c.id === cardId);
        if (!card) return { ready: true, missing: [] };
        const mastered = get().masteredIds;
        const missing = card.dependencies.filter(depId => !mastered.includes(depId));
        return { ready: missing.length === 0, missing };
      }
    }),
    { name: 'study-bridge-progress' }
  )
);
