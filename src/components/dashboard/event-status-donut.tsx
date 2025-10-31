import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDashboardEventsData } from "@/services/react-query/dashboard/get-events-data";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const EventStatusChart = () => {
  const [timeFilter, setTimeFilter] = useState("WEEKLY");

  const COLORS = ["#0098FD", "#FFBB38"];

  const { data, isLoading } = useGetDashboardEventsData(timeFilter);

  const chartData = data
    ? [
        { name: "Ongoing Events", value: data.ongoingEventsCount },
        { name: "Past Events", value: data.pastEventsCount },
      ]
    : [];

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-black font-semibold">Event Status</h2>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WEEKLY">This Week</SelectItem>
            <SelectItem value="MONTHLY">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px] w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={110}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex items-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#0098FD]"></div>
                <span className="text-sm text-gray-700">
                  On Going Events ({data?.ongoingEventsCount || 0})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#FFBB38]"></div>
                <span className="text-sm text-gray-700">
                  Past Events ({data?.pastEventsCount || 0})
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventStatusChart;
