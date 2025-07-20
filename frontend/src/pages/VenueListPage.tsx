// src/pages/VenueListPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { venuesApi } from '../api/venues';
import type { Venue } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';
import type { Column } from '../components/FilterableTable';

const VenueListPage: React.FC = () => {
    const navigate = useNavigate();

    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        venuesApi.listVenues().then(data => {
            setVenues(data);
            setLoading(false);
        });
    }, []);

    const columns: Column<Venue>[] = [{ key: 'venue_id', label: 'Venue ID' }, { key: 'venue_name', label: 'Venue Name' }];

    if (loading) return <div className="text-center p-10">Loading venues...</div>;

    return (
        <div className="p-6">
            <PageHeader title="Venues" />
            <FilterableTable<Venue>
                data={venues}
                columns={columns}
                filterableCols={[{ key: 'venue_name', label: 'Venue Name' }]}
                renderActions={(venue) => (
                    <button
                        onClick={() => navigate(`/venues/${venue.venue_id}/games`, { state: { venue: venue } })}
                        className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-cyan-700"
                    >
                        Details
                    </button>
                )}
            />
        </div>
    );
};

export default VenueListPage;