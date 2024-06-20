// components/Badge.js
import React from 'react';
import styles from './Badge.module.css';

export default function Badge({ status }){
  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return styles.open;
      case 'resolved':
        return styles.resolved;
      case 'ongoing':
        return styles.ongoing;
      case 'cancelled':
        return styles.cancelled;
      default:
        return styles.default;
    }
  };

  return <span className={`${styles.badge} ${getBadgeColor(status)}`}>{status}</span>;
};

