import { useEffect, useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAdminUser = async () => {
      try {
        const response = await fetch('/api/users');

        if (!response.ok) {
          throw new Error('Failed to load users');
        }

        const usersData = await response.json();
        const adminUser = usersData.users.find((user) => user.role === 'admin');

        if (adminUser) {
          setEmail(adminUser.email);
        }
      } catch {
        setError('Unable to load profile details.');
      }
    };

    loadAdminUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Password and Confirm Password must match.');
      return;
    }

    try {
      const response = await fetch('/api/users/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
    } catch {
      setError('Failed to update account details. Please try again.');
      return;
    }

    setMessage('Account details updated successfully.');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <section className="dashboard-section profile-section">
      <h2>Profile Settings</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-input-group">
          <label htmlFor="profile-email">Email</label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="profile-input-group">
          <label htmlFor="profile-password">Password</label>
          <input
            id="profile-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="profile-input-group">
          <label htmlFor="profile-confirm-password">Confirm Password</label>
          <input
            id="profile-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Re-enter new password"
            required
          />
        </div>

        {error && <p className="profile-error">{error}</p>}
        {message && <p className="profile-success">{message}</p>}

        <button type="submit" className="profile-save-btn">
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default Profile;