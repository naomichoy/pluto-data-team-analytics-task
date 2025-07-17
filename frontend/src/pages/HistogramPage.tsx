import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { simulationsApi } from '../api/simulations';
import type { Team, Simulation } from '../types';
import PageHeader from '../components/PageHeader';

const COLORS = ['#0891b2', '#0d9488', '#65a30d', '#ca8a04'];

const HistogramPage: React.FC = () => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([simulationsApi.listAllSimulations(), simulationsApi.listTeams()]).then(([allSimulations, teamList]) => {
            const processedData = allSimulations.reduce((acc, curr) => {
                const bucket = Math.floor(curr.results / 10) * 10;
                const range = `${bucket}-${bucket + 9}`;
                if (!acc[range]) acc[range] = { range };
                acc[range][curr.team] = (acc[range][curr.team] || 0) + 1;
                return acc;
            }, {} as any);

            const dataArray = Object.values(processedData).sort((a: any, b: any) => parseInt(a.range.split('-')[0]) - parseInt(b.range.split('-')[0]));
            
            setChartData(dataArray);
            setTeams(teamList);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading histogram data...</div>;
    }

    return (
        <div className="p-6">
            <PageHeader title="Stacked Histogram of Simulation Results" />
            <div className="bg-white shadow-lg rounded-lg p-6 w-full h-[32rem]">
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {teams.map((team, i) => (
                            <Bar key={team.team_id} dataKey={team.team} stackId="a" fill={COLORS[i % COLORS.length]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HistogramPage;