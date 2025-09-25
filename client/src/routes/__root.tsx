import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <div className="flex underline gap-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
