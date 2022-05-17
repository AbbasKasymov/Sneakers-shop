import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { adminContext } from "../contexts/AdminContext";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AdminProductCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = React.useContext(adminContext);
  const { deleteProduct } = data;

  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="194"
          image={item.image}
          alt={item.type}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {item.subtype}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`/admin-panel/edit/${item.id}`}>
            <Button
              variant="contained"
              style={{
                background: "black",
                marginRight: "10px",
              }}
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="contained"
            style={{ background: "black" }}
            onClick={() => deleteProduct(item.id)}
          >
            Delete
          </Button>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.brand}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.subtype}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.desc}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.releaseDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.colorway}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.sizes}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.menOrWomen}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.price}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
