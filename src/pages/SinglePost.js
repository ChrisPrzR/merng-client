import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import {
  Card,
  Grid,
  Icon,
  Button,
  Label,
  Image,
  Form,
  Popup,
} from "semantic-ui-react";
import { DeleteButton } from "../components/DeleteButton";
import { LikeButton } from "../components/LikeButton";

import { AuthContext } from "../context/auth";

export const SinglePost = (props) => {
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const postId = props.match.params.postId;

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
    onError(err) {
      return err;
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  let postMarkup;

  if (!getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      image,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;


    postMarkup = (
      <Grid centered container>
        <Grid.Row>
          <Grid.Column >
            <Card fluid>
              <Card.Content>
                {image && 
                  <Image
                  avatar
                  floated="left"
                  size="big"
                  src={image}
                  />
                }
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
                <hr />
                <Card.Content>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <Popup
                    content="Add a comment"
                    inverted
                    trigger={
                      <Button as="div" labelPosition="right">
                        <Button basic color="blue">
                          <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                          {commentCount}
                        </Label>
                      </Button>
                    }
                  />
                  {(user && user.username) === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card.Content>
            </Card>
            {user && (
              <Card.Content>
                <Card fluid>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment here..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card>
              </Card.Content>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {(user && user.username) === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      image
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
