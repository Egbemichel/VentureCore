const WikiIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 3.51212C14.0617 3.18046 13.0519 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.3126 20.9229 10.6432 20.777 10M9.9565 9.90251C10.121 9.43488 10.4458 9.04057 10.8732 8.7894C11.3007 8.53823 11.8033 8.44641 12.292 8.53022C12.7806 8.61402 13.2239 8.86804 13.5432 9.24727C13.8625 9.6265 14.0372 10.1065 14.0365 10.6022C14.0365 12.0016 12.6928 12.0016 12 13.0511M11.993 15.5H12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WikiIcon;
