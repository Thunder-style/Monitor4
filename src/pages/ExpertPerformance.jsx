
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Legend, Tooltip, CartesianGrid, ResponsiveContainer, Pie, XAxis, Line, Bar, PieChart, BarChart, Cell, LineChart, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">专家业绩分析看板</h1>
        </header>

        {/* 专家类别选择器 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">选择专家类别</label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="选择专家类别" />
              </SelectTrigger>
              <SelectContent>
                {EXPERT_CATEGORIES.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleRegenerateData} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            重新生成数据
          </Button>
        </div>

        {/* 专家考核情况概览 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 考核人数和结果分布 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>专家考核情况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card className="mb-4">
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">参与考核人数</h3>
                        <p className="text-3xl font-bold text-blue-600">{mockData.assessmentData.totalParticipants}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <h4 className="text-md font-medium mb-2">考核结果分布</h4>
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
                    <h4 className="text-md font-medium mb-2">业绩任务</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-100 p-3 rounded">
                        <p className="text-sm text-gray-600">中位数</p>
                        <p className="text-xl font-bold">{mockData.performanceTask.median}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-gray-600">最高分</p>
                        <p className="text-xl font-bold">{mockData.performanceTask.max}</p>
                      </div>
                      <div className="bg-red-100 p-3 rounded">
                        <p className="text-sm text-gray-600">最低分</p>
                        <p className="text-xl font-bold">{mockData.performanceTask.min}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2">目标任务</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-100 p-3 rounded">
                        <p className="text-sm text-gray-600">中位数</p>
                        <p className="text-xl font-bold">{mockData.targetTask.median}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-gray-600">最高分</p>
                        <p className="text-xl font-bold">{mockData.targetTask.max}</p>
                      </div>
                      <div className="bg-red-100 p-3 rounded">
                        <p className="text-sm text-gray-600">最低分</p>
                        <p className="text-xl font-bold">{mockData.targetTask.min}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2">部门(单位)任务</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-blue-100 p-3 rounded">
                        <p className="text-sm text-gray-600">中位数</p>
                        <p className="text-xl font-bold">{mockData.departmentTask.median}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-sm text-gray-600">最高分</p>
                        <p className="text-xl font-bold">{mockData.departmentTask.max}</p>
                      </div>
                      <div className="bg-red-100 p-3 rounded">
                        <p className="text-sm text-gray-600">最低分</p>
                        <p className="text-xl font-bold">{mockData.departmentTask.min}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 年度对比图表 */}
          <Card>
            <CardHeader>
              <CardTitle>专家考核得分年度对比</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={mockData.annualComparison}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" name="当前年度" fill={BAR_COLORS[0]} />
                  <Bar dataKey="previous" name="上一年度" fill={BAR_COLORS[1]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* 考核指标优化分析 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>考核指标优化分析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排名</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">二级维度</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">离散度</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">得分中位数</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedDimensions.map((dimension, index) => (
                      <tr 
                        key={dimension.name} 
                        className={index < 3 ? 'bg-red-50' : index >= sortedDimensions.length - 3 ? 'bg-green-50' : ''}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{dimension.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            index < 3 ? 'bg-red-100 text-red-800' : 
                            index >= sortedDimensions.length - 3 ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {dimension.dispersion}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{dimension.median}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 离散度前三 */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-red-700">离散度前三名</h3>
                <div className="space-y-6">
                  {top3Dispersion.map((dimension, index) => (
                    <div key={dimension.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{dimension.name}</h4>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
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
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="range" type="category" scale="band" />
                            <Tooltip />
                            <Bar dataKey="count" name="人数" fill="#ef4444" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 离散度后三 */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-green-700">离散度后三名</h3>
                <div className="space-y-6">
                  {bottom3Dispersion.map((dimension, index) => (
                    <div key={dimension.name} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{dimension.name}</h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
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
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="range" type="category" scale="band" />
                            <Tooltip />
                            <Bar dataKey="count" name="人数" fill="#22c55e" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI建议 */}
        <Card>
          <CardHeader>
            <CardTitle>AI优化建议</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-2">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600">{suggestion.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertPerformance;
