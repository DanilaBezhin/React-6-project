import React, { useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  // пользователи
  const [users, setUsers] = useState([])

  // пользователи в массиве добавленных для приглашения
  const [invites, setInvites] = useState([])

  // загрузка с api
  const [isLoading, setLoading] = useState(true)

  // value для реализации поиска
  const [searchValue, setSearchValue ] = useState('')

  // отображаем ли финальную страницу ?
  const [success, setSuccess] = useState(false)

  // title в зависимости от invites.length
  const [title, setTitle] = useState('')

  // обрабатываем данные с api
  useEffect(() => {
    fetch('https://reqres.in/api/users')
    .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получении данных с сервера')
        // после окончания загрузки меняем состояние загрузки на false
      }).finally(() => setLoading(false));
  }, []);

  // функция для получения value и отслеживание его в useState
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  // добавления пользователя в список приглашенных, если уже приглашен удаляет из массива
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter(_id => _id !== id));
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  // функция для изменения стейта отображения финальной страницы с результатом о выполнении 
  const onClickSendInvites = () => {
    // проверка на массив пользователей, если есть хотя бы 1 пользователь, отображаем финальную страницу
    if (invites.length > 0) {
      setSuccess(true);
    } else {
      // Добавления тайтала если пользователь пытается нажать на кнопку не приглашая никого
      setTitle("Добавьте хотя бы 1 участника, что бы отправить")
    }
  }

  // функция обрабатывающая нажатия кнопки назад на финальной странице Success 
  const reLoadPage = () => {
    setSuccess(false);
  }

  return (
    <div className="App">
      {success ? (
        <Success 
          reLoadPage={reLoadPage}
          count={invites.length}
        />
      ) : (
        <Users 
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue} 
          items={users} 
          isLoading={isLoading}
          onClickInvite={onClickInvite}
          invites={invites}
          onClickSendInvites={onClickSendInvites}
          title={title}
        />
      )}
    </div>
  );
}

export default App;
