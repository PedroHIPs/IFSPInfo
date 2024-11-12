import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import CursoService from "services/CursoService";
import AvaliacaoService from "services/AvaliacaoService";
import HomeNavbar from "components/Navbars/HomeNavbar";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Input,
  FormGroup,
} from "reactstrap";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();  
  const [curso, setCurso] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const cursoId = location.state?.cursoId; 
  const [nota, setNota] = useState(null);
  const [texto, setTexto] = useState(null);
  const [nome, setNome] = useState (null);
  const [hover, setHover] = useState(null);

  const campusNome = sessionStorage.getItem('campusNome');


  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await CursoService.getCursoById(cursoId);
        console.log('Dados dos Curso:', response.data);
        setCurso(response.data);
      } catch (error) {
        console.error('Erro ao buscar curso:', error);
      }
    };

    // Buscar as avaliações do curso
    const fetchAvaliacoes = async () => {
      try {
        const response = await AvaliacaoService.getAvaliacoesByCursoId(cursoId); // Função da API que busca as avaliações
        console.log('Avaliações:', response.data);
        setAvaliacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchCurso();
    fetchAvaliacoes();
  }, [cursoId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaAvaliacao = {
      nome,
      texto,
      nota: parseInt(nota),
      curso: { id: cursoId }  // Inclui o campus selecionado
    };

    AvaliacaoService.createAvaliacao(novaAvaliacao)
      .then(response => {
        console.log("Avaliacao cadastrado com sucesso", response);
        // Redirecionar ou exibir uma mensagem de sucesso
      })
      .catch(error => {
        console.error("Erro ao cadastrar avaliacao", error);
        // Exibir uma mensagem de erro
    });
  }

  return (
    <>
      <HomeNavbar campusNome={campusNome}/>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
            <img src="https://www.mtu.edu/cs/what/images/what-is-computer-science-banner1600.jpg" alt="Logo" style={{height:"50vh", width:"100vw", objectFit:"fill", borderRadius:"15px"}} />
              <CardHeader>
              </CardHeader>
              <CardBody>
                <CardTitle tag="h2">{curso.nome}</CardTitle>
                <p className="card-category">{curso.nivel} {"  "} (1 em cada {curso.relacaoCanditadoVaga} passam nesse curso)</p>
                <p>Ciências da Computação é o curso ideal para quem quer dominar o mundo da tecnologia e transformar ideias em soluções inovadoras. Você aprenderá a criar softwares, desenvolver algoritmos e entender profundamente como funcionam os sistemas que movem o mundo digital. Com uma combinação de teoria e prática, o curso prepara você para áreas como inteligência artificial, segurança da informação, desenvolvimento web e mobile, e muito mais. Além disso, o mercado está sempre em expansão, oferecendo inúmeras oportunidades de carreira em empresas globais, startups e setores de inovação. Venha fazer parte do futuro e programar as tecnologias de amanhã!</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="3" >
            <Card style={{backgroundColor: "#0E2F14"}}>
              <CardBody style={{textAlign: "center", color:"white"}}><CardTitle tag="h5">Nota MEC: {curso.notaMec}/5</CardTitle></CardBody>
            </Card>
          </Col>
          <Col md="5">
            <Card style={{backgroundColor: "#3F9E41"}}>
              <CardBody style={{textAlign: "center", color:"white"}}><CardTitle tag="h5">Ultima nota de Corte: {curso.notaCorte}</CardTitle></CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card style={{backgroundColor: "#588157"}}>
            <CardBody style={{textAlign: "center", color:"white"}}>
              <CardTitle tag="h5">Avaliações
              <div>
                {[...Array(5)].map((star, i) => (
                  <FaStar
                    key={i}
                    size={30}
                    color={i < 5? "#ffc107" : "#e4e5e9"}/>
                    ))}
               </div>
               </CardTitle>
               </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Comentários</CardTitle>
                <p className="card-category">Deixe aqui sua avaliação!</p>
              </CardHeader>
              <CardBody>
                <Card>
                  <CardBody>
                  <Row>
                    <Col className="pr-1 pl-1" md="8">
                      <FormGroup>
                        <label>Nome</label>
                        <Input placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)}/>
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Nota</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {[...Array(5)].map((star, index) => {
                            const notaAtual = index + 1;
                            return (
                              <label key={index} style={{ marginRight: '5px' }}>
                                <input 
                                  type="radio" 
                                  name="rating" 
                                  value={notaAtual} 
                                  style={{ display: 'none' }} 
                                  onClick={() => setNota(notaAtual)} 
                                />
                                <FaStar
                                  className="star"
                                  size={25}
                                  color={notaAtual <= (hover || nota) ? "#ffc107" : "#e4e5e9"}
                                  onMouseEnter={() => setHover(notaAtual)}
                                  onMouseLeave={() => setHover(null)}
                                />
                              </label>
                            );
                          })}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1 pl-1" md="12">
                      <FormGroup>
                        <Input type="textarea" p="5" placeholder="Escreva seu comentário aqui..."  value={texto} onChange={e => setTexto(e.target.value)}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1 pl-1" md="3">
                      <FormGroup>
                      <button type="button" class="btn btn-info" onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"></path>
                        </svg>
                        {" "}Avaliar
                        </button>
                      </FormGroup>
                    </Col>
                  </Row>
                  </CardBody>
                </Card>
                {/* Listagem de avaliações */}
                <Row>
                  <Col md="12">
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h5">Avaliações</CardTitle>
                      </CardHeader>
                      <CardBody>
                        {avaliacoes.length > 0 ? (
                          avaliacoes.map((avaliacao, index) => (
                            <Card key={index}>
                              <CardBody>
                                <h5>{avaliacao.nome}</h5>
                                <div>
                                  {[...Array(5)].map((star, i) => (
                                    <FaStar
                                      key={i}
                                      size={20}
                                      color={i < avaliacao.nota ? "#ffc107" : "#e4e5e9"}
                                    />
                                  ))}
                                </div>
                                <p>{avaliacao.texto}</p>
                                <p><small>{new Date(avaliacao.dataPost).toLocaleDateString()}</small></p>
                              </CardBody>
                            </Card>
                          ))
                        ) : (
                          <p>Não há avaliações ainda.</p>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
