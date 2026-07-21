export const chemistryData = [
  {
    id: 'density',
    title: '密度',
    chapter: 'Unit 1: Density',
    formula: 'D = m / V',
    symbols: [{symbol: 'D', meaning: '密度'}, {symbol: 'm', meaning: '质量'}, {symbol: 'V', meaning: '体积'}],
    unit: 'g/cm³',
    humanLang: '同样大小的一块东西，有多“紧实”。铁比木头重，因为铁的密度大。',
    examFocus: '给你质量和体积，求密度；或者给你密度和体积，求质量。',
    dependencies: [], // 基础节点，无前置依赖
    quiz: [
      { q: '如果质量是 10g，体积是 5cm³，密度是？', options: ['2 g/cm³', '5 g/cm³', '50 g/cm³'], answer: 0, explain: 'D = 10 / 5 = 2' }
    ]
  },
  {
    id: 'water-density',
    title: '水的密度',
    chapter: 'Unit 1: Density',
    formula: 'D_水 = 1.00 g/mL',
    symbols: [],
    unit: 'g/mL',
    humanLang: '这是化学里的“标准参照物”。比水密度小的（油）飘在上面，比水密度大的（石头）沉下去。',
    examFocus: '问你“物体是沉还是浮？”就把物体密度跟 1.00 g/mL 比。',
    dependencies: ['density'], // 必须先学 density
    quiz: [
      { q: '一块石头密度是 2.5 g/mL，放进水里会？', options: ['浮着', '沉底', '悬浮'], answer: 1, explain: '2.5 > 1.00，所以沉。' }
    ]
  }
];
