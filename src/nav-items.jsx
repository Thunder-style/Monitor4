import { BarChartIcon, TrendingUpIcon } from "lucide-react";
import ExpertQualityQuadrant from "./pages/ExpertQualityQuadrant.jsx";
import ExpertPerformance from "./pages/ExpertPerformance.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
{
    title: "专家素质模型分析",
    to: "/",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <ExpertQualityQuadrant />,
},
{
    title: "专家业绩分析",
    to: "/performance",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <ExpertPerformance />,
},
];
