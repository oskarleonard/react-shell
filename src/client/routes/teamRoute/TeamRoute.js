import React, { PureComponent } from 'react';
import styles from './teamRoute.scss';

class TeamRoute extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <p>TeamRoute</p>
      </div>
    );
  }
}

export default TeamRoute;
