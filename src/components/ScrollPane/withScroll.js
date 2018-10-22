import React, { createContext } from "react";

export const ScrollContext = createContext(0);

export function withScroll(Component) {
  return function ThemedComponent(props) {
    return (
      <ScrollContext.Consumer>
        {scroll => {
          console.log(scroll);

          return <Component {...props} scroll={scroll} />;
        }}
      </ScrollContext.Consumer>
    );
  };
}
