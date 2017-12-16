import React, { PureComponent } from 'react';

class Home extends PureComponent {
    render() {
        return (
            <section className="home">
                <h1>
                    La mejor manera de tener una cartera electrónica en internet
                </h1>
                <h2>
                    Los límites los pones tú
                </h2>
                <p>Wallet es una cartera en línea que te permite tener dinero electrónico de manera segura y confiable</p>
                <a className='button'>¡Registrate ya!</a>
            </section>
        )
    }
}

export default Home;