import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from '../context/auth'
import FETCH_POSTS_QUERY from "../utils/queries/graphql-getPosts";

import PostCard  from '../components/PostCard';
import {PostForm}  from '../components/PostForm';



export const Home = () => {
  const { user } = useContext(AuthContext)
  const {
    loading,
    data: { getPosts: posts } = {}
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid stackable columns={2}>
        <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
        </Grid.Row>
        {
          user && (
            <Grid.Column>
              <PostForm/>
            </Grid.Column>
          )
        }
        <Grid.Row>
            {loading ? (
            <h1>Loading posts...</h1>
            ) : (
            <Transition.Group>
              {
                posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{marginBottom: 20}}>
                      <PostCard post={post} />
                  </Grid.Column>
                ))
              }
            </Transition.Group>
            )}
        </Grid.Row>
    </Grid>
  );
};

export default Home;
