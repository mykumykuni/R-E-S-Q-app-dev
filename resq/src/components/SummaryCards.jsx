import '../styles/SummaryCards.css';

const SummaryCards = () => {
  return (
    <section className="summary-section">
      <div className="summary-card">
        <h3>Active Sensors</h3>
        <p className="summary-value">124</p>
      </div>

      <div className="summary-card">
        <h3>Response Team</h3>
        <p className="summary-value">8</p>
      </div>
    </section>
  );
};

export default SummaryCards;
