import React from "react";
import { shallowToJson } from 'enzyme-to-json';
import Posts from '../../src/components/Posts/Posts';
import { PostsProps } from "../../src/types";
import { shallow } from '../setup/test-setup';
import { catsData } from "../fixtures/cats";

describe('<Posts />', () => {
  let wrapper : any;

  const props: PostsProps = {
    cats: catsData,
    favouritesCatsIds: ['cat3'],
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<Posts {...props} />);
  });

  it('should match the snapshot', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
})