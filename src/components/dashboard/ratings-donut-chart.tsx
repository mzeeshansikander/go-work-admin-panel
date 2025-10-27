import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";

const AverageRatingsChart = () => {
  const [filterValue, setFilterValue] = useState("all-companies");

  const rating = 4.0;
  const percentage = (rating / 5) * 100;

  const data = [{ value: percentage }, { value: 100 - percentage }];

  const COLORS = ["#4375F4", "#E8EFFE"];

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-black font-semibold">Average Ratings</h2>
        <Select value={filterValue} onValueChange={setFilterValue}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-companies">All Companies</SelectItem>
            <SelectItem value="top-rated">Top Rated</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center items-center">
        <div className="relative">
          <ResponsiveContainer width={210} height={210}>
            <PieChart>
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={70}
                outerRadius={100}
                startAngle={90}
                endAngle={-270}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-semibold text-gray-800">
                {rating.toFixed(1)}
              </span>
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageRatingsChart;
