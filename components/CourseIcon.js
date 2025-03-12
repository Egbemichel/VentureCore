const CourseIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 9V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V18V5C5 3.89543 5.89543 3 7 3H13M19 9L13 3M19 9H15C13.8954 9 13 8.10457 13 7V3M8 9H10M8 13H16M8 17H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CourseIcon;
