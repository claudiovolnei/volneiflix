import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../components/FormField';
import Button from '../../components/Button';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: ''
    };
    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor // nome: 'valor'
        });
    }

    function handleChange(infosDoEvento) {
        // const { getAttribute, value } = infosDoEvento.target;
        setValue(
            infosDoEvento.target.getAttribute('name'),
            infosDoEvento.target.value
        );
     }

     useEffect(() => {
        console.log('alo alo w brasil!');
        const URL_TOP = 'http://localhost:3001/categorias';
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
         values.nome
     ]);
    
    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais);
            }}>

                <FormField 
                    label="Nome da Categoria: "
                    type="text"
                    value={ values.nome }
                    onChange={ handleChange }
                    name="nome"
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
                            {categoria.nome}
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