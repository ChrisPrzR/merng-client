import React, { useContext } from "react";
import moment from "moment";
import { Card, Image, Icon, Label, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {LikeButton} from './LikeButton'
import {AuthContext} from '../context/auth'
import { DeleteButton } from "./DeleteButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes, image   },
    }) => {

    const { user } = useContext(AuthContext)

  return (
    <Card fluid>
        <Card.Content>
            {image && 
            <Image
              avatar
              floated="left"
              size="big"
              src={image}
            />}
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/post/${id}`}>
            {moment(createdAt).fromNow()}
            </Card.Meta>
            <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }}/>
            <Popup 
            content="Comment on post"
            inverted
            trigger={
              <Button labelPosition="right" as={Link} to={`/post/${id}`}>
              <Button color="blue" basic>
                  <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                  {commentCount}
              </Label>
              </Button>
            }
            />
            {user && user.username === username && <DeleteButton postId={id}/>}
        </Card.Content>
    </Card>
  );
};

export default PostCard;
