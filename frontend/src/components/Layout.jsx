import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  const user = useSelector((state) => state.auth.user); // Assuming you're using Redux to manage user state

  console.log('User state:', user); // Debugging purpose


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    
      <aside style={{ width: '250px', background: '#f4f4f4', padding: '1rem' }}>
   <h3>
   Welcome,  <br />
      {user && user?.email}
   </h3>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/ftpservers">Manage FTP Servers</Link></li>
            <li><Link to="/todos">Manage Tasks</Link></li>
            <li><Link to="/upload">Uploads</Link></li>
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
