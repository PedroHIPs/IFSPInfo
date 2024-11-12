import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from "react-icons"; 
import CursoService from "services/CursoService";
import ConteudoService from "services/ConteudoService";
import QuadroService from "services/QuadroService";
import RedesService from "services/RedesService";
import HomeNavbar from "components/Navbars/HomeNavbar"
import { IconPickerItem } from 'react-icons-picker'
import { Textfit } from 'react-textfit';


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();  // Captura o location para acessar o estado

  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");

  const [cursos, setCursos] = useState([]);
  const [redes, setRedes] = useState([]);
  const [quadro, setQuadro] = useState([]);
  const [QuadroId, setQuadroId] = useState("");
  const [conteudos, setConteudos] = useState([]);

  const campusId = sessionStorage.getItem('campusId');
  const campusNome = sessionStorage.getItem('campusNome');

  useEffect(() => {

    // Função para buscar os dados da API usando o CursoService
    const fetchCursos = async () => {
      try {
        const response = await CursoService.getCursosByCampus(campusId);
        console.log('Dados dos Cursos:', response.data); // Adicionado console.log para imprimir os dados
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    const fetchConteudos = async () => {
      try {
        const response = await ConteudoService.getConteudosByCampus(campusId);
        console.log('Conteúdos recebidos:', response.data);
        setConteudos(response.data);
      } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
      }
    };

    const fetchRedes = async () => {
      try{
        const response = await RedesService.getRedesByCampus(campusId);
        console.log('Redes Sociais: ', response.data);
        setRedes(response.data);
      } catch (error) {
        console.error('Erro ao buscar redes:', error);
      }
    }

    const fetchQuadro = async () => {
      try{
        const response = await QuadroService.getQuadroByCampus(campusId);
        // Acessa o id do primeiro quadro do array e armazena na variável quadroId
        const quadroId = response.data.length > 0 ? response.data[0].id : null;
        setQuadroId(quadroId);
        console.log('QuadroId: ', quadroId);
        console.log('Quadro: ', response.data); 
        setQuadro(response.data)
      } catch (error) {
        console.error('Erro ao buscar quadro:', error);
      }
    }
  
    if (campusId) {
      fetchCursos(); // Mantém a função existente para buscar os cursos
      fetchConteudos(); // Busca os conteúdos relacionados aos cursos do campus
      fetchRedes(); // Busca os conteúdos relacionados aos redes do campus
      fetchQuadro(); // Busca o quadro
    }
  }, [campusId]);

  const handleCardClick = (curso) => {
    navigate('/admin/cursopage', { state: { cursoId: curso.id } });
  }

  const handleSubmit = () => {
    const avisoData = {
      nome: nome,
      texto: texto,
      quadro: { id: QuadroId }
    };
  
    try {
      const confirmAdd = window.confirm('Adicionar aviso?');
      if (confirmAdd) {
        console.log('QuadroId:', QuadroId); // Adicione isto para verificar
        // Passando QuadroId para o método createAviso
        QuadroService.createAviso(QuadroId, avisoData)
          .then(response => {
            // Atualizando a lista de avisos, assumindo que você tenha um estado para isso
            setQuadro([...quadro, response.data]);
            alert('Aviso cadastrado com sucesso!');
          })
          .catch(error => {
            console.error("Erro ao cadastrar Aviso", error);
          });
      }
    } catch (error) {
      alert('Erro ao Adicionar Aviso, tente novamente.');
    }
  }

  return (
    <>
      {console.log('campusNome:', campusNome)}
      <HomeNavbar campusNome={campusNome}/>
      <div className="content">
        <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Redes Sociais</CardTitle>
              <p className="card-category">Siga-nos nas redes sociais</p>
            </CardHeader>
            <CardBody style={{ height: "fit-content", textAlign: "center" }}>
            <Row>
              {redes.map((rede) => (
                <Col key={rede.nome} md="3" xs="6">
                  <Card style={{ backgroundColor: rede.corBG, height: "fit-content" }}>
                    <CardBody>
                      <a
                        href={rede.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Textfit mode="single" max={24}>
                          <p style={{color: "#ffffff"}}><IconPickerItem value={rede.icone} size={24} color="#000" />
                          {' '}{rede.nome}</p>
                        </Textfit>
                      </a>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            </CardBody>
          </Card>
        </Col>
        </Row>
        <Row>
          {cursos.map((curso) => (
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" onClick={() => handleCardClick(curso)}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <IconPickerItem value={curso.icone} size={24} color="#000" />
                  </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">{curso.nivel}</p>
                      <CardTitle tag="p">{curso.nome}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-graduation-cap" /> Nota do MEC: {curso.notaMec}/5
                </div>
              </CardFooter>
            </Card>
          </Col>
          ))}
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Noticías</CardTitle>
                <p className="card-category">Ultimas Atualizações</p>
              </CardHeader>
              <CardBody>
              {conteudos.length > 0 ? (
                conteudos.map((conteudo, index) => (
                  <div key={index} onClick={() => window.location.href = conteudo.link}>
                    <h6>{conteudo.titulo}</h6>
                    <p>{conteudo.texto}</p>
                    <p><strong>Curso: </strong>{conteudo.curso?.nome}</p>
                    <p><strong>Autor: </strong>{conteudo.autor}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Não há atualizações no momento.</p>
              )}
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Ultima atualização dia
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Quadro de Avisos</CardTitle>
                <p className="card-category">Encontre aqui o que procura!</p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4">
                    <label htmlFor="InputNome">Nome</label>
                    <Input id="InputNome" placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <label htmlFor="InputTexto">Texto</label>
                    <Input id="InputTexto" placeholder="Texto" type="text" value={texto} onChange={e => setTexto(e.target.value)} />
                  </Col>
                  <Col md="2">
                    <button id="btnAdd" type="button" class="btn btn-success" onClick={handleSubmit}>Adicionar</button>
                  </Col>
                </Row>
              </CardBody>
              <hr></hr>
              <Col lg="3" md="6" sm="6">
              <h5>Ultimos Avisos</h5>
              {quadro.length > 0 ? (
                quadro.map((avisos, index) => (
                  <div key={index}>
                    <Card className="card-stats">
                    <CardBody>
                    <Row>
                      <Col md="12" xs="7">
                        <div>
                          <p className="card-category">{avisos?.nome}</p>
                          <CardTitle tag="p">{avisos?.texto}</CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  </Card>
                  </div>
                ))
              ) : (
                <p>Não há atualizações no momento.</p>
              )}
              </Col>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Ultima atualização dia
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
