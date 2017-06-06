import React from "react";
import { storiesOf } from "@kadira/storybook";
import styled from "styled-components";
import Breadcrumb from "components/Breadcrumb";

const Link = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

const links = [
  <Link href="#" key="hello">Hello</Link>,
  <Link href="#" key="world">World</Link>
];

storiesOf("Breadcrumb", module).add("Default", () => (
  <Breadcrumb links={links} />
));
