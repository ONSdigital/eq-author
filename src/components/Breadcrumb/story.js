import React from "react";
import { storiesOf } from "@kadira/storybook";
import styled from "styled-components";
import Breadcrumb from "components/Breadcrumb";

const Link = styled.a`
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

const links = [
  <Link href="#" key="hello">Hello</Link>,
  <Link href="#" key="world">World</Link>
];

const StyledDiv = styled.div`
  background: #35415D;
`;

const links = [
  <Link href="#">Home</Link>,
  <Link href="#">Quarterly Business Survey</Link>
];

storiesOf("Breadcrumb", module).add("Default", () => (
  <StyledDiv>
    <Breadcrumb links={links} />
  </StyledDiv>
));
