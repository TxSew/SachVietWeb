import React, { ReactElement } from "react";
interface Props {
  src: string;
  alt: string;
  width: string;
  height: string;
}
export default function Image(props: Props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
}
