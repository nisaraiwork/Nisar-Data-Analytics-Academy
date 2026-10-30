import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  RotateCcw,
  BarChart2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface MetricItem {
  month: string;
  karachi: number;
  lahore: number;
  islamabad: number;
}

const MONTHLY_DATA: MetricItem[] = [
  { month: 'Jun', karachi: 340, lahore: 280, islamabad: 190 },
  { month: 'Jul', karachi: 390, lahore: 310, islamabad: 220 },
  { month: 'Aug', karachi: 420, lahore: 360, islamabad: 250 },
  { month: 'Sep', karachi: 460, lahore: 410, islamabad: 290 },
  { month: 'Oct', karachi: 540, lahore: 480, islamabad: 330 },
];

export const LiveSalesDashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<'all' | 'karachi' | 'lahore' | 'islamabad'>('all');
  const [showCurriculumModal, setShowCurriculumModal] = useState(false);

  // Calculate dynamic KPIs based on filter
  const getCityMultiplier = () => {
    switch (selectedCity) {
      case 'karachi':
        return 0.44;
      case 'lahore':
        return 0.36;
      case 'islamabad':
        return 0.20;
      default:
        return 1.0;
    }
  };

  const mult = getCityMultiplier();
  const baseRevenue = 2840000;
  const baseOrders = 2150;
  const baseReturnRate = selectedCity === 'karachi' ? 2.1 : selectedCity === 'lahore' ? 2.7 : 1.9;

  const currentRevenue = Math.round(baseRevenue * mult);
  const currentOrders = Math.round(baseOrders * mult);
  const avgOrderValue = Math.round(currentRevenue / (currentOrders || 1));

  const maxVal = 600;

  return (
    <div id="dashboard-preview" className="bg-[#101d30] border border-[#263b55] rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#46d39a]" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              🧭 Live Dashboard: What You Will Build
            </h2>
          </div>
          <p className="text-xs text-[#9db0c8] mt-1">
            After the first lessons, you build and publish this interactive business dashboard using real datasets.
          </p>
        </div>

        {/* City Slicer buttons */}
        <div className="flex items-center gap-1 bg-[#091626] p-1 rounded-xl border border-[#263b55] self-start sm:self-auto">
          {(['all', 'karachi', 'lahore', 'islamabad'] as const).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                selectedCity === city
                  ? 'bg-[#203650] text-[#35d5e8] shadow-sm'
                  : 'text-[#9db0c8] hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Scorecards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
          <div className="flex items-center justify-between text-[#9db0c8] text-xs mb-1">
            <span>Gross Revenue</span>
            <DollarSign className="w-3.5 h-3.5 text-[#35d5e8]" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
            Rs. {currentRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#46d39a] font-medium">+18.4% vs last period</span>
        </div>

        <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
          <div className="flex items-center justify-between text-[#9db0c8] text-xs mb-1">
            <span>Total Orders</span>
            <ShoppingBag className="w-3.5 h-3.5 text-[#46d39a]" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
            {currentOrders.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#35d5e8] font-medium">98.2% delivered</span>
        </div>

        <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
          <div className="flex items-center justify-between text-[#9db0c8] text-xs mb-1">
            <span>Avg Order Value</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#35d5e8]" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
            Rs. {avgOrderValue.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#9db0c8]">Basket size</span>
        </div>

        <div className="bg-[#091626] border border-[#263b55] rounded-xl p-3">
          <div className="flex items-center justify-between text-[#9db0c8] text-xs mb-1">
            <span>Return Rate</span>
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
            {baseReturnRate}%
          </div>
          <span className="text-[10px] text-[#46d39a] font-medium">Under 3.0% threshold</span>
        </div>
      </div>

      {/* Visual Bar Trend */}
      <div className="bg-[#091626] border border-[#263b55] rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-[#35d5e8]" />
            Monthly Sales Trajectory (PKR Thousands)
          </span>
          <span className="text-[#9db0c8] font-mono text-[11px] flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Jun - Oct 2026
          </span>
        </div>

        {/* CSS Chart Columns */}
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-36 pt-4 border-b border-[#263b55]/60 px-2">
          {MONTHLY_DATA.map((item) => {
            const val =
              selectedCity === 'all'
                ? item.karachi + item.lahore + item.islamabad
                : item[selectedCity];
            const heightPercent = Math.min(100, Math.round((val / (selectedCity === 'all' ? 1400 : maxVal)) * 100));

            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                <span className="text-[10px] font-mono text-[#9db0c8] group-hover:text-white tabular-nums transition-colors">
                  {val}k
                </span>
                <div className="w-full max-w-[44px] bg-[#14243a] rounded-t-md overflow-hidden h-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-[#35d5e8] to-[#46d39a] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-white mt-1">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-[#9db0c8]">
          Ready to learn how to build interactive charts and clean data like this?
        </p>

        <button
          onClick={() => setShowCurriculumModal(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#203650] hover:bg-[#284464] text-[#edf5ff] border border-[#35516f] font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <Layers className="w-3.5 h-3.5 text-[#35d5e8]" />
          <span>Preview next module</span>
        </button>
      </div>

      {/* Curriculum Modal */}
      {showCurriculumModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101d30] border border-[#263b55] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#263b55] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#35d5e8]" />
                <h3 className="text-base font-bold text-white">Next Module: Advanced Spreadsheets & BI</h3>
              </div>
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="text-[#9db0c8] hover:text-white text-xs font-semibold px-2 py-1 rounded"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#cfe4f7] leading-relaxed">
              <p>
                In the upcoming stages, you will master practical analytical methods step-by-step:
              </p>
              <ul className="space-y-2 text-[#9db0c8]">
                <li className="flex items-start gap-2">
                  <span className="text-[#35d5e8] font-bold">1.</span>
                  <span><strong>Excel Formulas & Pivot Tables:</strong> =VLOOKUP, =XLOOKUP, =INDEX(MATCH), dynamic slicing, and grouped date summaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35d5e8] font-bold">2.</span>
                  <span><strong>SQL Aggregations:</strong> Writing GROUP BY queries to answer real retail business questions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#35d5e8] font-bold">3.</span>
                  <span><strong>Power BI Slicers & Measures:</strong> Creating calculated measures for profit margins, year-over-year growth, and interactive city slicers.</span>
                </li>
              </ul>

              <div className="p-3 bg-[#091626] rounded-xl border border-[#263b55] text-[11px] text-[#46d39a]">
                💡 Tip: Complete the 7 stages on the roadmap to unlock your official Certificate of Completion!
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#263b55] flex justify-end">
              <button
                onClick={() => setShowCurriculumModal(false)}
                className="px-4 py-2 bg-[#35d5e8] text-[#05202b] font-bold rounded-lg text-xs hover:bg-[#20c8dc]"
              >
                Got it, let's learn!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
