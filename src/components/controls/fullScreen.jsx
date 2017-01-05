import React from 'react';
import { connect } from 'react-redux';

import { classNames } from '../../util/constants';
import { mapStateToProps } from '../../util/index';
import { fullScreen } from '../../actions/jPlayerActions';
import jPlayerConnect from '../../jPlayerConnect';

const mapJPlayerProps = (jPlayers, id) => ({
  fullScreen: jPlayers[id].fullScreen,
});

const FullScreen = (props) => {
  const onFullScreenClick = () => {
    props.dispatch(fullScreen(!props.fullScreen, props.id));
  };
  return (
    <button className={classNames.FULL_SCREEN} onClick={onFullScreenClick} {...props.attributes}>
      {props.children}
    </button>
  );
};

FullScreen.propTypes = {
  attributes: React.PropTypes.node,
  children: React.PropTypes.element,
  id: React.PropTypes.string,
  fullScreen: React.PropTypes.func,
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(jPlayerConnect(FullScreen, mapJPlayerProps));
