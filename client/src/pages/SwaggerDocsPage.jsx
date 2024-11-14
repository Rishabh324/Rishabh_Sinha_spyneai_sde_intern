import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocsPage = () => {
  return (
    <div>
      <h1>API Documentation</h1>
      <SwaggerUI url="http://localhost:5000/api-docs/swagger.json" />
    </div>
  );
};

export default SwaggerDocsPage;
