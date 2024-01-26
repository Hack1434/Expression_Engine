import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExpressionForm({ onSubmit }) {
  const [connector, setConnector] = useState('AND');
  const [expressions, setExpressions] = useState([{ ruleType: 'Age', operator: '>', value: '', score: '' }]);

  const handleChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>', value: '', score: '' }]);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = expressions.filter((exp, i) => i !== index);
    setExpressions(updatedExpressions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ connector, expressions });
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Connector Type:</label>
          <select className="form-select" value={connector} onChange={(e) => setConnector(e.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        {expressions.map((exp, index) => (
          <div key={index} className="mb-3 border p-3">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Rule Type:</label>
                <select
                  className="form-select"
                  value={exp.ruleType}
                  onChange={(e) => handleChange(index, 'ruleType', e.target.value)}
                >
                  <option value="Age">Age</option>
                  <option value="Credit Score">Credit Score</option>
                  <option value="Account Balance">Account Balance</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Operator:</label>
                <select
                  className="form-select"
                  value={exp.operator}
                  onChange={(e) => handleChange(index, 'operator', e.target.value)}
                >
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value="≥">{'≥'}</option>
                  <option value="≤">{'≤'}</option>
                  <option value="=">{'='}</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Value:</label>
                <input
                  type="text"
                  className="form-control"
                  value={exp.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Score:</label>
                <input
                  type="text"
                  className="form-control"
                  value={exp.score}
                  onChange={(e) => handleChange(index, 'score', e.target.value)}
                />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteExpression(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary mb-3" onClick={handleAddExpression}>
          Add Expression
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

function App() {
  const handleSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <h1 className="text-center mt-4">Expression Engine UI</h1>
      <ExpressionForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
