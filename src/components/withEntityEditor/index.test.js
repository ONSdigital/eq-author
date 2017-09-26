import React from "react";
import withEntityEditor from "./";
import { shallow } from "enzyme";
import { gql } from "react-apollo";

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

  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    entity = {
      id: "1",
      title: "foo"
    };

    wrapper = shallow(
      <ComponentWithEntity
        entity={entity}
        onUpdate={handleUpdate}
        onSubmit={handleSubmit}
      />
    );
  });

  it("should have an appropriate displayName", () => {
    expect(ComponentWithEntity.displayName).toBe("withEntityEditor(Component)");
  });

  it("should filter out unknown fields", () => {
    wrapper.setProps({
      entity: {
        ...entity,
        extraProp: false
      }
    });
    expect(wrapper.state("entity").extraProp).toBeUndefined();
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

  it("should pass entity to callback onUpdate", () => {
    wrapper.simulate("update");

    expect(handleUpdate).toHaveBeenCalledWith(expect.objectContaining(entity));
  });

  it("should pass entity to callback onSubmit", () => {
    const preventDefault = jest.fn();
    wrapper.simulate("submit", { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining(entity));
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
