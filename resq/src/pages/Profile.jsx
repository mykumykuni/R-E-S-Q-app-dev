import { useEffect, useState } from 'react';
import '../styles/Profile.css';

const Profile = ({ role = 'admin', onUserUpdated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('/api/users');

        if (!response.ok) {
          throw new Error('Failed to load users');
        }

        const usersData = await response.json();
        const currentUser = usersData.users.find((user) => user.role === role);

        if (currentUser) {
          setEmail(currentUser.email);
          setAvatar(currentUser.avatar || '');
        } else {
          setError('Unable to load profile details.');
        }
      } catch {
        setError('Unable to load profile details.');
      }
    };

    loadUser();
  }, [role]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if ((password || confirmPassword) && password !== confirmPassword) {
      setError('Password and Confirm Password must match.');
      return;
    }

    const payload = {
      email,
      avatar,
    };

    if (password) {
      payload.password = password;
    }

    try {
      const response = await fetch(`/api/users/${role}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();

      if (onUserUpdated) {
        onUserUpdated(updatedUser);
      }
    } catch {
      setError('Failed to update account details. Please try again.');
      return;
    }

    setMessage('Account details updated successfully.');
    setPassword('');
    setConfirmPassword('');
  };

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setAvatar(result);
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <section className="dashboard-section profile-section">
      <h2>Profile Settings</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-avatar-section">
          {avatar ? (
            <img src={avatar} alt="Profile avatar" className="profile-avatar-preview" />
          ) : (
            <div className="profile-avatar-preview profile-avatar-placeholder" aria-hidden="true">
              {role.toUpperCase().charAt(0)}
            </div>
          )}

          <label htmlFor="profile-avatar" className="profile-avatar-label">
            Upload Avatar
          </label>
          <input
            id="profile-avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

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