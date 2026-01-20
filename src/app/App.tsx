import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/app/components/home';
import RouteSearch from '@/app/components/route-search';
import RouteResults from '@/app/components/route-results';
import RouteResultsNew from '@/app/components/route-results-new';
import RouteDetail from '@/app/components/route-detail';
import Settings from '@/app/components/settings';
import Favorites from '@/app/components/favorites';
import AppStructure from '@/app/components/app-structure';
import Wireframe from '@/app/components/wireframe';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wireframe" element={<Wireframe />} />
        <Route path="/app-structure" element={<AppStructure />} />
        <Route path="/search" element={<RouteSearch />} />
        <Route path="/route-results" element={<RouteResultsNew />} />
        <Route path="/route-results-old" element={<RouteResults />} />
        <Route path="/route-detail/:routeId" element={<RouteDetail />} />
        <Route path="/route-detail" element={<RouteDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}