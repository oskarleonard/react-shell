import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import { Link as ReactRouterLink } from 'react-router-dom';
import burgerIcon from './burgermenu-icon.svg';
import styles from './Header.scss';

function Navlinks() {
  return (
    <nav className={styles.navLinks}>
      <ReactRouterLink className={styles.logo} to={'/'}>
        HOME
      </ReactRouterLink>
      <ReactRouterLink className={styles.logo} to={'/team'}>
        ABOUT
      </ReactRouterLink>
      <ReactRouterLink className={styles.logo} to={'/team'}>
        SERVICES
      </ReactRouterLink>
      <ReactRouterLink className={styles.logo} to={'/team'}>
        <img
          height="50"
          width="50"
          src="https://upload.wikimedia.org/wikipedia/fr/6/61/Logo_linkin_park.svg"
        />
      </ReactRouterLink>
      <ReactRouterLink className={styles.logo} to={'/team'}>
        CLIENTS
      </ReactRouterLink>
      <ReactRouterLink className={styles.logo} to={'/team'}>
        JOBS
      </ReactRouterLink>
      <ReactRouterLink className={styles.logo} to={'/team'}>
        CONTACT
      </ReactRouterLink>
    </nav>
  );
}

function toggleContent(visible, scrollPosition) {
  if (typeof window === 'object') {
    let content = document.getElementById('content-below-header');
    if (content) {
      if (visible && content.style.display === 'none') {
        content.style.display = 'block';
        document.body.style.overflow = 'initial';
        if (scrollPosition) {
          window.scrollTo(0, scrollPosition);
        }
      } else if (!visible) {
        content.style.display = 'none';
        document.body.style.overflow = 'hidden';
      }
    }
  }
}

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.timeout = null;

    this.state = {
      showHamburgerMenu: false,
    };
  }

  clearTimeout() {
    window.clearTimeout(this.toolTipTimeout);
  }

  handleOnCopy(show) {
    if (this.timeout === null) {
      this.timeout = setTimeout(() => {
        toggleContent(show);
      }, 1000);
    } else {
      clearTimeout(this.timeout);
      this.timeout = null;
      toggleContent(show);
    }
  }

  getStickyHeaderClassNames(active) {
    return classNames({
      [styles.stickyHeader]: true,
      [styles.stickyHeaderOpen]: active,
    });
  }

  hamburgerClick = () => {
    this.setState((prevState) => {
      return {
        showHamburgerMenu: !prevState.showHamburgerMenu,
      };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showHamburgerMenu !== this.state.showHamburgerMenu) {
      if (this.state.showHamburgerMenu) {
        this.handleOnCopy(prevState.showHamburgerMenu);
      } else {
        this.handleOnCopy(prevState.showHamburgerMenu);
      }
    }
  }

  render() {
    return (
      <header>
        <div
          className={this.getStickyHeaderClassNames(
            this.state.showHamburgerMenu
          )}>
          <img
            onClick={this.hamburgerClick}
            className={styles.burgerIcon}
            height="50"
            width="20"
            src={burgerIcon}
          />
        </div>
        {this.state.showHamburgerMenu && <Navlinks />}
      </header>
    );
  }
}

export default Header;
