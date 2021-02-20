import Vue from 'vue'
export const state = () => ({
  selectedFilters: {},
  types: [
    {
      type: 'radio',
      slug: 'pol',
      title: 'Пол',
      condition: null,
      values: [
        {
          slug: 'muzhchine',
          title: 'Мужчине',
          condition: null,
        },
        {
          slug: 'zhenshhine',
          title: 'Женщине',
          condition: null,
        },
        {
          slug: 'pare',
          title: 'Паре',
          condition: null,
        },
      ],
    },
    {
      type: 'radio',
      slug: 'kemPrihoditsja',
      title: 'Кем приходится?',
      condition: null,
      values: [
        {
          slug: 'muzhu',
          title: 'Мужу',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'pape',
          title: 'Папе',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'parnju',
          title: 'Парню',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'drugu',
          title: 'Другу',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'byvshemu',
          title: 'Бывшему',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'ljubimomu',
          title: 'Любимому',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'kollege',
          title: 'Коллеге',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'zhene',
          title: 'Жене',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'mame',
          title: 'Маме',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'devushke',
          title: 'Девушке',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'podruge',
          title: 'Подруге',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'byvshej',
          title: 'Бывшей',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'ljubimoj',
          title: 'Любимой',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'sotrudnice',
          title: 'Сотруднице',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'nachalnice',
          title: 'Начальнице',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: 'druzjam',
          title: 'Друзья',
          condition: 'pol=="pare"',
        },
      ],
    },
    {
      type: 'radio',
      slug: 'povod',
      title: 'Повод',
      condition: null,
      values: [
        {
          slug: 'den-rozhdenija',
          title: 'День Рождения',
          condition: null,
        },
        {
          slug: 'novyj-god',
          title: 'Новый Год',
          condition: null,
        },
        {
          slug: 'devichnik',
          title: 'Девичник',
          condition: 'pol=="zhenshhine"',
        },
        {
          slug: '14-oktjabrja',
          title: '14 октября',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: 'hjellouin',
          title: 'Хэллоуин',
          condition: null,
        },
        {
          slug: 'podarki-na-14-fevralja',
          title: 'На 14 февраля',
          condition: null,
        },
        {
          slug: 'podarki-na-rozhdestvo',
          title: 'Рождество',
          condition: null,
        },
        {
          slug: '23-fevralja',
          title: '23 февраля',
          condition: 'pol=="muzhchine"',
        },
        {
          slug: '8-marta',
          title: '8 Марта',
          condition: 'pol=="zhenshhine"',
        },
      ],
    },
    {
      type: 'checkbox',
      slug: 'interesy',
      title: 'Интересы',
      condition: null,
      values: [
        {
          slug: 'kino',
          title: 'Кино',
          condition: null,
        },
        {
          slug: 'kulinarija',
          title: 'Кулинария',
          condition: null,
        },
      ],
    },
    {
      type: 'radio',
      slug: 'tipPodarka',
      title: 'Тип подарка',
      condition: null,
      values: [
        {
          slug: 'oskorbitelnyj',
          title: 'Оскорбительный 16+',
          condition: null,
        },
      ],
    },
    {
      type: 'radio',
      slug: 'professiya',
      title: 'Профессия',
      condition: null,
      values: [
        {
          slug: 'uchitelju',
          title: 'Учителю',
          condition: null,
        },
      ],
    },
  ],
})

export const getters = {
  getFilterTypes: state => {
    return state.types
  },
  getSelectedFilters: state => {
    return state.selectedFilters
  },
}

export const mutations = {
  setSelectedFilter (state, data) {
  console.log('DATA:::::', data)
    if(data.parent.type==='radio'){
      Vue.set(state.selectedFilters, data.parent.slug,data.filter.slug );
    }else{
      Vue.set(state.selectedFilters, data.parent.slug,[data.filter.slug] );

    }

  },
}

export const actions = {
  ACT_SELECT_FILTER (context, { filter, parent }) {
    context.commit('setSelectedFilter', { filter, parent })
  },
}



