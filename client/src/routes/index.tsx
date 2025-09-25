import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-3xl text-teal-700 font-bold">
      <p>Hello "/"!</p>

      <div className="mt-8 flex gap-4">
        <Button>shadcn button</Button>
        <Button variant={"destructive"}>shadcn destructive button</Button>
      </div>
    </div>
  );
}
