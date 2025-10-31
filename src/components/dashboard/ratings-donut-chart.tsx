import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDashboardRatingData } from "@/services/react-query/dashboard/get-ratings-data";
import { Star } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const AverageRatingsChart = () => {
  const [filterValue, setFilterValue] = useState("ALL_COMPANIES");

  const { data, isLoading } = useGetDashboardRatingData(filterValue);

  const percentage = (data?.averageRating ? data?.averageRating / 5 : 0) * 100;

  const ratingData = [{ value: percentage }, { value: 100 - percentage }];

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
            <SelectItem value="ALL_COMPANIES">All Companies</SelectItem>
            <SelectItem value="ALL_USERS">All Users</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center items-center">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px] w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="relative">
            <ResponsiveContainer width={210} height={210}>
              <PieChart>
                <Pie
                  data={ratingData}
                  cx={100}
                  cy={100}
                  innerRadius={70}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {ratingData.map((entry, index) => (
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
                  {data?.averageRating?.toFixed(1)}
                </span>
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AverageRatingsChart;
