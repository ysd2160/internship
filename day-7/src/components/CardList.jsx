import CardItem from "./CardItem";

const CardList = () => {
  const data = [
    {
      title: "Learn React",
      description: "A JavaScript library for building user interfaces.",
      category: "Education",
    },
    {
      title: "Buy Groceries",
      description: "Milk, bread, fruits, and other essentials.",
      category: "Task",
    },
    {
      title: "Gym Workout",
      description: "Daily routine for a healthy lifestyle.",
      category: "Fitness",
    },
    {
      title: "Watch Movie",
      description: "Relax and enjoy your evening.",
      category: "Entertainment",
    },
    {
      title: "Study Cloud Computing",
      description: "Learn AWS, Azure, and Google Cloud basics.",
      category: "Education",
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Reusable Cards</h2>
      <div className="row">
        {data.map((item, index) => (
          <CardItem
            key={index}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
