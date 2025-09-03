import React from "react";
import { cn } from "@/lib/utils";
import DashboardNav from "./dashboard-nav";

const DashboardLayout = ({ 
  children, 
  title = "专家管理驾驶舱", 
  className,
  showTime = true,
  showNav = true
}) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const weekday = weekdays[date.getDay()];

    return `${year}-${month}-${day} | ${hours}:${minutes}:${seconds} ${weekday}`;
  };

  return (
    <div 
      className={cn(
        "min-h-screen overflow-hidden relative",
        "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900",
        className
      )}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #0c1426 0%, #1a2332 100%)
        `,
      }}
    >
      {/* 动态背景粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50 delay-500"></div>
      </div>

      {/* 导航栏 */}
      {showNav && <DashboardNav />}

      {/* 顶部标题栏 */}
      <header className="relative z-10 pt-4 pb-6">
        <div className="flex items-center justify-center relative">
          {/* 左装饰线 */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
          
          {/* 中央标题 */}
          <div className="px-8 relative">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-10">
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              {/* 标题下方装饰线 */}
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>
          </div>
          
          {/* 右装饰线 */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-cyan-400 to-transparent opacity-60"></div>
          
          {/* 右上角时间显示 */}
          {showTime && (
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-right text-cyan-100">
              <div className="text-sm font-medium">
                {formatTime(currentTime)}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="relative z-10 px-4 pb-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
