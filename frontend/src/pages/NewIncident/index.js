
import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import '../../global.css';

import api from '../../service/api'
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident (event){
        event.preventDefault();
        
        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('incidents',data,{
                headers:{
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        }catch(error){
            alert('Erro ao cadastrar caso, tente novamente.');
        }

    }
    return (
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Titulo do caso"/>

                    <textarea 
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder="Descricao"/>

                    <input type="text" 
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    placeholder="Valor em Reais"/>
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
         </div>
    );
}