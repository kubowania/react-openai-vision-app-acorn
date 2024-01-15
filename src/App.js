import Modal from "./components/Modal"

const App = () => {
  return (
    <div className="app">
      <section className="search-section">
        <div className="image-container">
          <img className="image" src={""} />
        </div>
        <p className="extra-info">
          <span>
            <label htmlFor="files" className="upload"> upload an image </label>
            <input id="files" accept="image/*" type="file" hidden />
          </span>
          to ask questions about.
        </p>
        <p>What do you want to know about the image?
          <button className="surprise">Surprise me</button>
        </p>
        <div className="input-container">
          <input
            value={""}
            placeholder="What is in the image..."
            onChange={""}
          />
          <button>Ask me</button>
        </div>
        <p className="answer">{""}</p>
        <div className="overlay">
          <Modal />
        </div>
      </section>
    </div>
  )
}

export default App