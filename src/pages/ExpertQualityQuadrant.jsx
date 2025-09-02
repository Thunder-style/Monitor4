
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Legend, ScatterChart, Tooltip, Label, CartesianGrid, ResponsiveContainer, XAxis, Line, Pie, PieChart, Scatter, Cell, LineChart, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
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
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-bold text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">得分: {data.score}</p>
        <p className="text-sm text-gray-600">离散度: {data.dispersion}%</p>
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">专家年度选聘看板</h1>
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

        {/* 专家选聘情况概览 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 参与选聘总人数和部门分布 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>专家选聘情况</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Card className="mb-4">
                    <CardContent className="flex items-center justify-center p-6">
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">参与选聘总人数</h3>
                        <p className="text-3xl font-bold text-blue-600">{mockData.recruitmentData.totalParticipants}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <h4 className="text-md font-medium mb-4">部门(单位)分布情况</h4>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart margin={{ top: 20 }}>
                      <Pie
                        data={mockData.recruitmentData.departmentDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockData.recruitmentData.departmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium mb-2">选聘结果概览</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">总分</p>
                      <p className="text-2xl font-bold">{mockData.recruitmentData.evaluationResults.totalScore}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium mb-2">一级维度评分</h4>
                    <div className="space-y-4">
                      {mockData.recruitmentData.evaluationResults.dimensions.map((dimension, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">{dimension.name}</h5>
                            <span className="text-sm text-gray-500">平均分: {dimension.avg}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-green-100 p-2 rounded">
                              <p className="text-xs text-gray-600">最高分</p>
                              <p className="font-bold">{dimension.max}</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded">
                              <p className="text-xs text-gray-600">平均分</p>
                              <p className="font-bold">{dimension.avg}</p>
                            </div>
                            <div className="bg-red-100 p-2 rounded">
                              <p className="text-xs text-gray-600">最低分</p>
                              <p className="font-bold">{dimension.min}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Z3素质模型得分 */}
          <Card>
            <CardHeader>
              <CardTitle>Z3素质模型得分</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-600">当年所有素质指标得分与上一年对比</p>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={mockData.z3Data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{fontSize: 12}}
                  />
                  <YAxis 
                    label={{ 
                      value: '得分', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: -5
                    }}
                  />
                  <Tooltip />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    name="当年" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    name="上年" 
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">当年最高平均值</p>
                  <p className="text-xl font-bold">{maxCurrent}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">当年最低平均值</p>
                  <p className="text-xl font-bold">{minCurrent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 四象限分析图 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">专家素质模型四象限分析图</h2>
          </div>
          <div className="h-96 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  type="number" 
                  dataKey="dispersion" 
                  name="离散度" 
                  domain={[0, 100]}
                  label={{ value: '离散度', position: 'insideBottomRight', offset: -5 }} 
                >
                  <Label value="离散度" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis 
                  type="number" 
                  dataKey="score" 
                  name="得分" 
                  domain={[0, 100]}
                  label={{ value: '得分', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
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
            <div className="absolute bottom-6 left-6 text-sm font-medium text-red-700 bg-red-100 px-2 py-1 rounded">集中待发展</div>
            <div className="absolute top-6 left-6 text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded">集中优势</div>
            <div className="absolute top-6 right-6 text-sm font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">分散优势</div>
            <div className="absolute bottom-6 right-6 text-sm font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">分散待发展</div>
          </div>
        </div>

        {/* 象限说明 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">集中待发展 (低得分, 低离散度)</h3>
            <p className="text-sm text-gray-700">表现稳定但水平较低，需整体提升</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">集中优势 (高得分, 低离散度)</h3>
            <p className="text-sm text-gray-700">表现稳定且优秀，是核心优势</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">分散优势 (高得分, 高离散度)</h3>
            <p className="text-sm text-gray-700">表现优秀但差异较大，需关注一致性</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">分散待发展 (低得分, 高离散度)</h3>
            <p className="text-sm text-gray-700">表现不稳定且需提升，是重点改进区</p>
          </div>
        </div>

        {/* 新增内容：AI建议和人员分布展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 集中待发展区域AI建议 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-orange-800">集中待发展区域AI建议</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {centralizedDevelopmentSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h3 className="font-medium text-orange-900">{suggestion.title}</h3>
                    <p className="mt-2 text-sm text-orange-700">{suggestion.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 分散区域人员分布 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800">分散区域人员分布</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dispersedDevelopment">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dispersedDevelopment">分散待发展</TabsTrigger>
                  <TabsTrigger value="dispersedAdvantage">分散优势</TabsTrigger>
                </TabsList>
                <TabsContent value="dispersedDevelopment" className="mt-4">
                  <div className="space-y-6">
                    {getDimensionsByQuadrant('分散待发展').map((dimension, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{dimension.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-red-700 mb-2">低于平均分人员</h5>
                            <ul className="space-y-2">
                              {getBelowAveragePersons(dimension.name).map((person, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                  <span>{person.name}</span>
                                  <span className="font-medium">{person.score}分</span>
                                </li>
                              ))}
                              {getBelowAveragePersons(dimension.name).length === 0 && (
                                <li className="text-sm text-gray-500">暂无低于平均分人员</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-green-700 mb-2">高于平均分人员</h5>
                            <ul className="space-y-2">
                              {getAboveAveragePersons(dimension.name).map((person, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                  <span>{person.name}</span>
                                  <span className="font-medium">{person.score}分</span>
                                </li>
                              ))}
                              {getAboveAveragePersons(dimension.name).length === 0 && (
                                <li className="text-sm text-gray-500">暂无高于平均分人员</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                    {getDimensionsByQuadrant('分散待发展').length === 0 && (
                      <p className="text-gray-500 text-center py-4">暂无分散待发展区域的维度</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="dispersedAdvantage" className="mt-4">
                  <div className="space-y-6">
                    {getDimensionsByQuadrant('分散优势').map((dimension, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">{dimension.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-red-700 mb-2">低于平均分人员</h5>
                            <ul className="space-y-2">
                              {getBelowAveragePersons(dimension.name).map((person, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                  <span>{person.name}</span>
                                  <span className="font-medium">{person.score}分</span>
                                </li>
                              ))}
                              {getBelowAveragePersons(dimension.name).length === 0 && (
                                <li className="text-sm text-gray-500">暂无低于平均分人员</li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-green-700 mb-2">高于平均分人员</h5>
                            <ul className="space-y-2">
                              {getAboveAveragePersons(dimension.name).map((person, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                  <span>{person.name}</span>
                                  <span className="font-medium">{person.score}分</span>
                                </li>
                              ))}
                              {getAboveAveragePersons(dimension.name).length === 0 && (
                                <li className="text-sm text-gray-500">暂无高于平均分人员</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                    {getDimensionsByQuadrant('分散优势').length === 0 && (
                      <p className="text-gray-500 text-center py-4">暂无分散优势区域的维度</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpertQualityQuadrant;
