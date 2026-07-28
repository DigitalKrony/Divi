import { type JSX, useEffect, useState } from 'react';

import './Shell.css'

export const Shell = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    if (isLoading) setIsLoading(false);
  },[]);

  if(isLoading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <div>
      <header>
        <h1>New</h1>
      </header>
    </div>
  )
}
