import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "../utils/react-auth0";
import { Container, Header, Button, Image, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Account = () => {
  const { loading, user, logout } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user && !userData) getUser();
  }, [user]);

  const getUser = async () => {
    // this function should take the authenticated user's email address, and use it to query the backend for the user's pledge history
    const endpoint = `http://localhost:3000/users/${user.email}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    setUserData(data);
  };

  const formatDate = pledge => {
    let yyyymmdd = pledge.created_at.split("T")[0].split("-");
    let [year, month, day] = yyyymmdd;
    let mmdd = `${month}/${day}`;
    return mmdd;
  };

  const projectUrl = name => {
    return "/projects/" + name.replace(/\s+/g, "-").toLowerCase();
  };

  const renderPledges = () => {
    if (userData) {
      return userData.pledges.map((pledge, idx) => {
        return (
          <Fragment>
            <Container key={idx} className="user-pledges">
              <Image src={pledge.project.imgUrl} style={{ width: "60%" }} />
              <Container className="user-pledges-text">
                <Header style={{ color: "#758E50", fontSize: "2em" }}>
                  ${pledge.amount / 100}
                </Header>
                <Header style={{ fontSize: "1.33em" }}>
                  on {formatDate(pledge)} for {pledge.project.name}
                </Header>
                <Button
                  as={Link}
                  to={projectUrl(pledge.project.name)}
                  style={{ alignSelf: "center" }}
                >
                  View Project
                </Button>
              </Container>
            </Container>
            <Divider style={{ width: "100%" }} />
          </Fragment>
        );
      });
    }
  };

  return loading || !user ? (
    <div>Loading...</div>
  ) : (
    <Container className="page">
      <Header
        as="h1"
        content="Your Account"
        style={{ fontSize: "3em" }}
      ></Header>
      <p style={{ fontSize: "1.33em" }}>
        This is your account page. Here, you can see a history of your pledges,
        or log out.
      </p>
      <Button className="logout-button" onClick={() => logout()}>
        Log out
      </Button>
      <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
      <Container className="account">
        <Header
          as="h1"
          content="Your Pledge History"
          style={{ fontSize: "3em" }}
        ></Header>
        <p style={{ fontSize: "1.33em" }}>
          You've pledged {userData ? userData.pledges.length : 0} times.
        </p>
        <Divider style={{ width: "100%" }} />
        {renderPledges()}
      </Container>
    </Container>
  );
};

export default Account;
