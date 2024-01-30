import { useState } from "react"

const App = () => {
  const [image, setImage] = useState(null)
  const [value, setValue] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const surpriseOptions = [
    'Does the image have a whale?',
    'Is the image fabulously pink?',
    'Does the image have puppies?'
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const uploadImage = async (e) => {
    setResponse(null)
    const formData = new FormData()
    //we created a form in case you want to append more info to the formData
    formData.append('file', e.target.files[0])
    setImage(e.target.files[0])
    e.target.value = null
    try {
      const options = {
        method: "POST",
        body: formData
      }
      const response = await fetch('http://localhost:8000/upload', options)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
      setError("Something didn't work. Please try again!")
    }
  }

  const analyzeImage = async () => {
    setResponse(null)
    if (!image) {
      setError('Error! Must have an existing image')
      return
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-type": "application/json"
        }
      }
      const response = await fetch('http://localhost:8000/vision', options)
      const data = await response.json()
      console.log(data.message.content)
      setResponse(data.message.content)
    } catch (error) {
      console.error(error)
      setError("Something didn't work. Please try again!")
    }
  }

  const clear = () => {
    setImage(null)
    setResponse("")
    setValue("")
    setError("")
  }


  return (
    <div className="app">
      <section className="search-section">
        <div className="image-container">
          {image && <img className="image" src={URL.createObjectURL(image)} />}
        </div>
        <p className="extra-info">
          <span>
            <label htmlFor="files" className="upload"> upload an image </label>
            <input onChange={uploadImage} id="files" accept="image/*" type="file" hidden />
          </span>
          to ask questions about.
        </p>
        <p>What do you want to know about the image?
          <button className="surprise" onClick={surprise} disabled={response}>Surprise me</button>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="What is in the image..."
            onChange={e => setValue(e.target.value)}
          />
          {(!response && !error) && <button onClick={analyzeImage}>Ask me</button>}
          {(response || error) && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        {response && <p className="answer">{response}</p>}
      </section>
    </div>
  )
}

export default App
