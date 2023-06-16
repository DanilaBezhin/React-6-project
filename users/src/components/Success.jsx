import React from 'react';

export const Success = ({ count, reLoadPage }) => {
  return (
    <div class="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      {/* count хранит количество приглашенных пользователей */}
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button onClick={reLoadPage} className="send-invite-btn">Назад</button>
    </div>
  );
};
