import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        ROUTE ERROR! {error.status} {error.statusText}
      </>
    );
  }

  return <>OTHER ERROR!</>;
}

export default ErrorPage;
