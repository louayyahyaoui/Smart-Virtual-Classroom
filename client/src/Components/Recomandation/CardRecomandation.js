import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 100,
  },
});

export default function CardRecomandation({ recomanded }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <a href={`https://www.udemy.com${recomanded.url}`} target="_blanc">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={recomanded.image_480x270}
            title={recomanded.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h4">
              {recomanded.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {recomanded.headline}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <a href={`https://www.udemy.com${recomanded.url}`} target="_blanc">
              Learn More
            </a>
          </Button>
        </CardActions>
      </a>
    </Card>
  );
}
