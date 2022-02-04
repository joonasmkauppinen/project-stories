import { IconProps } from './IconProps';

export const IconText = ({ fill }: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 2V5H5V3H9V16H7V17H13V16H11V3H15V5H17V2H3Z" fill={fill} />
  </svg>
);
