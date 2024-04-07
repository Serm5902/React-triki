import { PropTypes } from "prop-types";

// Function Square
export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.isRequired,
  isSelected: PropTypes.isRequired,
  updateBoard: PropTypes.isRequired,
  index: PropTypes.isRequired,
};
