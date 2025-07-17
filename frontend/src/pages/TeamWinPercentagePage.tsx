import React, { useState, useEffect } from 'react';
import { simulationsApi } from '../api/simulations';
import type { Team, WinPercentageData } from '../types';
import PageHeader from '../components/PageHeader';

interface TeamWinPercentagePageProps {
    team: Team;
    onBack: () => void;
}

const TeamWinPercentagePage: React.FC<TeamWinPercentagePageProps> = ({ team, onBack }) => {
    const [data, setData] = useState<WinPercentageData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        simulationsApi.getHomeWinPercentageForTable(team.team_id).then(d => {
            setData(d);
            setLoading(false);
        });
    }, [team.team_id]);

    const columns: { key: keyof WinPercentageData; label: string }[] = [
        { key: 'metric', label: 'Metric' },
        { key: 'value', label: 'Value' }
    ];

    if (loading) {
        return <div className="text-center p-10">Loading win percentage...</div>;
    }

    return (
        <div className="p-6">
            <PageHeader title={`Home Win % for ${team.team}`} onBack={onBack} />
            <div className="bg-white shadow-lg rounded-lg p-6">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            {columns.map(c => (
                                <th key={String(c.key)} className="p-4 font-semibold">{c.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                {columns.map(c => (
                                    <td key={String(c.key)} className="p-4">{row[c.key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamWinPercentagePage;