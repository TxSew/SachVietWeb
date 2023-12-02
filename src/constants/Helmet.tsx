import { Helmet } from 'react-helmet';
export const TitleHelmet = (title: string) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};
