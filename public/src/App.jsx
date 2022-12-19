import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';

function App() {
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
      <header>
        <div className="navbar">
          <div className="logo">
            <h2>OpenAI Image Genrator</h2>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a href="https://beta.openai.com/docs" target="_blank">
                  OpenAI API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="showcase">
          <form id="image-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Describe An Image</h1>
            <div className="form-control">
              <input
                type="text"
                id="prompt"
                {...register('prompt')}
                placeholder="Enter Text"
              />
            </div>

            <div className="form-control">
              <select {...register('size')} id="size" defaultValue="medium">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="form-control">
              <select {...register('count')} id="count" defaultValue="1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Generate
            </button>
          </form>
        </section>

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

      <div className="spinner"></div>
    </>
  );
}

export default App;
