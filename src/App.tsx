import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { AxiosInterceptors, BatchTransactionsContextProvider } from 'wrappers';
import { Layout } from './components';
import { routes } from 'routes';
import { PageNotFound, Unlock } from 'pages';
import { ContextProvider } from './context';

export const App = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state?.background;

  return (
    //context provider for global state (oonly used for delegation contract details for now)
    <ContextProvider>
      <AxiosInterceptors>
        <BatchTransactionsContextProvider>
          <Layout>
            <Routes location={background || location}>
              {routes.map((route) => (
                <Route
                  key={`route-key-${route.path}`}
                  path={route.path}
                  element={<route.component />}
                >
                  {route.children?.map((child) => (
                    <Route
                      key={`route-key-${route.path}-${child.path}`}
                      path={child.path}
                      element={<child.component />}
                    />
                  ))}
                </Route>
              ))}
              <Route path='*' element={<PageNotFound />} />
            </Routes>

            {background && (
              <Routes>
                <Route path='/unlock' element={<Unlock />} />
              </Routes>
            )}
          </Layout>
        </BatchTransactionsContextProvider>
      </AxiosInterceptors>
    </ContextProvider>
  );
};
