// frontend/src/components/SideBySideHistogram.tsx

import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

interface SideBySideHistogramProps {
    chartData: any[];
    selectedTeams: string[];
    allTeamNames: string[];
}
const COLORS = ['#0891b2', '#0d9488', '#65a30d', '#ca8a04', '#c026d3', '#db2777', '#dc2626', '#ea580c', '#52525b', '#4338ca'];
const SideBySideHistogram: React.FC<SideBySideHistogramProps> = ({ chartData, selectedTeams, allTeamNames }) => (
    <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6">
        {selectedTeams.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-gray-500">
                Please select at least one team to display the chart.
            </div>
        ) : (
            <div className="w-full h-96">
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="bin" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {selectedTeams.map((teamName) => (
                            <Bar key={teamName} dataKey={teamName} fill={COLORS[allTeamNames.indexOf(teamName) % COLORS.length]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )}
    </div>
);

export default SideBySideHistogram;
