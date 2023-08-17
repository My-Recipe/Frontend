import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
      {/* <RouterProvider router={router} /> */}
    </Suspense>
  );
}

export default App;
