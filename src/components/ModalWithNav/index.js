import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { find } from "lodash";

import { TransitionGroup } from "react-transition-group";
import FadeTransition from "components/FadeTransition";
import { gotoTab } from "redux/tabs/actions";

import Modal from "components/Modal";
import { TabsNavItem, TabsNav, TabsBody } from "./Tabs";
import { Grid, Column } from "components/Grid";
import Button from "components/Button";

import { colors } from "constants/theme";

const Dialog = styled(Modal)`
  .Modal {
    width: 60em;
    padding: 0;
  }
`;

const Sidebar = styled.div`
  background: ${colors.lighterGrey};
  height: 100%;
`;

const SidebarHeader = styled.div`
  height: 4.3em;
  padding: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const SidebarTitle = styled.h2`
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9em;
  margin: 0;
  text-align: center;
  color: ${colors.text};
`;

const MainContainer = styled.div`
  padding: 2em 3em;
  min-height: 30em;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const UnconnectedModalWithNav = ({
  title,
  onClose,
  navItems,
  activeTabId,
  gotoTab,
  isOpen,
  id,
  ...otherProps
}) => {
  const activeItem = find(navItems, { id: activeTabId || navItems[0].id });

  return (
    <Dialog onClose={onClose} isOpen={isOpen} {...otherProps}>
      <Grid fillHeight>
        <Column cols={3} gutters={false}>
          <Sidebar>
            <SidebarHeader>
              <SidebarTitle data-test="sidebar-title">{title}</SidebarTitle>
            </SidebarHeader>
            <TabsNav title={title}>
              {navItems.map(item => (
                <TabsNavItem
                  key={item.id}
                  controls={item.id}
                  active={item.id === activeTabId}
                  data-test={"tabs-nav-item"}
                  onClick={() => gotoTab(id, item.id)}
                >
                  {item.title}
                </TabsNavItem>
              ))}
            </TabsNav>
          </Sidebar>
        </Column>
        <Column cols={9} gutters={false}>
          <MainContainer>
            <Content>
              <TabsBody navItemId={activeItem.id} data-test="tabs-body">
                <TransitionGroup component={Content}>
                  <FadeTransition key={activeItem.id} enter exit={false}>
                    {activeItem.component}
                  </FadeTransition>
                </TransitionGroup>
              </TabsBody>
            </Content>
            <Buttons>
              <Button onClick={onClose} variant="primary" data-test="btn-done">
                Done
              </Button>
            </Buttons>
          </MainContainer>
        </Column>
      </Grid>
    </Dialog>
  );
};

UnconnectedModalWithNav.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  gotoTab: PropTypes.func.isRequired,
  activeTabId: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  )
};

UnconnectedModalWithNav.defaultProps = {
  isOpen: false
};

const mapStateToProps = (state, ownProps) => ({
  activeTabId: state.tabs[ownProps.id]
});

export default connect(
  mapStateToProps,
  { gotoTab }
)(UnconnectedModalWithNav);
