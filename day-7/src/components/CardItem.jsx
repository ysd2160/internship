const CardItem = ({ title, description, category }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <span className="badge bg-primary mb-2">{category}</span>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
