import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
	
  if (isRouteErrorResponse(error)) {
    return (
      <>
        ROUTE ERROR FÖR FAN! {error.status} {error.statusText}
      </>
    );
  }

  return <>OTHER ERROR FÖR FAN!</>;
}

export default ErrorPage;
