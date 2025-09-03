
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Legend, ScatterChart, Tooltip, Label, CartesianGrid, ResponsiveContainer, XAxis, Line, Pie, PieChart, Scatter, Cell, LineChart, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/ui/dashboard-layout';
import FlowStyleCard from '@/components/ui/flow-style-card';
// 定义专家类别
const EXPERT_CATEGORIES = [
  { id: 'skill', name: '技能专家' },
  { id: 'technical-tech', name: '专业技术专家-技术序列' },
  { id: 'technical-research', name: '专业技术专家-科研序列' },
  { id: 'technical-professional', name: '专业技术专家-专业序列' }
];

// 生成模拟数据的函数
const generateMockData = (category) => {
  // 选聘情况数据
  const recruitmentData = {
    totalParticipants: Math.floor(Math.random() * 200) + 100,
    departmentDistribution: [
      { name: '技术部', value: Math.floor(Math.random() * 50) + 30 },
      { name: '研发部', value: Math.floor(Math.random() * 40) + 20 },
      { name: '产品部', value: Math.floor(Math.random() * 30) + 15 },
      { name: '运营部', value: Math.floor(Math.random() * 25) + 10 },
      { name: '市场部', value: Math.floor(Math.random() * 20) + 5 }
    ],
    evaluationResults: {
      totalScore: Math.floor(Math.random() * 100) + 200,
      dimensions: [
        { name: '业绩评审', avg: Math.floor(Math.random() * 30) + 70, max: Math.floor(Math.random() * 20) + 85, min: Math.floor(Math.random() * 20) + 50 },
        { name: '面试答辩', avg: Math.floor(Math.random() * 30) + 65, max: Math.floor(Math.random() * 20) + 80, min: Math.floor(Math.random() * 20) + 45 }
      ]
    }
  };

  // 如果是技能专家，添加笔试实操维度
  if (category === 'skill') {
    recruitmentData.evaluationResults.dimensions.splice(1, 0, {
      name: '笔试实操',
      avg: Math.floor(Math.random() * 30) + 60,
      max: Math.floor(Math.random() * 20) + 75,
      min: Math.floor(Math.random() * 20) + 40
    });
  }

  // Z3素质模型数据
  const z3Data = [
    { name: '系统思考', current: Math.floor(Math.random() * 30) + 60, previous: Math.floor(Math.random() * 30) + 55 },
    { name: '组织协调', current: Math.floor(Math.random() * 30) + 55, previous: Math.floor(Math.random() * 30) + 50 },
    { name: '成果交付', current: Math.floor(Math.random() * 30) + 65, previous: Math.floor(Math.random() * 30) + 60 },
    { name: '专业应用', current: Math.floor(Math.random() * 30) + 70, previous: Math.floor(Math.random() * 30) + 65 },
    { name: '忠诚执行', current: Math.floor(Math.random() * 30) + 50, previous: Math.floor(Math.random() * 30) + 45 },
    { name: '总结呈现', current: Math.floor(Math.random() * 30) + 75, previous: Math.floor(Math.random() * 30) + 70 },
    { name: '人才培育', current: Math.floor(Math.random() * 30) + 55, previous: Math.floor(Math.random() * 30) + 50 },
    { name: '学习研究', current: Math.floor(Math.random() * 30) + 60, previous: Math.floor(Math.random() * 30) + 55 },
    { name: '不断求进', current: Math.floor(Math.random() * 30) + 65, previous: Math.floor(Math.random() * 30) + 60 },
    { name: '创新思维', current: Math.floor(Math.random() * 30) + 50, previous: Math.floor(Math.random() * 30) + 45 }
  ];

  // 专家素质模型数据 (10个维度)
  const expertQualities = [
    { name: '系统思考', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '组织协调', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '成果交付', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '专业应用', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '忠诚执行', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '总结呈现', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '人才培育', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '学习研究', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '不断求进', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 },
    { name: '创新思维', score: Math.floor(Math.random() * 40) + 50, dispersion: Math.floor(Math.random() * 50) + 10 }
  ];

  // 模拟人员数据
  const personData = [];
  expertQualities.forEach(dimension => {
    const count = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < count; i++) {
      personData.push({
        name: `专家${i + 1}`,
        dimension: dimension.name,
        score: Math.floor(Math.random() * 40) + dimension.score - 20
      });
    }
  });

  return {
    recruitmentData,
    z3Data,
    expertQualities,
    personData
  };
};

// 自定义提示框组件
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/80 p-4 border border-cyan-400 rounded-lg shadow-lg backdrop-blur-sm">
        <p className="font-bold text-cyan-100">{data.name}</p>
        <p className="text-sm text-blue-200">得分: {data.score}</p>
        <p className="text-sm text-blue-200">离散度: {data.dispersion}%</p>
      </div>
    );
  }
  return null;
};

const ExpertQualityQuadrant = () => {
  const [selectedCategory, setSelectedCategory] = useState(EXPERT_CATEGORIES[0].id);
  const [mockData, setMockData] = useState(generateMockData(EXPERT_CATEGORIES[0].id));

  // 根据选中的类别重新生成数据
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setMockData(generateMockData(categoryId));
  };

  // 重新生成数据
  const handleRegenerateData = () => {
    setMockData(generateMockData(selectedCategory));
  };

  // 计算Z3数据的最高和最低平均值
  const { maxCurrent, minCurrent } = useMemo(() => {
    if (mockData.z3Data.length === 0) return { maxCurrent: 0, minCurrent: 0 };
    
    const currents = mockData.z3Data.map(item => item.current);
    return {
      maxCurrent: Math.max(...currents),
      minCurrent: Math.min(...currents)
    };
  }, [mockData.z3Data]);

  // 计算象限边界 (简化为固定值)
  const scoreThreshold = 70;
  const dispersionThreshold = 40;

  // 确定象限分类和颜色
  const getQuadrantInfo = (score, dispersion) => {
    if (score >= scoreThreshold && dispersion < dispersionThreshold) {
      return { name: '集中优势', color: '#22c55e' }; // 绿色
    } else if (score >= scoreThreshold && dispersion >= dispersionThreshold) {
      return { name: '分散优势', color: '#3b82f6' }; // 蓝色
    } else if (score < scoreThreshold && dispersion >= dispersionThreshold) {
      return { name: '分散待发展', color: '#ef4444' }; // 红色
    } else {
      return { name: '集中待发展', color: '#f59e0b' }; // 黄色
    }
  };

  // 获取特定象限的维度
  const getDimensionsByQuadrant = (quadrantName) => {
    return mockData.expertQualities.filter(item => {
      const quadrantInfo = getQuadrantInfo(item.score, item.dispersion);
      return quadrantInfo.name === quadrantName;
    });
  };

  // 计算维度平均分
  const calculateAverageScore = (dimensionName) => {
    const scores = mockData.personData
      .filter(person => person.dimension === dimensionName)
      .map(person => person.score);
    
    if (scores.length === 0) return 0;
    
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum / scores.length;
  };

  // 获取低于平均分的人员
  const getBelowAveragePersons = (dimensionName) => {
    const average = calculateAverageScore(dimensionName);
    return mockData.personData
      .filter(person => person.dimension === dimensionName && person.score < average)
      .sort((a, b) => a.score - b.score);
  };

  // 获取高于平均分的人员
  const getAboveAveragePersons = (dimensionName) => {
    const average = calculateAverageScore(dimensionName);
    return mockData.personData
      .filter(person => person.dimension === dimensionName && person.score > average)
      .sort((a, b) => b.score - a.score);
  };

  // 集中待发展区域的AI建议
  const centralizedDevelopmentSuggestions = [
    {
      id: 1,
      title: "建立专项提升计划",
      content: "针对集中待发展区域的维度，建议制定统一的培训计划和能力提升方案，通过集中资源投入实现整体水平提升。"
    },
    {
      id: 2,
      title: "加强基础能力建设",
      content: "这些维度表现稳定但水平偏低，建议通过标准化流程和基础知识培训来夯实基础能力。"
    },
    {
      id: 3,
      title: "定期评估与反馈",
      content: "建立定期评估机制，跟踪改进效果，及时调整培训内容和方法。"
    }
  ];

  return (
    <DashboardLayout title="专家素质模型分析看板">
      {/* 专家类别选择器 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 dashboard-glass-panel p-4">
        <div>
          <label className="block text-sm font-medium text-blue-100 mb-2">选择专家类别</label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-80 bg-slate-800/50 border-cyan-400/30 text-blue-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-cyan-400/30">
              {EXPERT_CATEGORIES.map(category => (
                <SelectItem key={category.id} value={category.id} className="text-blue-100 hover:bg-cyan-400/20">
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleRegenerateData} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none">
          <RefreshCw className="mr-2 h-4 w-4" />
          重新生成数据
        </Button>
      </div>

      {/* 专家选聘情况概览 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 参与选聘总人数和部门分布 */}
        <div className="dashboard-glass-panel rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold glow-text">专家选聘情况</h2>
          </div>
          <div className="space-y-6">
            <div>
              <Card className="mb-4 bg-slate-900/40 backdrop-blur-sm border-cyan-400/50">
                <CardContent className="flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2 text-blue-100">参与选聘总人数</h3>
                    <p className="text-3xl font-bold glow-text">{mockData.recruitmentData.totalParticipants}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <h4 className="text-md font-medium mb-4 text-blue-100">部门(单位)分布情况</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart margin={{ top: 10 }}>
                  <Pie
                    data={mockData.recruitmentData.departmentDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#00ffff"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockData.recruitmentData.departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${180 + index * 45}, 70%, 60%)`} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid #00ffff',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 选聘结果概览 */}
        <div className="dashboard-glass-panel rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold glow-text">选聘结果概览</h2>
          </div>
          <div className="space-y-6">
            <div>
              <div className="bg-slate-900/40 backdrop-blur-sm p-4 rounded-lg border border-cyan-400/30">
                <p className="text-sm text-blue-200">总分</p>
                <p className="text-2xl font-bold glow-text">{mockData.recruitmentData.evaluationResults.totalScore}</p>
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium mb-2 text-blue-100">一级维度评分</h4>
              <div className="space-y-3">
                {mockData.recruitmentData.evaluationResults.dimensions.map((dimension, index) => (
                  <div key={index} className="border border-cyan-400/30 rounded-lg p-3 bg-slate-800/30">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-blue-100 text-sm">{dimension.name}</h5>
                      <span className="text-xs text-blue-300">均分: {dimension.avg}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-1 rounded border border-emerald-400/30">
                        <p className="text-xs text-blue-200">最高</p>
                        <p className="font-bold text-emerald-300 text-sm">{dimension.max}</p>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-1 rounded border border-cyan-400/30">
                        <p className="text-xs text-blue-200">平均</p>
                        <p className="font-bold text-cyan-300 text-sm">{dimension.avg}</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 p-1 rounded border border-red-400/30">
                        <p className="text-xs text-blue-200">最低</p>
                        <p className="font-bold text-red-300 text-sm">{dimension.min}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Z3素质模型得分 */}
        <div className="dashboard-glass-panel rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold glow-text">Z3素质模型得分</h2>
          </div>
          <div className="mb-4">
            <p className="text-sm text-blue-200">当年所有素质指标得分与上一年对比</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={450}>
              <LineChart
                data={mockData.z3Data}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  tick={{fontSize: 11, fill: '#94a3b8'}}
                />
                <YAxis 
                  label={{ 
                    value: '得分', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -5,
                    style: { textAnchor: 'middle', fill: '#94a3b8' }
                  }}
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid #00ffff',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Legend 
                  verticalAlign="top"
                  height={40}
                  wrapperStyle={{ color: '#94a3b8', fontSize: '14px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  name="当年" 
                  stroke="#00ffff" 
                  activeDot={{ r: 8, fill: '#00ffff', stroke: '#ffffff' }}
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  name="上年" 
                  stroke="#10b981"
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#10b981', stroke: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-2 rounded-lg border border-emerald-400/30">
              <p className="text-xs text-blue-200">当年最高平均值</p>
              <p className="text-lg font-bold text-emerald-300">{maxCurrent}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 p-2 rounded-lg border border-red-400/30">
              <p className="text-xs text-blue-200">当年最低平均值</p>
              <p className="text-lg font-bold text-red-300">{minCurrent}</p>
            </div>
          </div>
        </div>
      </div>

        {/* 四象限分析图 */}
        <div className="dashboard-glass-panel rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold glow-text">专家素质模型四象限分析图</h2>
          </div>
          <div className="h-96 relative chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  type="number" 
                  dataKey="dispersion" 
                  name="离散度" 
                  domain={[0, 100]}
                  label={{ value: '离散度', position: 'insideBottomRight', offset: -5, style: { fill: '#94a3b8' } }}
                  tick={{ fill: '#94a3b8' }}
                >
                  <Label value="离散度" offset={0} position="insideBottom" style={{ fill: '#94a3b8' }} />
                </XAxis>
                <YAxis 
                  type="number" 
                  dataKey="score" 
                  name="得分" 
                  domain={[0, 100]}
                  label={{ value: '得分', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }}
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3', stroke: '#00ffff' }} 
                  content={<CustomTooltip />}
                />
                <Scatter name="素质维度" data={mockData.expertQualities}>
                  {mockData.expertQualities.map((entry, index) => {
                    const quadrantInfo = getQuadrantInfo(entry.score, entry.dispersion);
                    return <Cell key={`cell-${index}`} fill={quadrantInfo.color} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            
            {/* 象限区域标识 - 按照顺时针顺序 */}
            <div className="absolute bottom-6 left-6 text-sm font-medium text-red-300 bg-red-500/20 px-2 py-1 rounded border border-red-400/30">集中待发展</div>
            <div className="absolute top-6 left-6 text-sm font-medium text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded border border-emerald-400/30">集中优势</div>
            <div className="absolute top-6 right-6 text-sm font-medium text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded border border-cyan-400/30">分散优势</div>
            <div className="absolute bottom-6 right-6 text-sm font-medium text-yellow-300 bg-yellow-500/20 px-2 py-1 rounded border border-yellow-400/30">分散待发展</div>
          </div>
        </div>

        {/* 象限说明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-lg p-4 border border-red-400/30">
            <h3 className="font-semibold text-red-300 mb-2">集中待发展 (低得分, 低离散度)</h3>
            <p className="text-sm text-blue-200">表现稳定但水平较低，需整体提升</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-lg p-4 border border-emerald-400/30">
            <h3 className="font-semibold text-emerald-300 mb-2">集中优势 (高得分, 低离散度)</h3>
            <p className="text-sm text-blue-200">表现稳定且优秀，是核心优势</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-400/30">
            <h3 className="font-semibold text-cyan-300 mb-2">分散优势 (高得分, 高离散度)</h3>
            <p className="text-sm text-blue-200">表现优秀但差异较大，需关注一致性</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-lg p-4 border border-yellow-400/30">
            <h3 className="font-semibold text-yellow-300 mb-2">分散待发展 (低得分, 高离散度)</h3>
            <p className="text-sm text-blue-200">表现不稳定且需提升，是重点改进区</p>
          </div>
        </div>

        {/* AI建议和人员分布展示 */}
  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* 集中待发展区域AI建议 */}
          <div className="lg:col-span-3 dashboard-glass-panel rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold glow-text">集中待发展区域AI建议</h2>
            </div>
            <div className="space-y-4">
              {centralizedDevelopmentSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg border border-orange-400/30">
                  <h3 className="font-medium text-orange-300">{suggestion.title}</h3>
                  <p className="mt-2 text-sm text-blue-200">{suggestion.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 分散区域人员分布 */}
          <div className="lg:col-span-2 dashboard-glass-panel rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold glow-text">分散区域人员分布</h2>
            </div>
              <Tabs defaultValue="dispersedDevelopment">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border-cyan-400/30">
                  <TabsTrigger value="dispersedDevelopment" className="text-blue-100 data-[state=active]:bg-cyan-500/30 data-[state=active]:text-cyan-100">分散待发展</TabsTrigger>
                  <TabsTrigger value="dispersedAdvantage" className="text-blue-100 data-[state=active]:bg-cyan-500/30 data-[state=active]:text-cyan-100">分散优势</TabsTrigger>
                </TabsList>
                <TabsContent value="dispersedDevelopment" className="mt-4">
                  <div className="space-y-4">
                    {getDimensionsByQuadrant('分散待发展').map((dimension, index) => (
                      <div key={index} className="border border-cyan-400/30 rounded-lg p-4 bg-slate-800/30">
                        <h4 className="font-medium text-blue-100 mb-3">{dimension.name}</h4>
                        <div>
                          <h5 className="text-sm font-medium text-red-300 mb-2">低于平均分人员</h5>
                          <ul className="space-y-2">
                            {getBelowAveragePersons(dimension.name).map((person, idx) => (
                              <li key={idx} className="flex justify-between text-sm">
                                <span className="text-blue-200">{person.name}</span>
                                <span className="font-medium text-red-300">{person.score}分</span>
                              </li>
                            ))}
                            {getBelowAveragePersons(dimension.name).length === 0 && (
                              <li className="text-sm text-blue-300">暂无低于平均分人员</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ))}
                    {getDimensionsByQuadrant('分散待发展').length === 0 && (
                      <p className="text-blue-300 text-center py-4">暂无分散待发展区域的维度</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="dispersedAdvantage" className="mt-4">
                  <div className="space-y-4">
                    {getDimensionsByQuadrant('分散优势').map((dimension, index) => (
                      <div key={index} className="border border-cyan-400/30 rounded-lg p-4 bg-slate-800/30">
                        <h4 className="font-medium text-blue-100 mb-3">{dimension.name}</h4>
                        <div>
                          <h5 className="text-sm font-medium text-emerald-300 mb-2">高于平均分人员</h5>
                          <ul className="space-y-2">
                            {getAboveAveragePersons(dimension.name).map((person, idx) => (
                              <li key={idx} className="flex justify-between text-sm">
                                <span className="text-blue-200">{person.name}</span>
                                <span className="font-medium text-emerald-300">{person.score}分</span>
                              </li>
                            ))}
                            {getAboveAveragePersons(dimension.name).length === 0 && (
                              <li className="text-sm text-blue-300">暂无高于平均分人员</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    ))}
                    {getDimensionsByQuadrant('分散优势').length === 0 && (
                      <p className="text-blue-300 text-center py-4">暂无分散优势区域的维度</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default ExpertQualityQuadrant;
