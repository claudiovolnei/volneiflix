import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../components/FormField';
import Button from '../../components/Button';
import useForm from '../../hooks/useForm';

function CadastroCategoria() {
    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: ''
    };

    const { handleChange, values, clearForm } = useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([]);

    
     useEffect(() => {
        const URL_TOP = window.location.hostname.includes('localhost') ?
        'http://localhost:3001/categorias' :
         'https://volneiflix.herokuapp.com/categorias';
        fetch(URL_TOP).then(async(respostaDoServidor) => {
            const resposta = await respostaDoServidor.json();
            setCategorias([
                ...resposta
            ]);
        });

        // setTimeout(() => {
        //     setCategorias([
        //         ...categorias,
        //         {
        //             "id": 1,
        //             "nome": "Front End",
        //             "descricao": "Uma categoria bacanudassa",
        //             "cor": "#cbd1ff"   
        //         },
        //         {
        //             "id": 2,
        //             "nome": "Back End",
        //             "descricao": "Outra categoria bacanudassa",
        //             "cor": "#cbd1ff"   
        //         }
        //     ]);
        // }, 4 * 1000);
     }, [
         values.titulo
     ]);
    
    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.titulo}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                clearForm();
            }}>

                <FormField 
                    label="Titulo da Categoria: "
                    type="text"
                    value={ values.titulo }
                    onChange={ handleChange }
                    name="titulo"
                />

                <FormField 
                    label="Descrição: "
                    type="textarea"
                    value={ values.descricao }
                    onChange={ handleChange }
                    name="descricao"
                />

                <FormField 
                    label="Cor: "
                    type="color"
                    value={ values.cor }
                    onChange={ handleChange }
                    name="cor"
                />

                <Button>
                    Cadastrar
                </Button>

                {
                    categorias.length === 0 && 
                    (<div>
                        Loading...
                    </div>)
                }
            </form>
            <ul>
                {categorias.map((categoria, index) => {
                    return (
                        <li key={`${categoria} ${index}`}>
                            {categoria.titulo}
                        </li>
                    )
                })}
            </ul>
            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    );
}

export default CadastroCategoria; 