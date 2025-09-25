import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-3xl text-teal-700 font-bold">Hello "/"!</div>;
}
