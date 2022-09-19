import React from "react";
import { Radio } from "./List";

type listItemProps = {
  radio: Radio;
};
export default function ListItem({ radio }: listItemProps) {
  return <li>{radio.name}</li>;
}
