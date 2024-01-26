import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const ExpressionEngine = () => {
  const [connectorType, setConnectorType] = useState('AND');
  const [expressions, setExpressions] = useState([
    { ruleType: 'Age', operator: '>', value: '', score: '' }
  ]);

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...expressions];
    updatedExpressions[index][field] = value;
    setExpressions(updatedExpressions);
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ruleType: 'Age', operator: '>', value: '', score: '' }]);
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  return (
    <Container>
      <h1>Expression Engine UI</h1>
      <Form>
        <Form.Group>
          <Form.Label>Connector Type:</Form.Label>
          <Form.Control as="select" value={connectorType} onChange={handleConnectorTypeChange}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </Form.Control>
        </Form.Group>
        {expressions.map((expression, index) => (
          <Row key={index}>
            <Col>
              <Form.Group>
                <Form.Label>Rule Type:</Form.Label>
                <Form.Control as="select" value={expression.ruleType} onChange={(e) => handleExpressionChange(index, 'ruleType', e.target.value)}>
                  <option value="Age">Age</option>
                  <option value="Credit Score">Credit Score</option>
                  <option value="Account Balance">Account Balance</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Operator:</Form.Label>
                <Form.Control as="select" value={expression.operator} onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}>
                  <option value=">">{'>'}</option>
                  <option value="<">{'<'}</option>
                  <option value="≥">{'≥'}</option>
                  <option value="≤">{'≤'}</option>
                  <option value="=">{'='}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Value:</Form.Label>
                <Form.Control type="text" value={expression.value} onChange={(e) => handleExpressionChange(index, 'value', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Score:</Form.Label>
                <Form.Control type="text" value={expression.score} onChange={(e) => handleExpressionChange(index, 'score', e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => handleDeleteExpression(index)}>Delete</Button>
            </Col>
          </Row>
        ))}
        <Button variant="primary" onClick={handleAddExpression}>Add Expression</Button>
      </Form>
    </Container>
  );
};

export default ExpressionEngine;
