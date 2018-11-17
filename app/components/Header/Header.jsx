import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  lowerCase,
  capitalize,
  split,
  map,
  join,
} from 'lodash/fp';
import { compose } from 'ramda';
import style from './style.scss';

function Header(props) {
  const { title, className } = props;
  const wrapperClass = classnames({
    [style.header]: true,
    [className]: !!className,
  });
  const createTitle = compose(join(' '), map(capitalize), split(' '), lowerCase);
  const formattedTitle = createTitle(title);

  return (
    <header className={wrapperClass}>
      <h1 className={style.title}>{formattedTitle}</h1>
      <h4 className={style.creator}>
        <a href="https://github.com/natac13">
          Created by: Sean Campbell
        </a>
      </h4>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

Header.defaultProps = {
  className: undefined,
  title: 'New App!',
};

export default Header;
