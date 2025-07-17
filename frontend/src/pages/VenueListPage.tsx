import React, { useState, useEffect } from 'react';
import { venuesApi } from '../api/venues';
import type { Venue } from '../types';
import FilterableTable from '../components/FilterableTable';
import PageHeader from '../components/PageHeader';
import type { Column } from '../components/FilterableTable';

interface VenueListPageProps { onSelectVenue: (venueId: number) => void; }
const VenueListPage: React.FC<VenueListPageProps> = ({ onSelectVenue }) => {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { venuesApi.listVenues().then(data => { setVenues(data); setLoading(false); }); }, []);
    const columns: Column<Venue>[] = [{ key: 'venue_id', label: 'Venue ID' }, { key: 'venue_name', label: 'Venue Name' }];
    if (loading) return <div className="text-center p-10">Loading venues...</div>;
    return (<div className="p-6"><PageHeader title="Venues" /><FilterableTable<Venue> data={venues} columns={columns} filterableCols={[{ key: 'venue_name', label: 'Venue Name' }]} renderActions={(venue) => (<button onClick={() => onSelectVenue(venue.venue_id)} className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-cyan-700">Details</button>)} /></div>);
};

export default VenueListPage;