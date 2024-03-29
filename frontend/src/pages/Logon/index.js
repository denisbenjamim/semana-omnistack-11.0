
import React,{ useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../service/api'
import './styles.css';
import '../../global.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){

    const[id,setId] = useState([]);
    const history = useHistory();

    async function handleLogin(event){
        event.preventDefault();

        try{
            const response = await api.post('sessions',{id});

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile');

        }catch(error){
            alert('Falha Login tente novamente');
        }
    }

    return (
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <input type="text" 
                            placeholder="Sua ID"
                            value={id}
                            onChange={event=> setId(event.target.value)}
                            />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro.
                    </Link>
                </form> 
           </section>
           <img src={heroesImg} alt="Heroes"/>
       </div>
    );
}