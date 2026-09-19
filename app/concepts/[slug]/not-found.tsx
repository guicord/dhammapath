import Link from "next/link";

export default function ConceptNotFound() {
  return (
    <div className="wrap">
      <h1>Concept not found</h1>
      <p>We couldn&rsquo;t find a concept at that address.</p>
      <Link href="/">← Back to the map</Link>
    </div>
  );
}
