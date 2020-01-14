import React from "react";
import { Container, Header } from "semantic-ui-react";

const About = () => {
  return (
    <Container className="page">
      <Container>
        <Header
          as="h1"
          content="Why I made sweetearth"
          style={{ fontSize: "3em" }}
        ></Header>
        <p>
          sweetearth grew out of a conversation I had with a friend. I had flown
          to visit them, and felt some 'carbon shame' about my flight. We
          discussed purchasing carbon offsets, as a kind of indulgence. I
          researched some options, and was generally disappointed (in my options
          and my self; why had I not tried this sooner?). Where was the
          two-click carbon offset tool? I set out to build one.
        </p>
        <p>
          It turns out, building websites is non-trivial. My earliest prototype
          fell far short of the experience I had in mind. So, I took some time
          off to learn programming. It's been an incredibly rewarding
          experience. As a sort of capstone to my early education, I took a
          second crack at sweetearth. Thanks for checking it out. —G
        </p>
      </Container>
      <Container className="about-container">
        <div className="about-container-element">
          <Header
            as="h3"
            content="Purpose"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            The constraint of sweetearth is this: make a contribution to an
            accredited ecological project in as few clicks as possible. You can
            do so in 3 clicks, in fact. I hope the tool is easy enough to use
            that you feel more encouraged to help tend to our sweetearth by
            pledging contributions for impactful projects.
          </p>
        </div>
        <div className="about-container-element">
          <Header
            as="h3"
            content="Principles"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            I've done my best source ecological projects that are GoldStandard
            or Verified Carbon Standard certified and follow Drawdown
            guidelines. I've curated projects that have a direct ecological
            impact—think reforestation, instead of cleaner development. The only
            information I'll save from your pledge is your email, and I promise
            to never share it.
          </p>
        </div>
        <div className="about-container-element">
          <Header as="h3" content="Simple" style={{ fontSize: "2em" }}></Header>
          <p>
            There isn't much you can do on this site besides learn about the
            projects I've selected and make contributions to them. But, I
            encourage you to look into the work others are doing in this area.
            Our stewardship of our home, our sweetearth, is one of the great
            engineering and humanitarian challenges of our time.
          </p>
        </div>
        <div className="about-container-element">
          <Header
            as="h3"
            content="Growing"
            style={{ fontSize: "2em" }}
          ></Header>
          <p>
            I'm not sure what sweetearth will grow into (can we ever be sure?),
            but I am certain that it is a project I'll continue to hack on.
            There's much work to do, here. I've made the site code available on
            github, and I welcome the contributions of anyone else who is
            passionate about this kind of work.
          </p>
        </div>
      </Container>
    </Container>
  );
};

export default About;
