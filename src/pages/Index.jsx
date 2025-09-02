import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpertQualityQuadrant from './ExpertQualityQuadrant';
import ExpertPerformance from './ExpertPerformance';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">专家业绩与素质评估分析平台</h1>
          <p className="text-gray-600 mt-2">综合性数据可视化分析仪表板</p>
        </header>

        <Tabs defaultValue="quality" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quality">专家素质模型分析</TabsTrigger>
            <TabsTrigger value="performance">专家业绩分析</TabsTrigger>
          </TabsList>
          <TabsContent value="quality">
            <ExpertQualityQuadrant />
          </TabsContent>
          <TabsContent value="performance">
            <ExpertPerformance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
