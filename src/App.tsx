import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AxiosInterceptors, BatchTransactionsContextProvider } from 'wrappers';
import { Layout } from './components';
import { routes } from 'routes';
import { PageNotFound } from 'pages';
import { ContextProvider } from './context';

export const App = () => {
  return (
    //context provider for global state (oonly used for delegation contract details for now)
    <ContextProvider>
      <Router>
        <AxiosInterceptors>
          <BatchTransactionsContextProvider>
            <Layout>
              <Routes>
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
            </Layout>
          </BatchTransactionsContextProvider>
        </AxiosInterceptors>
      </Router>
    </ContextProvider>
  );
};
