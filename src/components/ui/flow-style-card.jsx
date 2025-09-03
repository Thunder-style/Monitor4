import React from "react";
import { cn } from "@/lib/utils";
import DataIcon from "./data-icon";

const FlowStyleCard = ({ 
  title, 
  value, 
  unit = "", 
  icon, 
  description,
  className,
  trend,
  trendValue,
  glowColor = "#47dae8",
  iconType,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg p-4 h-32",
        "transition-all duration-300 group cursor-pointer",
        className
      )}
      style={{
        background: 'rgba(19, 25, 47, 0.8)',
        border: '1px solid #343f4b',
        borderRadius: '5px',
      }}
      {...props}
    >
      {/* Hover效果背景 */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'rgba(19, 25, 47, 0.9)',
        }}
      />
      
      {/* 主要内容 */}
      <div className="relative z-10 flex items-center h-full">
        {/* 左侧图标区域 */}
        <div 
          className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded mr-3"
          style={{
            background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}10)`,
            border: `1px solid ${glowColor}30`,
          }}
        >
          {iconType ? (
            <DataIcon type={iconType} size={32} color={glowColor} />
          ) : (
            <span 
              className="text-2xl"
              style={{ color: glowColor }}
            >
              {icon}
            </span>
          )}
        </div>
        
        {/* 右侧文本内容 */}
        <div className="flex-1 min-w-0">
          {/* 标题 */}
          <h3 
            className="text-sm font-medium mb-2 truncate"
            style={{ color: '#bcdcff' }}
          >
            {title}
          </h3>
          
          {/* 主要数值 */}
          <div className="flex items-baseline space-x-1 mb-2">
            <span 
              className="text-2xl font-bold"
              style={{
                background: 'linear-gradient(to bottom, #fff, #4db6e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Orbitron, monospace',
              }}
            >
              {value}
            </span>
            {unit && (
              <span 
                className="text-sm"
                style={{ color: glowColor }}
              >
                {unit}
              </span>
            )}
          </div>
          
          {/* 描述和趋势行 */}
          <div className="flex items-center justify-between text-xs">
            {description && (
              <span 
                className="truncate mr-2"
                style={{ color: '#c0c9d2' }}
              >
                {description}
              </span>
            )}
            
            {/* 趋势指示器 */}
            {trend && (
              <div 
                className="flex items-center flex-shrink-0"
                style={{ color: glowColor }}
              >
                <span className="mr-1">
                  {trend === 'up' && '↗'}
                  {trend === 'down' && '↘'}
                  {trend === 'stable' && '→'}
                </span>
                {trendValue && (
                  <span className="font-medium">
                    {trendValue}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 底部装饰线 */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}60, transparent)`,
        }}
      />
      
      {/* 悬浮时的发光效果 */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 20px ${glowColor}40, inset 0 1px 0 ${glowColor}20`,
        }}
      />
    </div>
  );
};

export default FlowStyleCard;
