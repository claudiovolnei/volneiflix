import React, { useEffect, useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repository/videos';
import categoriasRepository from '../../../repository/categorias';

function CadastroVideo() {
    const { handleChange, values} = useForm({
        titulo: 'Vídeo padrão',
        url: 'https://www.youtube.com/watch?v=c8mVlakBESE',
        categoria: 'Front End'
    });

    const history = useHistory();
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        categoriasRepository
            .getAll()
            .then((categorias) => {
                setCategorias(categorias);               
            }).catch(err => {
                console.error(err);
            });
    }, []);

    console.log(categorias);
    return (
        <PageDefault>
            <h1>Cadastro de Video</h1>

            <form onSubmit={(event) => {
                event.preventDefault();

                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria;
                });

                videosRepository.create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaEscolhida.id,
                }).then(() => {
                    console.log('Cadastrou com sucesso!');
                    history.push('/');

                }).catch(err => {
                    console.error(err);
                });
            }}>

            <FormField
                    label="Titulo da Vídeo: "
                    type="text"
                    value={ values.titulo }
                    onChange={ handleChange }
                    name="titulo"
                />

            <FormField
                    label="URL: "
                    type="text"
                    value={ values.url }
                    onChange={ handleChange }
                    name="url"
                />

            <FormField
                    label="Categoria: "
                    type="text"
                    value={ values.categoria }
                    onChange={ handleChange }
                    name="categoria"
                />
            <Button type="submit"> 
                Cadastrar
            </Button>
            </form>
            <Link to="/cadastro/categoria">
                Cadastrar categoria
            </Link>
        </PageDefault>
    );
}

export default CadastroVideo; 