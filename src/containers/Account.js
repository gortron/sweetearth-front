import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "../utils/react-auth0";
import { Container, Header, Button, Image, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getUser } from "../utils/queries";

const Account = () => {
  const { loading, user, logout } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getAndSetUserData = async () => {
      const data = await getUser(`/users/${user.email}`);
      setUserData(data);
    };
    if (user && !userData) getAndSetUserData();
  }, [user]);

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
              <Image
                rounded
                src={pledge.project.imgUrl}
                style={{ width: "60%" }}
              />
              <Container className="user-pledges-text">
                <Header as="h4" style={{ color: "#758E50", fontSize: "2em" }}>
                  ${pledge.amount / 100}
                </Header>
                <Header as="h5" style={{ fontSize: "1.33em" }}>
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

  return (
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
      <Button negative className="logout-button" onClick={() => logout()}>
        Log out
      </Button>
      <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
      {loading || !userData ? (
        <div>
          <p>Your pledges will appear here, once you've made one.</p>
        </div>
      ) : (
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
      )}
    </Container>
  );
};

export default Account;
