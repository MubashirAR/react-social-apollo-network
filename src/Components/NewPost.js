import React, { useState } from 'react';
import * as yup from 'yup';
import Form from 'react-formal';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST_MUTATION } from '../services/post';
import { useHistory } from 'react-router-dom';
import { GET_FEED_QUERY } from '../services/feed';

export default ({refetchData}) => {
  const modelSchema = yup.object({
    text: yup.string().required('Please enter some text'),
    postType: yup.string().required('Post type is required'),
  });
  const [model, setModel] = useState({
    postType: 'post',
    text: '',
  });
  const [createPost, { client }] = useMutation(CREATE_POST_MUTATION);
  const history = useHistory();
  const submit = async () => {
    const { data, errors } = await createPost({
      variables: model,
    });
    if (data) {
      const oldFeed = client.readQuery({ query: GET_FEED_QUERY });
      const newFeed = [...oldFeed.feed, data.addPost];
      client.writeData({
        query: GET_FEED_QUERY,
        data: [...oldFeed.feed, data.addPost],
      });
      refetchData()
    } else {
      console.log(errors);
    }
  };
  return (
    <Form className="w-100" schema={modelSchema} value={model} onSubmit={(e) => submit()} onChange={(model) => setModel(model)}>
      <Form.Field className="form-control mt-3 w-100" name="text" placeholder="Your Post"></Form.Field>
      <Form.Submit className="btn btn-primary mt-3" type="submit">
        Publish
      </Form.Submit>
    </Form>
  );
};
