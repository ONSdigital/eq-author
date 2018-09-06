import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { TransitionGroup } from "react-transition-group";
import FadeTransition from "components/FadeTransition";
import { gotoTab } from "redux/tabs/actions";

import Modal from "components/Modal";
import { Grid, Column } from "components/Grid";
import Button from "components/Button";

import BaseTabs from "components/BaseTabs";

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

const TabPanel = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

const TabList = styled.ul`
  list-style: none;
  margin: 0 0 1em;
  padding: 0;
`;

const TabsItem = styled.li`
  margin: 0;
  padding: 0;
`;

const TabsBtn = styled.button`
  --color-text: ${colors.darkGrey};
  color: var(--color-text);
  margin: 0;
  padding: 0.5em 2em;
  appearance: none;
  font-size: 1em;
  width: 100%;
  display: block;
  border: none;
  background: rgba(0, 0, 0, 0);
  text-align: left;
  cursor: pointer;

  &:hover {
    --color-text: ${colors.white};
    background: ${colors.secondary};
  }

  &:focus {
    outline: 3px solid ${colors.orange};
    outline-offset: -3px;
  }

  &:active {
    outline: none;
  }

  &[aria-selected="true"] {
    --color-text: ${colors.black};
    background: ${colors.orange};
    pointer-events: none;
    &::before {
      filter: invert(80%);
    }
  }
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
  const navItemsWithRender = navItems.map(item => ({
    ...item,
    render: () => (
      <Column cols={9} gutters={false}>
        <MainContainer>
          <Content>
            <TabPanel navItemId={item.id} data-test="tabs-body">
              <TransitionGroup component={Content}>
                <FadeTransition key={item.id} enter exit={false}>
                  {item.component}
                </FadeTransition>
              </TransitionGroup>
            </TabPanel>
          </Content>
          <Buttons>
            <Button onClick={onClose} variant="primary" data-test="btn-done">
              Done
            </Button>
          </Buttons>
        </MainContainer>
      </Column>
    )
  }));
  return (
    <Dialog onClose={onClose} isOpen={isOpen} {...otherProps}>
      <Grid fillHeight>
        <BaseTabs
          activeId={activeTabId}
          onChange={tabId => gotoTab(id, tabId)}
          buttonRender={(props, item) => (
            <TabsItem {...props}>
              <TabsBtn>{item.title}</TabsBtn>
            </TabsItem>
          )}
          TabList={({ children }) => (
            <Column cols={3} gutters={false}>
              <Sidebar>
                <SidebarHeader>
                  <SidebarTitle data-test="sidebar-title">{title}</SidebarTitle>
                </SidebarHeader>
                <TabList>{children}</TabList>
              </Sidebar>
            </Column>
          )}
          tabs={navItemsWithRender}
        />
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
