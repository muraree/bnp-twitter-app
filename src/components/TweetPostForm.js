import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const TweetPostForm = props =>
  <div className="tweet-post-form">
    <Form onSubmit={props.createNewTweet} inline>
      <FormGroup controlId="formInlineUrl">
        <ControlLabel>Video URL:</ControlLabel>{' '}
        <FormControl
          type="text"
          placeholder="http://youtube.com"
          name="url"
          onChange={e => props.handleChange(e.target.name, e.target.value)}
        />
      </FormGroup>{' '}
      <FormGroup controlId="formInlineComment">
        <ControlLabel>Comment:</ControlLabel>{' '}
        <FormControl
          type="text"
          name="comment"
          onChange={e => props.handleChange(e.target.name, e.target.value)}
        />
      </FormGroup>{' '}
      <Button bsStyle="info" type="submit">Tweet to #nowplaying</Button>
    </Form>
  </div>;

export default TweetPostForm;
