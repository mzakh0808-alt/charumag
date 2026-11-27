import Link from "next/link";

export default function NotFound() {
  return (
    <main className="narrow section">
      <div className="empty-state not-found text-center">
        <span className="not-found-code">404</span>
        <h1>Такой страницы нет</h1>
        <p className="muted">Возможно, адрес изменился или товар был снят с публикации.</p>
        <Link href="/" className="button button-primary">На главную</Link>
      </div>
    </main>
  );
}
