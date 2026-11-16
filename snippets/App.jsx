// Sample React component covering JSX language tokens.
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const API_URL = 'https://api.example.com/users';

function UserCard({ name, email, isActive = false, onSelect }) {
  return (
    <li className={`user-card ${isActive ? 'active' : ''}`} onClick={() => onSelect(email)}>
      <img src={`/avatars/${name}.png`} alt={name} width={48} />
      <span>{name}</span>
      {isActive && <strong> (active)</strong>}
    </li>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default function App({ title }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setUsers(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = (email) => setSelected(email);

  if (loading) return <p className="loading">Loading&hellip;</p>;

  return (
    <>
      {/* JSX comment */}
      <header style={{ color: '#4ec9b0', fontSize: 24 }}>
        <h1 data-testid="title">{title ?? 'Users'}</h1>
      </header>
      <main>
        <ul>
          {users.map((user) => (
            <UserCard
              key={user.id}
              {...user}
              isActive={user.email === selected}
              onSelect={handleSelect}
            />
          ))}
        </ul>
        <button type="button" disabled={!selected} onClick={() => setSelected(null)}>
          Clear selection
        </button>
      </main>
    </>
  );
}
