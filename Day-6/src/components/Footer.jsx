function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} My React App. All rights reserved.
        </p>
        <small>This is a footer component.</small>
      </div>
    </footer>
  )
}

export default Footer
