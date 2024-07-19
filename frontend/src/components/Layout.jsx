import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '250px', background: '#f4f4f4', padding: '1rem' }}>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/ftpservers">Manage FTP Servers</Link></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet /> {/* Renders the nested route component */}
      </main>
    </div>
  );
};

export default Layout;
