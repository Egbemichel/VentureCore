// Heading Component
const Heading = ({ text, color, fontSize }) => {
  return (
    <h2 className={`text-${color}-500 ml-4`} style={{ fontSize }}>
      {text}
    </h2>
  );
};

export default Heading;
