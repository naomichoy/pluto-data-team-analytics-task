import React, { useState, useEffect } from 'react';
import { simulationsApi } from '../api/simulations';
import type { Team } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';

interface SimulationTeamListPageProps {
    onShowWinPercentage: (teamId: number) => void;
    onShowDetails: (teamId: number) => void;
}

const SimulationTeamListPage: React.FC<SimulationTeamListPageProps> = ({ onShowWinPercentage, onShowDetails }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        simulationsApi.listTeams().then(data => {
            setTeams(data);
            setLoading(false);
        });
    }, []);

    const columns: { key: keyof Team; label: string }[] = [
        { key: 'team_id', label: 'Team ID' },
        { key: 'team', label: 'Team Name' }
    ];

    if (loading) {
        return <div className="text-center p-10">Loading teams...</div>;
    }

    return (
        <div className="p-6">
            <PageHeader title="Simulations" />
            <FilterableTable<Team>
                data={teams}
                columns={columns}
                filterableCols={[{ key: 'team', label: 'Team Name' }]}
                renderActions={(team) => (
                    <div className="space-x-2">
                        <button
                            onClick={() => onShowWinPercentage(team.team_id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                        >
                            Home Wins %
                        </button>
                        <button
                            onClick={() => onShowDetails(team.team_id)}
                            className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-cyan-700"
                        >
                            Details
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default SimulationTeamListPage;