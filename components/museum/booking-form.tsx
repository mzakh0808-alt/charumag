"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { createBooking, type BookingFormState } from "@/app/actions/booking";

const initialState: BookingFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="button button-primary" disabled={pending}>{pending ? "Отправляем…" : "Отправить заявку"}</button>;
}

function Error({ errors }: { errors?: string[] }) {
  return errors?.length ? <span className="field-error">{errors[0]}</span> : null;
}

export function BookingForm({ minDate }: { minDate: string }) {
  const [state, formAction] = useActionState(createBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="form-grid">
      {state.message ? <div className={state.status === "success" ? "form-success" : "form-error"} role="status">{state.message}</div> : null}
      <div className="form-two">
        <div className="field">
          <label htmlFor="tour-date">Желаемая дата *</label>
          <input id="tour-date" name="preferredDate" className="input" type="date" min={minDate} required />
          <Error errors={state.fieldErrors?.preferredDate} />
        </div>
        <div className="field">
          <label htmlFor="tour-guests">Число гостей *</label>
          <input id="tour-guests" name="guestsCount" className="input" type="number" min="1" max="20" defaultValue="2" required />
          <Error errors={state.fieldErrors?.guestsCount} />
        </div>
      </div>
      <div className="form-two">
        <div className="field">
          <label htmlFor="tour-name">Имя *</label>
          <input id="tour-name" name="customerName" className="input" autoComplete="name" required />
          <Error errors={state.fieldErrors?.customerName} />
        </div>
        <div className="field">
          <label htmlFor="tour-phone">Телефон *</label>
          <input id="tour-phone" name="phone" className="input" type="tel" autoComplete="tel" required />
          <Error errors={state.fieldErrors?.phone} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="tour-email">Email, если нужен</label>
        <input id="tour-email" name="email" className="input" type="email" autoComplete="email" />
        <Error errors={state.fieldErrors?.email} />
      </div>
      <div className="field">
        <label htmlFor="tour-comment">Комментарий</label>
        <textarea id="tour-comment" name="comment" className="textarea" placeholder="Например, возраст детей или пожелания ко времени" />
      </div>
      <label className="checkbox-row">
        <input type="checkbox" name="consent" required />
        <span>Я соглашаюсь на <Link href="/privacy" className="underline" target="_blank">обработку персональных данных</Link> для записи на экскурсию *</span>
      </label>
      <Error errors={state.fieldErrors?.consent} />
      <div>
        <SubmitButton />
        <p className="mb-0 mt-3 text-xs text-[var(--muted)]">Заявка не бронирует место автоматически. Дату и время подтвердит администратор.</p>
      </div>
    </form>
  );
}
