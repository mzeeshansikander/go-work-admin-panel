import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubscribedCompaniesChart = () => {
  const [timeFilter, setTimeFilter] = useState("this-week");

  const weeklyData = [
    { day: "Mon", value: 2, label: "Mon" },
    { day: "Tue", value: 4, label: "Tue" },
    { day: "Wed", value: 5, label: "Wed" },
    { day: "Thu", value: 3, label: "Thu" },
    { day: "Fri", value: 4, label: "Fri" },
    { day: "Sat", value: 6, label: "Sat" },
    { day: "Sun", value: 7, label: "Sun" },
  ];

  const monthlyData = [
    { day: "Week 1", value: 3, label: "Week 1" },
    { day: "Week 2", value: 5, label: "Week 2" },
    { day: "Week 3", value: 4, label: "Week 3" },
    { day: "Week 4", value: 6, label: "Week 4" },
  ];

  const data = timeFilter === "this-week" ? weeklyData : monthlyData;

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-black font-semibold">
          Subscribed Companies
        </h2>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This week</SelectItem>
            <SelectItem value="this-month">This month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: timeFilter === "this-week" ? 20 : 50,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0071BC" />
                <stop offset="100%" stopColor="#B076FF" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 14 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "8px 12px",
              }}
              labelStyle={{ fontWeight: 600, marginBottom: "4px" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#0071BC" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscribedCompaniesChart;
