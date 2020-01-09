import React, { useState, useEffect } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectCard = props => {
  const { name, description, category, imgUrl, siteUrl } = props.project;

  const projectUrl = () => {
    return "/projects/" + name.replace(/\s+/, "-").toLowerCase();
  };

  const handleContext = () => {
    switch (props.context) {
      case "pledge":
        return (
          <Button
            primary
            content="Pledge"
            onClick={() => props.pickProject(props.project)}
          ></Button>
        );
      case "index":
        return (
          <Button
            primary
            content="Learn More"
            as={Link}
            to={projectUrl()}
          ></Button>
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

{
  /* <Card.Content extra>
  <a href={siteUrl} target="_blank">
    <Icon name="external alternate" />
    More Info
  </a>
</Card.Content> */
}

{
  /* <Button
    primary
    content="Learn More"
    as={Link}
    to={projectUrl()}
  ></Button> */
}
