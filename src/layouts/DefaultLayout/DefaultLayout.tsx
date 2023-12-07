import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="App">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
export default DefaultLayout;
