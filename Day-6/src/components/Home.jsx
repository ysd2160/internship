function Home() {
  return (
    <main className="py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text part */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="mb-3">Welcome to My App</h1>
            <p className="lead">
              This is a component.
            </p>
            <p>
             
            </p>
          </div>

          {/* Image part */}
          <div className="col-md-6 text-center">
            {/* Placeholder image */}
            <img
              src="src\components\pizza combo.avif"
              alt="Placeholder"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
