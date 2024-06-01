import { useRoutes } from 'react-router-dom';
import routes from './router';
import { FC } from 'react';

/**
 * Create central routing
 * @returns
 */
const Router: FC = () => useRoutes(routes);

export default Router;
