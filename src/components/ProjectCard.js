import React, { useState, useEffect } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";

const ProjectCard = props => {
  const { name, description, category, imgUrl, siteUrl } = props.project;

  return (
    <Card>
      <Image src={imgUrl}></Image>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{category}</Card.Meta>
        <Card.Description>{description}</Card.Description>
        <Card.Content extra>
          <a href={siteUrl} target="_blank">
            <Icon name="external alternate" />
            More Info
          </a>
        </Card.Content>
        <Button
          primary
          content="Pledge"
          onClick={() => props.pickProject(props.project)}
        ></Button>
      </Card.Content>
    </Card>
  );
};

export default ProjectCard;
