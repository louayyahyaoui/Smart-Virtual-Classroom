import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecomandedCourses,
  selectRecomandedCourses,
} from "../../redux/slices/recomandationslice";
import Recomandation from "./Recomandation";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Button } from "@material-ui/core";
import { Header, Icon } from "semantic-ui-react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "+3%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
width: 38,
  },
}));

function ListRecomandedCourses() {
    const currentUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecomandedCourses(currentUser._id));
  }, [dispatch]);
  const [RcomandedCourses] = useSelector(selectRecomandedCourses);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
     <Header as='h2' icon textAlign='center'>
      <Icon name='check circle' circular color="green"/>
      <Header.Content>Recomanded courses</Header.Content>
    </Header>
      {RcomandedCourses.map((Recomandedcourse, index) => (
        <Card className={classes.root}>
          <CardMedia
            className={classes.cover}
            image={Recomandedcourse.image_480x270}
            title="Live from space album cover"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {Recomandedcourse.title}{" "}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {Recomandedcourse.headline}
              </Typography>
            </CardContent>
            <div className={classes.controls}>


            <Button size="small" color="primary">
            <a href={`https://www.udemy.com${Recomandedcourse.url}`} target="_blanc">
              Learn More
            </a>
          </Button>
        </div>
          </div>
        </Card>
      ))}
    </>
  );
}
export default ListRecomandedCourses;
