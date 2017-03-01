import React from 'react';
import expect, { createSpy, spyOn, restoreSpies } from 'expect';
import { shallow } from 'enzyme';
import { setJPlayers } from '../../util/common.spec';
import { setVolume } from '../_actions/actions';
import { __get__ } from './volumeBar.container';
import BarEvents from '../barEvents';
import VolumeBar from './volumeBar';
import VolumeBarValue from '../volumeBarValue/volumeBarValue.container';

const mapStateToProps = __get__('mapStateToProps');
const mergeProps = __get__('mergeProps');
const VolumeBarContainer = __get__('VolumeBarContainer');
const uid = 'jPlayer-1';
const getBoundingClientRect = () => ({
  top: 10,
  left: 30,
  width: 100,
  height: 10,
});
const getProps = props => ({
  onClick: Function.prototype,
  onTouch: Function.prototype,
  ...props,
});
const dispatch = createSpy();

describe('VolumeBarContainer', () => {
  it('onClick moves volume bar', () => {
    spyOn(document, 'createElement').andReturn({
      getBoundingClientRect,
    });
    const mappedProps = mapStateToProps(setJPlayers(), { uid });
    const mergedProps = mergeProps(mappedProps, { dispatch });
    const mockBar = document.createElement('div');

    mergedProps.onClick(mockBar, { pageX: 33 });

    expect(dispatch).toHaveBeenCalledWith(setVolume(0.03, uid));
  });

  it('onClick moves volume bar when verticalVolume', () => {
    spyOn(document, 'createElement').andReturn({
      getBoundingClientRect,
    });
    const mappedProps = mapStateToProps(setJPlayers({
      verticalVolume: true,
    }), { uid });
    const mergedProps = mergeProps(mappedProps, { dispatch });
    const mockBar = document.createElement('div');

    mergedProps.onClick(mockBar, { pageY: 7 });

    expect(dispatch).toHaveBeenCalledWith(setVolume(1.3, uid));
  });

  it('onTouch moves volume bar', () => {
    spyOn(document, 'createElement').andReturn({
      getBoundingClientRect,
    });
    const mappedProps = mapStateToProps(setJPlayers(), { uid });
    const mergedProps = mergeProps(mappedProps, { dispatch });
    const mockBar = document.createElement('div');
    const event = {
      preventDefault: createSpy(),
      touches: [
        { pageX: 33 },
      ],
    };

    mergedProps.onTouch(mockBar, event);

    expect(dispatch).toHaveBeenCalledWith(setVolume(0.03, uid));
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('onTouch moves volume bar when verticalVolume', () => {
    spyOn(document, 'createElement').andReturn({
      getBoundingClientRect,
    });
    const mappedProps = mapStateToProps(setJPlayers({
      verticalVolume: true,
    }), { uid });
    const mergedProps = mergeProps(mappedProps, { dispatch });
    const mockBar = document.createElement('div');
    const event = {
      preventDefault: createSpy(),
      touches: [
        { pageY: 7 },
      ],
    };

    mergedProps.onTouch(mockBar, event);

    expect(dispatch).toHaveBeenCalledWith(setVolume(1.3, uid));
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('render passes move bar functions into barEvents', () => {
    const props = getProps();
    const wrapper = shallow(<VolumeBarContainer {...props} />);

    expect(wrapper.type()).toBe(BarEvents);
    expect(wrapper.prop('clickMoveBar')).toBe(props.onClick);
    expect(wrapper.prop('touchMoveBar')).toBe(props.onTouch);
  });

  it('renders VolumeBar', () => {
    const props = getProps({
      attributes: {
        'data-attribute-test': 'test',
      },
    });
    const wrapper = shallow(<VolumeBarContainer {...props} />)
      .find(VolumeBar);

    expect(wrapper.type()).toBe(VolumeBar);
    expect(wrapper.prop('attributes')).toBe(props.attributes);
  });

  it('children is VolumeBarValue as default', () => {
    const props = getProps();
    const wrapper = shallow(<VolumeBarContainer {...props} />)
      .find(VolumeBar);

    expect(wrapper.children().type()).toBe(VolumeBarValue);
  });

  it('renders custom children', () => {
    const props = getProps();
    const wrapper = shallow(
      <VolumeBarContainer {...props}>
        <div className="@@jPlayer-test" />
      </VolumeBarContainer>,
    ).find(VolumeBar);

    expect(wrapper.children('.@@jPlayer-test').exists()).toBeTruthy();
    expect(wrapper.children().type()).toNotBe(VolumeBarValue);
  });

  afterEach(() => {
    restoreSpies();
    dispatch.reset();
  });
});
