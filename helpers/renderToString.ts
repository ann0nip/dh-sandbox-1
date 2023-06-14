import { renderToString } from 'react-dom/server';
import { ReactElement } from 'react';

const renderString = (jsx: ReactElement): string => {
    return renderToString(jsx);
};

export default renderString;
