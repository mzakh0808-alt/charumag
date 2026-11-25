import Link from "next/link";

export default function NotFound() {
  return (
    <main className="narrow section">
      <div className="empty-state text-center">
        <span className="serif text-6xl text-[var(--pine)]">404</span>
        <h1 className="serif mb-3 mt-4 text-3xl font-medium">Такой страницы нет</h1>
        <p className="muted">Возможно, адрес изменился или товар был снят с публикации.</p>
        <Link href="/" className="button button-primary">На главную</Link>
      </div>
    </main>
  );
}
