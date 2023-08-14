"use client";

import { Hydrate } from "@tanstack/react-query";

import { ReactNode } from "react";

interface HydrateClientProps {
  children: ReactNode;
  state: any;
}

const HydrateClient = ({ children, state }: HydrateClientProps) => {
  return <Hydrate state={state}>{children}</Hydrate>;
};

export default HydrateClient;
