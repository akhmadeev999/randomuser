const formatDate = (date)=>{
    return new Date(date).toLocaleDateString('ru-RU');
};
export const Post = ({ name, dob, gender, picture, location, registered }) => (
    <div className="posts__item">
        { picture && picture.large && <img src={picture.large} alt="Avatar" className="posts__item__avatar"/>}
        <div className="posts__item__info-wrap">
            <ul className="posts__item__info">
                <li>{name.first + ' ' + name.last}</li>
                <li data-title="Возраст">{dob.age}</li>
                <li data-title="Пол">{gender}</li>
                <li data-title="Адрес">{ location.state + ',' + location.city}</li>
                <li data-title="Дата регистрации">{ formatDate(registered.date) }</li>
            </ul>
        </div>
    </div>
);
