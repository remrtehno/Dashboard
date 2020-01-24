export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Main',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Графики',
      url: '/',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Таблицы',
      url: '/tables',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Скачать отчет в Excel',
      url: '/reports',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Пользователи',
      url: '/users',
      icon: 'icon-settings',
    },
  ],
};
