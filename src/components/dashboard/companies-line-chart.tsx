import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCompaniesData } from "@/services/react-query/dashboard/get-companies-data";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SubscribedCompaniesChart = () => {
  const [timeFilter, setTimeFilter] = useState("WEEKLY");
  const { data: apiData, isLoading } = useGetCompaniesData(timeFilter);

  const transformData = () => {
    if (!apiData) return [];

    if (timeFilter === "WEEKLY") {
      return apiData.map((item) => {
        const date = new Date(item.date);
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return {
          label: dayNames[date.getDay()],
          value: item.count,
          date: item.date,
        };
      });
    } else {
      const weeks: { [key: string]: number } = {};
      apiData.forEach((item, index) => {
        const weekNumber = Math.floor(index / 7) + 1;
        const weekKey = `Week ${weekNumber}`;
        weeks[weekKey] = (weeks[weekKey] || 0) + item.count;
      });
      return Object.entries(weeks).map(([label, value]) => ({
        label,
        value,
      }));
    }
  };

  const chartData = transformData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div
          className="bg-[#E6F0FA] border border-[#B3D4F0] rounded-md shadow-sm px-3 py-2 text-sm font-medium"
          style={{
            minWidth: "50px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="text-[#0071BC]">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const maxValue = Math.max(...chartData.map((d) => d.value), 0);

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
            <SelectItem value="WEEKLY">This week</SelectItem>
            <SelectItem value="MONTHLY">This month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px] w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: timeFilter === "WEEKLY" ? 20 : 50,
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
              <YAxis hide domain={[0, maxValue + 2]} />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#0071BC",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                  height: maxValue > 0 ? undefined : 0,
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={(props: any) => {
                  const { payload } = props;
                  if (payload.value === 0) return <g />;
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={5}
                      fill="#0071BC"
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={{
                  r: 7,
                  fill: "#4FC3F7",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                connectNulls
                onMouseEnter={(e: any) => {
                  const line = e.target;
                  line?.setAttribute("stroke", "#4FC3F7");
                }}
                onMouseLeave={(e: any) => {
                  const line = e.target;
                  line?.setAttribute("stroke", "url(#lineGradient)");
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SubscribedCompaniesChart;
