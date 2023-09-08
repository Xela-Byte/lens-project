const axios = require('axios');
const qs = require('qs');

const base_api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BACKEND_HOST !== undefined
    ? process.env.REACT_APP_PUBLIC_BACKEND_HOST
    : "http://192.168.124.22:1337",
  headers: { 'Content-Type': 'application/json' }
});

const api = {
  ql: (path, query, additional_data = null) => {
    const queryString = qs.stringify(query);
    return base_api.get(`/api${path}${queryString ? `?${queryString}` : ""}`, {
      ...additional_data,
    },
      {
        transformResponse: [function (data) {
          return JSON.parse(data).data;
        }]
      }
    )
  },
  ...base_api
}

module.exports = {
  fetchArticles: (fields = ['id', 'slug', 'updatedAt'], start, limit) => {
    const path = `/articles`;
    const urlParamsObject = {
      sort: { rating: "desc" },
      fields,
      populate: {
        category: {
          fields: ['id', 'slug'],
        },
        company: {
          fields: ['id', 'slug'],
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    };
    const res = api.ql(path, urlParamsObject);
    return res;
  },

  fetchCategories: (fields = ['name', 'slug', 'updatedAt']) => {
    const path = `/categories`;
    const urlParamsObject = {
      fields,
    };
    const res = api.ql(path, urlParamsObject);
    return res;
  },

  fetchCompanies: (fields = ['name', 'slug', 'createdAt']) => {
    const path = `/companies`;
    const urlParamsObject = {
      fields,
    };
    const res = api.ql(path, urlParamsObject);
    return res;
  },
}