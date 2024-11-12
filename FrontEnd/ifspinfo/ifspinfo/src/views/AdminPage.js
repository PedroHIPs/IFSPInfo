import React, { useEffect, Useref, useState } from "react";
import { useNavigate } from 'react-router-dom';

// reactstrap components
import {Button, Card, CardHeader, CardBody, CardFooter, FormGroup, Input,} from "reactstrap";

function AdminPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState(null);
  const [cargo, setCargo] = useState(null);

  useEffect(() => {
    // Recupera o administrador da sessão
    const admin = JSON.parse(sessionStorage.getItem("admin"));

    if (admin && admin.email) {// Seta no state
      setNome(admin.nome); 
      setCargo(admin.cargo);
    } else {
      navigate('/login'); // Redireciona para o login se não houver administrador logado
    }
  }, [navigate]);

  const handleCursosClick = () => {
    navigate('/admin/cursos'); // Navega para a página de CRUD de Cursos
  };

  const handleConteudoClick = () => {
    navigate('/admin/conteudo'); // Navega para a pagina de adição de conteudo
  };

  const handleRedesClick = () => {
    navigate('/admin/redesCRUD'); // Navega para a pagina de adição de conteudo
  };

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{
          backgroundImage: `url(${require("assets/img/greenbackground.jpg")})`,
          backgroundSize: 'cover',
          height: '100vh',
          width: '100%'
        }}>
        <Card>
          <CardHeader>
            <h5>Bem vindo(a), {nome}</h5>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <button type="button" class="btn btn-success btn-lg btn-block" onClick={handleCursosClick}>Cursos</button>
              <button type="button" class="btn btn-success btn-lg btn-block" onClick={handleConteudoClick}>Notícia</button>
              <button type="button" class="btn btn-success btn-lg btn-block" onClick={handleRedesClick}>Redes Sociais</button>
              <button type="button" class="btn btn-success btn-lg btn-block">Estrutura</button>
            </FormGroup>
          </CardBody>
          <hr />
          <CardFooter>
            <p className="description text-center">
              Atuando como {cargo}
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default AdminPage;
