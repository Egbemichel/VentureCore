const NotiIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 7.5V11.5M12 14V14.5M12 20C12 20 14 16 15 16C16 16 18 16 19 16C20 16 21 15 21 14C21 13 21 8 21 7C21 6 20 5 19 5C18 5 6 5 5 5C4 5 3 6 3 7C3 8 3 13 3 14C3 15 4 16 5 16C6 16 8 16 9 16C10 16 12 20 12 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NotiIcon;
