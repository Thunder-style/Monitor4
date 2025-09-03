
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Legend, Tooltip, CartesianGrid, ResponsiveContainer, Pie, XAxis, Line, Bar, PieChart, BarChart, Cell, LineChart, YAxis } from 'recharts';
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

// 16个二级维度
const DIMENSIONS = [
  '解决问题', '工艺创新', '技术标准', '规范编制', '工作质量', '新技能应用',
  '获得专利奖励', '获得职工创新奖励', '获得大众创新奖励', '获得专利授权',
  '参加技能竞赛并获奖', '入选人才支持计划', '获得人才荣誉或奖励',
  '发挥人才培养作用', '知识培训授课', '人才交流'
];

// 生成模拟数据的函数
const generateMockData = (category) => {
  // 考核情况数据
  const assessmentData = {
    totalParticipants: Math.floor(Math.random() * 200) + 100,
    results: [
      { name: '优秀', value: Math.floor(Math.random() * 30) + 20 },
      { name: '称职', value: Math.floor(Math.random() * 40) + 30 },
      { name: '基本称职', value: Math.floor(Math.random() * 20) + 10 },
      { name: '不称职', value: Math.floor(Math.random() * 10) + 5 }
    ]
  };

  // 业绩任务数据
  const performanceTask = {
    median: Math.floor(Math.random() * 30) + 70,
    max: Math.floor(Math.random() * 20) + 85,
    min: Math.floor(Math.random() * 20) + 50
  };

  // 目标任务数据
  const targetTask = {
    median: Math.floor(Math.random() * 30) + 65,
    max: Math.floor(Math.random() * 20) + 80,
    min: Math.floor(Math.random() * 20) + 45
  };

  // 部门任务数据
  const departmentTask = {
    median: Math.floor(Math.random() * 30) + 60,
    max: Math.floor(Math.random() * 20) + 75,
    min: Math.floor(Math.random() * 20) + 40
  };

  // 年度对比数据
  const annualComparison = [
    { name: '业绩任务', current: performanceTask.median, previous: performanceTask.median - Math.floor(Math.random() * 10) },
    { name: '目标任务', current: targetTask.median, previous: targetTask.median - Math.floor(Math.random() * 10) },
    { name: '部门任务', current: departmentTask.median, previous: departmentTask.median - Math.floor(Math.random() * 10) }
  ];

  // 二级维度数据
  const dimensionData = DIMENSIONS.map(dimension => ({
    name: dimension,
    dispersion: Math.floor(Math.random() * 50) + 10, // 离散度 10-60
    median: Math.floor(Math.random() * 40) + 50 // 得分中位数 50-90
  }));

  return {
    assessmentData,
    performanceTask,
    targetTask,
    departmentTask,
    annualComparison,
    dimensionData
  };
};

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const BAR_COLORS = ['#8884d8', '#82ca9d'];

const ExpertPerformance = () => {
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

  // 计算离散度排名
  const sortedDimensions = useMemo(() => {
    return [...mockData.dimensionData].sort((a, b) => b.dispersion - a.dispersion);
  }, [mockData.dimensionData]);

  // 离散度前三和后三
  const top3Dispersion = sortedDimensions.slice(0, 3);
  const bottom3Dispersion = sortedDimensions.slice(-3).reverse();

  // 生成得分分布数据
  const generateScoreDistribution = (dimensionName) => {
    return [
      { range: '0-20%', count: Math.floor(Math.random() * 15) },
      { range: '20-40%', count: Math.floor(Math.random() * 20) },
      { range: '40-60%', count: Math.floor(Math.random() * 25) },
      { range: '60-80%', count: Math.floor(Math.random() * 20) },
      { range: '80-100%', count: Math.floor(Math.random() * 15) }
    ];
  };

  // 生成AI建议
  const generateAISuggestions = () => {
    const suggestions = [];
    
    // 找出离散度最低的维度
    const lowestDispersion = sortedDimensions[sortedDimensions.length - 1];
    if (lowestDispersion && lowestDispersion.dispersion < 20) {
      suggestions.push({
        id: 1,
        title: `${lowestDispersion.name}维度建议`,
        content: `${lowestDispersion.name}维度的得分普遍较低且差异较小，建议审查维度定义是否清晰，或考虑调整评分标准以更好地区分专家表现。`
      });
    }
    
    // 找出得分中位数最低的维度
    const sortedByMedian = [...mockData.dimensionData].sort((a, b) => a.median - b.median);
    const lowestMedian = sortedByMedian[0];
    if (lowestMedian && lowestMedian.median < 60) {
      suggestions.push({
        id: 2,
        title: `${lowestMedian.name}维度改进建议`,
        content: `${lowestMedian.name}维度的整体表现偏低，建议加强相关培训或提供更多的实践机会以提升专家在该维度的能力。`
      });
    }
    
    // 找出离散度最高的维度
    const highestDispersion = sortedDimensions[0];
    if (highestDispersion && highestDispersion.dispersion > 50) {
      suggestions.push({
        id: 3,
        title: `${highestDispersion.name}维度一致性建议`,
        content: `${highestDispersion.name}维度的专家表现差异较大，建议分析高分和低分专家的差异原因，形成最佳实践进行推广。`
      });
    }
    
    // 如果建议少于3条，补充默认建议
    while (suggestions.length < 3) {
      suggestions.push({
        id: suggestions.length + 1,
        title: "数据驱动优化建议",
        content: "建议定期收集专家反馈，持续优化考核维度和评分标准，确保评估体系的科学性和有效性。"
      });
    }
    
    return suggestions.slice(0, 3);
  };

  const aiSuggestions = generateAISuggestions();

  return (
    <DashboardLayout title="专家业绩分析看板">
      <div className="space-y-6">


        {/* 专家类别选择器 */}
        <div 
          className="p-4 rounded-lg"
          style={{
            background: 'rgba(19, 25, 47, 0.8)',
            border: '1px solid #343f4b',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-cyan-100 mb-1">选择专家类别</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-64 bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="选择专家类别" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {EXPERT_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id} className="text-white hover:bg-slate-700">
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
        </div>

        {/* 主要内容区域 */}
        <div className="space-y-6">
          {/* 第一行：专家考核情况概览 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 考核人数和结果分布 */}
            <div 
              className="lg:col-span-2 p-6 rounded-lg"
              style={{
                background: 'rgba(19, 25, 47, 0.8)',
                border: '1px solid #343f4b',
              }}
            >
              <h3 className="text-lg font-medium text-cyan-100 mb-6">专家考核情况分析</h3>
              
              {/* 参与考核人数 */}
              <div className="mb-6">
                <div 
                  className="p-4 rounded-lg flex items-center justify-between"
                  style={{
                    background: 'rgba(71, 218, 232, 0.1)',
                    border: '1px solid rgba(71, 218, 232, 0.3)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        background: 'rgba(71, 218, 232, 0.2)',
                        color: '#47dae8'
                      }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-cyan-200">参与考核人数</p>
                      <p className="text-2xl font-bold text-white">{mockData.assessmentData.totalParticipants} 人</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-cyan-200">当前类别总数</p>
                    <p className="text-sm text-green-400">+5%</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium mb-4 text-cyan-100">考核结果分布</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={mockData.assessmentData.results}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockData.assessmentData.results.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium mb-2 text-cyan-100">业绩任务</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(71, 218, 232, 0.1)', border: '1px solid rgba(71, 218, 232, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">中位数</p>
                        <p className="text-lg font-bold text-white">{mockData.performanceTask.median}</p>
                      </div>
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(80, 227, 194, 0.1)', border: '1px solid rgba(80, 227, 194, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">最高分</p>
                        <p className="text-lg font-bold text-white">{mockData.performanceTask.max}</p>
                      </div>
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">最低分</p>
                        <p className="text-lg font-bold text-white">{mockData.performanceTask.min}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2 text-cyan-100">目标任务</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(71, 218, 232, 0.1)', border: '1px solid rgba(71, 218, 232, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">中位数</p>
                        <p className="text-lg font-bold text-white">{mockData.targetTask.median}</p>
                      </div>
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(80, 227, 194, 0.1)', border: '1px solid rgba(80, 227, 194, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">最高分</p>
                        <p className="text-lg font-bold text-white">{mockData.targetTask.max}</p>
                      </div>
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">最低分</p>
                        <p className="text-lg font-bold text-white">{mockData.targetTask.min}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2 text-cyan-100">部门任务</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(71, 218, 232, 0.1)', border: '1px solid rgba(71, 218, 232, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">中位数</p>
                        <p className="text-lg font-bold text-white">{mockData.departmentTask.median}</p>
                      </div>
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(80, 227, 194, 0.1)', border: '1px solid rgba(80, 227, 194, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">最高分</p>
                        <p className="text-lg font-bold text-white">{mockData.departmentTask.max}</p>
                      </div>
                      <div 
                        className="p-3 rounded text-center"
                        style={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)' }}
                      >
                        <p className="text-xs text-cyan-200">最低分</p>
                        <p className="text-lg font-bold text-white">{mockData.departmentTask.min}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 年度对比图表 */}
            <div 
              className="p-6 rounded-lg"
              style={{
                background: 'rgba(19, 25, 47, 0.8)',
                border: '1px solid #343f4b',
              }}
            >
              <h3 className="text-lg font-medium text-cyan-100 mb-6">专家考核得分年度对比</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={mockData.annualComparison}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 218, 232, 0.2)" />
                  <XAxis dataKey="name" stroke="#bcdcff" />
                  <YAxis stroke="#bcdcff" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(19, 25, 47, 0.95)',
                      border: '1px solid rgba(71, 218, 232, 0.3)',
                      borderRadius: '8px',
                      color: '#bcdcff'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" name="当前年度" fill="#47dae8" />
                  <Bar dataKey="previous" name="上一年度" fill="#89e5ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 考核指标优化分析 */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: 'rgba(19, 25, 47, 0.8)',
              border: '1px solid #343f4b',
            }}
          >
            <h3 className="text-lg font-medium text-cyan-100 mb-6">考核指标优化分析</h3>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-cyan-400/30">
                      <th className="px-4 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">排名</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">二级维度</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">离散度</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cyan-200 uppercase tracking-wider">得分中位数</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {sortedDimensions.map((dimension, index) => (
                      <tr 
                        key={dimension.name} 
                        className="hover:bg-cyan-400/5 transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{dimension.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            index < 3 ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 
                            index >= sortedDimensions.length - 3 ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                            'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                          }`}>
                            {dimension.dispersion}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-cyan-100">{dimension.median}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 离散度前三 */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-red-300">离散度前三名</h3>
                <div className="space-y-6">
                  {top3Dispersion.map((dimension, index) => (
                    <div 
                      key={dimension.name} 
                      className="p-4 rounded-lg"
                      style={{
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">{dimension.name}</h4>
                        <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs font-medium border border-red-500/30">
                          离散度: {dimension.dispersion}
                        </span>
                      </div>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={generateScoreDistribution(dimension.name)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 218, 232, 0.2)" />
                            <XAxis type="number" stroke="#bcdcff" />
                            <YAxis dataKey="range" type="category" scale="band" stroke="#bcdcff" />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'rgba(19, 25, 47, 0.95)',
                                border: '1px solid rgba(71, 218, 232, 0.3)',
                                borderRadius: '8px',
                                color: '#bcdcff'
                              }}
                            />
                            <Bar dataKey="count" name="人数" fill="#ff6b6b" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 离散度后三 */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-green-300">离散度后三名</h3>
                <div className="space-y-6">
                  {bottom3Dispersion.map((dimension, index) => (
                    <div 
                      key={dimension.name} 
                      className="p-4 rounded-lg"
                      style={{
                        background: 'rgba(80, 227, 194, 0.1)',
                        border: '1px solid rgba(80, 227, 194, 0.3)',
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-white">{dimension.name}</h4>
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30">
                          离散度: {dimension.dispersion}
                        </span>
                      </div>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={generateScoreDistribution(dimension.name)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 218, 232, 0.2)" />
                            <XAxis type="number" stroke="#bcdcff" />
                            <YAxis dataKey="range" type="category" scale="band" stroke="#bcdcff" />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'rgba(19, 25, 47, 0.95)',
                                border: '1px solid rgba(71, 218, 232, 0.3)',
                                borderRadius: '8px',
                                color: '#bcdcff'
                              }}
                            />
                            <Bar dataKey="count" name="人数" fill="#50e3c2" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI建议 */}
          <div 
            className="p-6 rounded-lg"
            style={{
              background: 'rgba(19, 25, 47, 0.8)',
              border: '1px solid #343f4b',
            }}
          >
            <h3 className="text-lg font-medium text-cyan-100 mb-6">AI优化建议</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className="p-4 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(71, 218, 232, 0.1)',
                    border: '1px solid rgba(71, 218, 232, 0.3)',
                  }}
                >
                  <h3 className="font-medium text-white mb-2">{suggestion.title}</h3>
                  <p className="text-sm text-cyan-100">{suggestion.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpertPerformance;
