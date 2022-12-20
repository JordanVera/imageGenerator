import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Button,
} from '@mui/material';
import Spinner from './Spinner';

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    const { prompt, size, count } = data;
    console.log({ prompt, size, count });

    if (prompt === '') {
      alert('Please add more text');
      return;
    }

    generateImageRequest(prompt, size, count);
  };

  async function generateImageRequest(prompt, size, count) {
    try {
      setLoading(true);
      setImageURL([]);
      setErrorMessage('');

      const response = await fetch(
        'http://localhost:5555/openai/generateimage',
        {
          method: 'POST',
          headers: {
            'content-type': 'Application/json',
          },
          body: JSON.stringify({
            prompt,
            size,
            count,
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error('that image could not be generated');
      }

      setLoading(false);

      const data = await response.json();
      const url = data.data;

      setImageURL(url);

      console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <main>
        <Box className="showcase">
          <h1>Describe An Image</h1>
          <form id="image-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ my: 2 }} required>
              <TextField
                className="input"
                label="Enter text"
                variant="outlined"
                {...register('prompt')}
              />
            </FormControl>
            <FormControl sx={{ my: 2 }} required>
              <InputLabel id="sizeLabel">Size</InputLabel>
              <Select
                className="input"
                labelId="sizeLabel"
                id="size"
                label="Size"
                {...register('size')}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ my: 2 }} required>
              <InputLabel id="countLabel">Count</InputLabel>
              <Select
                className="input"
                labelId="countLabel"
                id="count"
                label="count"
                {...register('count')}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained">
              Generate
            </Button>
          </form>
        </Box>

        <section className="image">
          <div className="image-container">
            <h2 className="msg">{errorMessage}</h2>
            {imageURL.length > 0
              ? imageURL.map((img) => {
                  return <img src={img.url} alt="" id="image" />;
                })
              : null}
          </div>
        </section>
      </main>
    </>
  );
};
export default Form;
