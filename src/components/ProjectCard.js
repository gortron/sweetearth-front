import React, { useState, useEffect, Fragment } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectCard = props => {
  const { project, checkoutProject } = props;
  const { name, description, category, imgUrl, siteUrl } = project;

  const projectUrl = () => {
    return "/projects/" + name.replace(/\s+/g, "-").toLowerCase();
  };

  const handleContext = () => {
    switch (props.context) {
      case "pledge":
        return (
          <Fragment>
            <Button
              primary
              content="Pledge"
              onClick={() => checkoutProject(project)}
            ></Button>
            <Button
              content="Learn More"
              as={Link}
              to={projectUrl()}
              style={{ marginTop: "10px" }}
            ></Button>
          </Fragment>
        );
      case "index":
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
