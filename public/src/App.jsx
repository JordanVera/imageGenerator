import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';

function App() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    const { prompt, size } = data;
    console.log({ prompt, size });

    if (prompt === '') {
      alert('Please add more text');
      return;
    }

    generateImageRequest(prompt, size);
  };

  async function generateImageRequest(prompt, size) {
    try {
      setLoading(true);
      setImageURL('');
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
            <button type="submit" className="btn">
              Generate
            </button>
          </form>
        </section>

        <section className="image">
          <div className="image-container">
            <h2 className="msg">{errorMessage}</h2>
            <img src={imageURL} alt="" id="image" />
          </div>
        </section>
      </main>

      <div className="spinner"></div>
    </>
  );
}

export default App;
