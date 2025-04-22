import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [persons, setPersons] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load persons on mount
  useEffect(() => {
    axios.get('http://localhost:3000/person')
      .then(res => {
        console.log('✅ persons API response:', res.data);
        setPersons(res.data);
      })
      .catch(err => {
        console.error('❌ Error fetching persons:', err);
        setPersons([]); // fallback to prevent map crash
      });
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get('/', {
        auth: {
          username,
          password,
        }
      });
      setAuthMessage(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthMessage('Authentication failed');
      console.error('Login failed:', err);
    }
  };

  const getMenu = async () => {
    try {
      const response = await axios.get('/menu', {
        auth: {
          username,
          password,
        }
      });
      setMenuItems(response.data);
    } catch (err) {
      console.error('Failed to load menu:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Full Stack Hotel App</h1>

      <ul>
        {Array.isArray(persons) ? (
          persons.map((person, idx) => <li key={idx}>{person.name}</li>)
        ) : (
          <li>No person data available</li>
        )}
      </ul>

      <section>
        <h2>Persons (Public)</h2>
        <ul>
          {persons.map((person, idx) => (
            <li key={idx}>{person.name}</li>
          ))}
        </ul>
      </section>

      <hr />

      <section>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />{' '}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />{' '}
        <button onClick={handleLogin}>Login</button>
        <p>{authMessage}</p>
      </section>

      {isAuthenticated && (
        <section>
          <h2>Protected Menu</h2>
          <button onClick={getMenu}>Load Menu</button>
          <ul>
            {menuItems.map((item, idx) => (
              <li key={idx}>{item.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default App;