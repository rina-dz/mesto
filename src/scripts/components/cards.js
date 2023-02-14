const SchlossDrachenburg = new URL('../../images/SchlossDrachenburg.jpg', import.meta.url);
const ThecastleofVeves = new URL('../../images/ThecastleofVêves.jpg', import.meta.url);
const LackoCastle = new URL('../../images/LäcköCastle.jpg', import.meta.url);
const NeuschwansteinCastle = new URL('../../images/NeuschwansteinCastle.jpg', import.meta.url);
const EltzCastle = new URL('../../images/EltzCastle.jpg', import.meta.url);
const EileenDonanCastle = new URL('../../images/EileenDonanCastle.jpg', import.meta.url);


const initialCards = [
    {
      name: 'Замок Драхенбург',
      link: SchlossDrachenburg
    },
    {
      name: 'Замок Вевес',
      link: ThecastleofVeves
    },
    {
      name: 'Замок Лекке',
      link: LackoCastle
    },
    {
      name: 'Замок Нойшванштайн',
      link: NeuschwansteinCastle
    },
    {
      name: 'Замок Эльц',
      link: EltzCastle
    },
    {
      name: 'Замок Эйлин Донан',
      link: EileenDonanCastle
    }
];

export { initialCards };