import React from 'react';

export const PageWrapper = ({ pageType, children }) => {
  return (
    <div>
      <div style={{ background: '#fff' }}>{children}</div>
    </div>
  );
};
