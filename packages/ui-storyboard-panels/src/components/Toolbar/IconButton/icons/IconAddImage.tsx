import { IconProps } from './IconProps';

export const IconAddImage = ({ fill }: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 1H17V3H19V4H17V6H16V4H14V3H16V1Z" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 10.0986L10.9343 16H17V8H18V17H3V2H12V3H4V14.5986L7 10.0986ZM9.73241 16L7 11.9014L4.26759 16H9.73241Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 9C13 10.1046 12.1046 11 11 11C9.89543 11 9 10.1046 9 9C9 7.89543 9.89543 7 11 7C12.1046 7 13 7.89543 13 9ZM12 9C12 9.55228 11.5523 10 11 10C10.4477 10 10 9.55228 10 9C10 8.44772 10.4477 8 11 8C11.5523 8 12 8.44772 12 9Z"
      fill={fill}
    />
  </svg>
);
