export default function SearchIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M14.6569 14.6569L19 19M8 5C10.7614 5 13 7.23858 13 10M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
        stroke="gray"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
