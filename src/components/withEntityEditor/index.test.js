import React from "react";
import withEntityEditor from "./";
import { shallow } from "enzyme";
import gql from "graphql-tag";
import { filter } from "graphql-anywhere";
import { SynchronousPromise } from "synchronous-promise";
import createMockStore from "tests/utils/createMockStore";

const Component = props => <div {...props} />;

const fragment = gql`
  fragment Entity on Entity {
    id
    title
  }
`;

describe("withEntityEditor", () => {
  let wrapper,
    entity,
    handleUpdate,
    handleSubmit,
    handleStartRequest,
    handleEndRequest;
  const ComponentWithEntity = withEntityEditor("entity", fragment)(Component);
  let store;

  const render = (props = {}) =>
    shallow(
      <ComponentWithEntity
        entity={entity}
        onUpdate={handleUpdate}
        onSubmit={handleSubmit}
        store={store}
        {...props}
      />
    ).dive();

  beforeEach(() => {
    handleUpdate = jest.fn(() => SynchronousPromise.resolve());
    handleSubmit = jest.fn(() => Promise.resolve());
    handleStartRequest = jest.fn();
    handleEndRequest = jest.fn();
    store = createMockStore();
    entity = {
      id: "1",
      title: "foo",
      __typename: "Foo"
    };

    wrapper = render();
  });

  it("should have an appropriate displayName", () => {
    expect(ComponentWithEntity.displayName).toBe(
      "Connect(withEntityEditor(Component))"
    );
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
    const newValue = "foo1";

    wrapper.simulate("change", { name: "title", value: newValue });
    wrapper.simulate("update");

    expect(handleUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ title: newValue })
    );
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

  it("should not update state when new entity with same id passed via props", () => {
    const newEntity = {
      id: "1",
      title: "bar",
      __typename: "Bar"
    };

    wrapper.setProps({ entity: newEntity });

    expect(wrapper.state("entity")).toEqual(entity);
  });

  it("should only update when state is dirty", () => {
    const newValue = "foo1";

    wrapper.simulate("update");

    expect(handleUpdate).not.toHaveBeenCalled();

    wrapper.simulate("change", { name: "title", value: newValue });
    wrapper.simulate("update");

    expect(handleUpdate).toHaveBeenCalled();
  });

  it("should call startRequest on Update and stopRequest Completion", () => {
    const newValue = "foo1";

    wrapper.setProps({
      startRequest: handleStartRequest,
      endRequest: handleEndRequest
    });
    wrapper.simulate("change", { name: "title", value: newValue });
    wrapper.simulate("update");

    expect(handleStartRequest).toHaveBeenCalled();
    expect(handleEndRequest).toHaveBeenCalled();
  });

  it("should call startRequest and stopRequest on failure", () => {
    const newValue = "foo1";
    handleUpdate = jest.fn(() =>
      SynchronousPromise.reject(new Error("message"))
    );
    const failingWrapper = render();
    failingWrapper.setProps({
      startRequest: handleStartRequest,
      endRequest: handleEndRequest
    });

    failingWrapper.simulate("change", { name: "title", value: newValue });
    failingWrapper.simulate("update");

    expect(handleStartRequest).toHaveBeenCalled();
    expect(handleEndRequest).toHaveBeenCalled();
  });

  it("should pass on any other props to wrapped component", () => {
    const newProps = { lol: "cats" };

    wrapper.setProps(newProps);

    expect(wrapper.props()).toEqual(expect.objectContaining(newProps));
  });
});
