import React, { Fragment, useContext } from "react";
import { store } from "../store";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectCard = props => {
  const { project } = props;
  const { dispatch } = useContext(store);
  const { name, description, category, imgUrl } = project;

  const projectUrl = () => {
    return "/projects/" + name.replace(/\s+/g, "-").toLowerCase();
  };

  const checkoutProject = () => {
    dispatch({ type: "checkout", payload: project });
  };

  const handleContext = () => {
    switch (props.page) {
      case "pledge":
        return (
          <Fragment>
            <Button
              primary
              content="Pledge"
              onClick={() => checkoutProject()}
            ></Button>
            <Button
              content="Learn More"
              as={Link}
              to={projectUrl()}
              style={{ marginTop: "10px" }}
            ></Button>
          </Fragment>
        );
      case "projects":
        return (
          <Button content="Learn More" as={Link} to={projectUrl()}></Button>
        );
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <Card>
      <Image src={imgUrl}></Image>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{category}</Card.Meta>
        <Card.Description>{description}</Card.Description>
        {handleContext()}
      </Card.Content>
    </Card>
  );
};

export default ProjectCard;
