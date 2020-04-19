'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const {
  HttpCode,
} = require(`../../constants`);

const articlesRouter = require(`../routes/articles`);
const categoriesRouter = require(`../routes/categories`);
const searchRouter = require(`../routes/search`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());

app.use(`/api/articles`, articlesRouter);
app.use(`/api/categories`, categoriesRouter);
app.use(`/api/search`, searchRouter);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, (error) => {
      if (error) {
        console.info(chalk.green(`Ошибка при запуске сервера`, error));
      }

      console.info(chalk.green(`Ожидаю соединений на порт ${port}`));
    });
  }
};
