import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Pearly Sky</h1>
      <p className="max-w-md text-muted-foreground">
        Rebuild in progress — this is the auth vertical slice, wired end-to-end against
        the NestJS API.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/services">Browse services</Link>
        </Button>
      </div>
    </div>
  );
}
