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

const Background = styled.div`
  background: #35415D;
`;

const links = [
  <Link href="#">Home</Link>,
  <Link href="#">Quarterly Business Survey</Link>
];

storiesOf("Breadcrumb", module).add("Default", () => (
  <Background>
    <Breadcrumb>
      {links}
    </Breadcrumb>
  </Background>
));
