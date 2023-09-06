import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from './routes';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res)=>{
    const branch = matchRoutes(routes, req.url);

    console.log(req)
    const promises = branch.map(({ route }) => {
        const fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData() : Promise.resolve(null);
      });
    
  return Promise.all(promises).then((data) => {
    const context = { data };
    const html = renderToString(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    );
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>My React App</title>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
  });
  
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});