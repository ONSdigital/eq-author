import React from "react";
import withEntityEditor from "./";
import { shallow } from "enzyme";
import { gql } from "react-apollo";
import { filter } from "graphql-anywhere";

const Component = props => <div {...props} />;

const fragment = gql`
  fragment Entity on Entity {
    id
    title
  }
`;

describe("withEntityEditor", () => {
  let wrapper, entity, handleUpdate, handleSubmit;
  const ComponentWithEntity = withEntityEditor("entity", fragment)(Component);

  const render = (props = {}) =>
    shallow(
      <ComponentWithEntity
        entity={entity}
        onUpdate={handleUpdate}
        onSubmit={handleSubmit}
        {...props}
      />
    );

  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    entity = {
      id: "1",
      title: "foo",
      __typename: "Foo"
    };

    wrapper = render();
  });

  it("should have an appropriate displayName", () => {
    expect(ComponentWithEntity.displayName).toBe("withEntityEditor(Component)");
  });

  it("should put entity into state", () => {
    expect(wrapper.state("entity")).toEqual(entity);
  });

  it("should pass entity to wrapped component", () => {
    expect(wrapper.dive().prop("entity")).toEqual(entity);
  });

  it("should update state onChange", () => {
    const newValue = "foo1";
    wrapper.simulate("change", { name: "title", value: newValue });

    expect(wrapper.state("entity")).toEqual(
      expect.objectContaining({ title: newValue })
    );
  });

  it("should pass filtered entity to callback onUpdate", () => {
    wrapper.simulate("update");

    expect(handleUpdate).toHaveBeenCalledWith(filter(fragment, entity));
  });

  it("should pass filtered entity to callback onSubmit", () => {
    const preventDefault = jest.fn();
    wrapper.simulate("submit", { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith(filter(fragment, entity));
  });

  it("should update state when new entity passed via props", () => {
    const newEntity = { id: "2", title: "blah" };
    wrapper.setProps({ entity: newEntity });

    expect(wrapper.state("entity")).toEqual(newEntity);
  });

  it("should pass on any other props to wrapped component", () => {
    const newProps = { lol: "cats" };
    wrapper.setProps(newProps);

    expect(wrapper.props()).toEqual(expect.objectContaining(newProps));
  });
});
