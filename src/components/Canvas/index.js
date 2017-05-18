import React from "react";
import styled from "styled-components";

const Canvas = styled.div`
  display: flex;
`;

export default (props) =>
  <Canvas>
    {props.children}
  </Canvas>;
