import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAndHandleReddit } from '@client/redux/reddit';
import bottomBackground from './background-bottom.jpeg';
import styles from './homeRoute.scss';

function UspSection() {
  return (
    <div className={styles.uspSection}>
      <div className={styles.uspTitle}>Title</div>
      <div className={styles.uspDescription}>Description</div>
      <div className={styles.uspLine} />
      <Link className={styles.uspBtn} to="/">
        Some Btn
      </Link>
    </div>
  );
}

class HomeRoute extends PureComponent {
  static fetchData(store) {
    console.log('HELLO fetchData HomeRoute');
    return store.dispatch(fetchAndHandleReddit('Wavesplatform'));
  }

  componentDidMount() {
    if (!this.props.redditPosts) {
      this.props.fetchAndHandleReddit('Wavesplatform');
    }
  }

  render() {
    return (
      <div className={styles.homeRoute}>
        <div className={styles.heroImage}>
          <h1>WE ARE LEVELS</h1>
        </div>
        <UspSection />
        <img className={styles.bottomBackground} src={bottomBackground} />
      </div>
    );
  }
}

HomeRoute.propTypes = {
  redditPosts: ImmutablePropTypes.map.isRequired,
};

function mapStateToProps(state) {
  return {
    redditPosts: state.reddit.get('redditPosts'),
  };
}

export default connect(
  mapStateToProps,
  { fetchAndHandleReddit }
)(HomeRoute);
