import _ from "lodash";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

const ResponsiveNav = props => {
  const NavBarMobile = ({
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible
  }) => (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        items={leftItems}
        vertical
        visible={visible}
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "50vh" }}
      >
        <Menu fixed="top">
          <Menu.Item>
            <Image
              size="mini"
              src="https://image.flaticon.com/icons/svg/2439/2439044.svg"
            />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {_.map(rightItems, item => (
              <Menu.Item {...item} />
            ))}
          </Menu.Menu>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );

  const NavBarDesktop = ({ leftItems, rightItems }) => (
    <Menu fixed="top">
      <Menu.Item>
        <Image
          size="mini"
          src="https://image.flaticon.com/icons/svg/2439/2439044.svg"
        />
      </Menu.Item>
      {_.map(leftItems, item => (
        <Menu.Item {...item} />
      ))}
      <Menu.Menu position="right">
        {_.map(rightItems, item => (
          <Menu.Item {...item} />
        ))}
      </Menu.Menu>
    </Menu>
  );

  const NavBarChildren = ({ children }) => (
    <Container style={{ marginTop: "5em" }}>{children}</Container>
  );

  const NavBar = props => {
    const { children } = props;
    const [visible, setVisible] = useState(false);

    const handlePusher = () => {
      if (visible) setVisible(false);
    };

    const handleToggle = () => setVisible(!visible);

    const leftItems = [
      { as: "a", content: "Home", key: "home" },
      { as: "a", content: "Users", key: "users" }
    ];
    const rightItems = [
      { as: "a", content: "Login", key: "login" },
      { as: "a", content: "Register", key: "register" }
    ];

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={handlePusher}
            onToggle={handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  };

  return NavBar();
};

export default ResponsiveNav;
