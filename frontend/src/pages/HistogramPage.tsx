import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { simulationsApi } from '../api/simulations';
import type { Team, Simulation, HistogramResponse } from '../types';
import PageHeader from '../components/PageHeader';
import HistogramTeamSelector from '../components/HistogramTeamSelector';
import SideBySideHistogram from '../components/SideBySideHistogram';

const HistogramPage: React.FC = () => {
    const [apiData, setApiData] = useState<HistogramResponse | null>(null);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        simulationsApi.getHistogramData().then((data) => {
            setApiData(data);
            const initialTeams = Object.keys(data.teams).slice(0, 4);
            setSelectedTeams(initialTeams);
            setLoading(false);
        });
    }, []);

    const handleTeamSelectionChange = (teamName: string) => {
        setSelectedTeams(prev =>
            prev.includes(teamName)
                ? prev.filter(t => t !== teamName)
                : [...prev, teamName]
        );
    };

    const chartData = useMemo(() => {
        if (!apiData) return [];
        return apiData.bins.map(bin => {
            const dataPoint: { [key: string]: string | number } = { bin };
            selectedTeams.forEach(teamName => {
                dataPoint[teamName] = apiData.teams[teamName]?.[bin] ?? 0;
            });
            return dataPoint;
        });
    }, [apiData, selectedTeams]);

    if (loading) return <div className="text-center p-10">Loading histogram data...</div>;
    if (!apiData) return <div className="text-center p-10 text-red-500">Failed to load histogram data.</div>;
    
    const allTeamNames = Object.keys(apiData.teams);

    return (
        <div className="p-6">
            <PageHeader title="Side-by-Side Histogram of Simulation Results" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <HistogramTeamSelector
                    allTeamNames={allTeamNames}
                    selectedTeams={selectedTeams}
                    onTeamSelectionChange={handleTeamSelectionChange}
                />
                <SideBySideHistogram
                    chartData={chartData}
                    selectedTeams={selectedTeams}
                    allTeamNames={allTeamNames}
                />
            </div>
        </div>
    );
};

export default HistogramPage;