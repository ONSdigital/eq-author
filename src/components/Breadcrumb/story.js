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
  <Link key="1" href="#">Home</Link>,
  <Link key="2" href="#">Quarterly Business Survey</Link>
];

storiesOf("Breadcrumb", module).add("Default", () =>
  <Background>
    <Breadcrumb>
      {links}
    </Breadcrumb>
  </Background>
);
