import React from 'react';

// 模拟数据可视化图标组件
const DataIcon = ({ type, size = 24, color = "#47dae8" }) => {
  const iconStyle = {
    width: size,
    height: size,
    fill: color,
    stroke: color,
    strokeWidth: 1.5,
  };

  switch (type) {
    case 'target':
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <circle cx="12" cy="12" r="10" fill="none" />
          <circle cx="12" cy="12" r="6" fill="none" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    
    case 'users':
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" fill="none" />
          <circle cx="9" cy="7" r="4" fill="none" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" fill="none" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" />
        </svg>
      );
    
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    
    case 'warning':
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    
    case 'education':
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" fill="none" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" fill="none" />
        </svg>
      );
    
    default:
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <circle cx="12" cy="12" r="10" fill="none" />
        </svg>
      );
  }
};

export default DataIcon;
