import React,{useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';

import api from '../../service/api'
import './styles.css';
import '../../global.css';

import logoImg from '../../assets/logo.svg';
 
export default function Profile(){
    const [ incidents , setIncidents ] = useState([]);

    const history  = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data.incidents);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(eror){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
        
                <header>
                    <img src={logoImg} alt="Be The Hero"/>                  
                    <span>Bem vinda, {ongName}</span>
                    <Link to="/incidents/new" className="button">                        
                        Cadastrar novo caso
                    </Link>
                    <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color="#E02041" />
                    </button>
                </header>
            <h1>Casos Cadastrados</h1>
            
            <ul>                
                {incidents.map(incident => {
                    return (
                
                        <li key={incident.id}>
    
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>
    
                            <strong>DESCRICAO:</strong>
                            <p>{incident.description}</p>
    
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pr-BR',{style:'currency',currency: 'BRL',}).format(incident.value)}</p>    
                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    );
                })}              
            </ul>            
        </div>
    );
}