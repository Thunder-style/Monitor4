import { HomeIcon, BarChartIcon, TrendingUpIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ExpertQualityQuadrant from "./pages/ExpertQualityQuadrant.jsx";
import ExpertPerformance from "./pages/ExpertPerformance.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
{
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "素质模型分析",
    to: "/expert-quality-quadrant",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <ExpertQualityQuadrant />,
},
{
    title: "专家业绩分析",
    to: "/expert-performance",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <ExpertPerformance />,
},
];
